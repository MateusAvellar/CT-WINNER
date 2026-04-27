from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import uuid
import logging
from datetime import datetime, timezone, timedelta
from typing import List, Optional
from zoneinfo import ZoneInfo

import bcrypt
import jwt
from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr

# ---------- DB ----------
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="CT Winner API")
api = APIRouter(prefix="/api")

JWT_SECRET = os.environ['JWT_SECRET']
JWT_ALGO = "HS256"
JWT_EXPIRE_HOURS = 24 * 7  # 7 days for admin convenience

DAYS_OF_WEEK = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"]
BR_TZ = ZoneInfo("America/Sao_Paulo")

# ---------- Security helpers ----------
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed.encode())

def create_token(email: str) -> str:
    payload = {
        "sub": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRE_HOURS),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGO)

bearer_scheme = HTTPBearer(auto_error=False)

async def require_admin(creds: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    if creds is None:
        raise HTTPException(status_code=401, detail="Autenticação necessária")
    try:
        payload = jwt.decode(creds.credentials, JWT_SECRET, algorithms=[JWT_ALGO])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")
    user = await db.users.find_one({"email": payload.get("sub")}, {"_id": 0, "password_hash": 0})
    if not user:
        raise HTTPException(status_code=401, detail="Usuário não encontrado")
    return user

# ---------- Models ----------
class LoginIn(BaseModel):
    email: EmailStr
    password: str

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    email: str

class Modality(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    target_audience: str
    benefits: str
    icon: str = "dumbbell"
    order: int = 0

class ModalityIn(BaseModel):
    name: str
    description: str
    target_audience: str
    benefits: str
    icon: str = "dumbbell"
    order: int = 0

class ScheduleSlot(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    day: str  # segunda..domingo
    start_time: str  # "HH:MM"
    end_time: str    # "HH:MM"
    modality: str
    professor: str

class ScheduleSlotIn(BaseModel):
    day: str
    start_time: str
    end_time: str
    modality: str
    professor: str

class Event(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    date: str  # ISO date "YYYY-MM-DD"
    description: str
    location: Optional[str] = None

class EventIn(BaseModel):
    name: str
    date: str
    description: str
    location: Optional[str] = None

# ---------- Startup: seed admin + initial data ----------
@app.on_event("startup")
async def on_startup():
    # Indexes
    await db.users.create_index("email", unique=True)

    # Seed admin
    admin_email = os.environ['ADMIN_EMAIL']
    admin_password = os.environ['ADMIN_PASSWORD']
    existing = await db.users.find_one({"email": admin_email})
    if not existing:
        await db.users.insert_one({
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
    else:
        if not verify_password(admin_password, existing["password_hash"]):
            await db.users.update_one(
                {"email": admin_email},
                {"$set": {"password_hash": hash_password(admin_password)}}
            )

    # Seed modalities if empty
    if await db.modalities.count_documents({}) == 0:
        seed_mods = [
            {"name": "Taekwondo", "description": "Arte marcial coreana focada em chutes potentes, equilíbrio e disciplina mental.", "target_audience": "A partir de 4 anos • todos os níveis", "benefits": "Disciplina, foco, flexibilidade, autoconfiança", "icon": "flame", "order": 1},
            {"name": "Jiu-Jitsu", "description": "Arte suave: alavancas e técnicas de solo para todos os biotipos.", "target_audience": "Adolescentes e adultos", "benefits": "Autocontrole, resolução de problemas, condicionamento", "icon": "shield", "order": 2},
            {"name": "Jiu-Jitsu Kids", "description": "Jiu-Jitsu com metodologia lúdica e adaptada para crianças.", "target_audience": "Crianças de 4 a 12 anos", "benefits": "Coordenação, autoconfiança, respeito", "icon": "users", "order": 3},
            {"name": "Muay-Thai", "description": "Arte das oito armas — punhos, cotovelos, joelhos e chutes.", "target_audience": "A partir de 12 anos", "benefits": "Força, cardio, coordenação, foco", "icon": "swords", "order": 4},
            {"name": "Boxe", "description": "A nobre arte. Técnica de mãos, esquivas e ritmo.", "target_audience": "A partir de 10 anos", "benefits": "Condicionamento, reflexo, autoestima", "icon": "target", "order": 5},
            {"name": "Judô", "description": "Caminho suave: projeções e filosofia para a vida toda.", "target_audience": "Crianças e adultos", "benefits": "Respeito, disciplina, equilíbrio", "icon": "users", "order": 6},
            {"name": "Karatê", "description": "Tradição japonesa de katas e postura firme.", "target_audience": "A partir de 6 anos", "benefits": "Postura, foco, respeito", "icon": "mountain", "order": 7},
            {"name": "Teatro", "description": "Expressão corporal, voz e cena para transformar a timidez em presença.", "target_audience": "Crianças, jovens e adultos", "benefits": "Criatividade, comunicação, confiança", "icon": "drama", "order": 8},
        ]
        for m in seed_mods:
            m["id"] = str(uuid.uuid4())
        await db.modalities.insert_many(seed_mods)

    # Seed schedule if empty (Segunda-Sexta, SEM sábado/domingo)
    if await db.schedule_slots.count_documents({}) == 0:
        seed_schedule = [
            # Segunda
            {"day": "segunda", "start_time": "18:00", "end_time": "19:00", "modality": "Jiu-Jitsu Kids", "professor": "Prof. Leonardo"},
            {"day": "segunda", "start_time": "19:00", "end_time": "20:00", "modality": "Taekwondo", "professor": "Mestre Carlos Wagner"},
            {"day": "segunda", "start_time": "20:00", "end_time": "21:00", "modality": "Muay-Thai", "professor": "Prof. Wallace Conceição"},
            {"day": "segunda", "start_time": "21:00", "end_time": "22:00", "modality": "Jiu-Jitsu", "professor": "Prof. Bruno Souza"},
            # Terça
            {"day": "terca", "start_time": "18:00", "end_time": "19:00", "modality": "Karatê", "professor": "Prof. Eduardo Vieira"},
            {"day": "terca", "start_time": "19:00", "end_time": "20:00", "modality": "Boxe", "professor": "Prof. Breno Constantino"},
            {"day": "terca", "start_time": "20:00", "end_time": "21:00", "modality": "Judô", "professor": "Prof. Diego Correia"},
            {"day": "terca", "start_time": "21:00", "end_time": "22:30", "modality": "Teatro", "professor": "Girassol Music"},
            # Quarta
            {"day": "quarta", "start_time": "18:00", "end_time": "19:00", "modality": "Jiu-Jitsu Kids", "professor": "Prof. Leonardo"},
            {"day": "quarta", "start_time": "19:00", "end_time": "20:00", "modality": "Taekwondo", "professor": "Mestre Carlos Wagner"},
            {"day": "quarta", "start_time": "20:00", "end_time": "21:00", "modality": "Muay-Thai", "professor": "Prof. Wallace Conceição"},
            {"day": "quarta", "start_time": "21:00", "end_time": "22:00", "modality": "Jiu-Jitsu", "professor": "Prof. Bruno Souza"},
            # Quinta
            {"day": "quinta", "start_time": "18:00", "end_time": "19:00", "modality": "Karatê", "professor": "Prof. Eduardo Vieira"},
            {"day": "quinta", "start_time": "19:00", "end_time": "20:00", "modality": "Boxe", "professor": "Prof. Breno Constantino"},
            {"day": "quinta", "start_time": "20:00", "end_time": "21:00", "modality": "Judô", "professor": "Prof. Diego Correia"},
            # Sexta
            {"day": "sexta", "start_time": "18:00", "end_time": "19:00", "modality": "Jiu-Jitsu Kids", "professor": "Prof. Leonardo"},
            {"day": "sexta", "start_time": "19:00", "end_time": "20:00", "modality": "Taekwondo", "professor": "Mestre Carlos Wagner"},
            {"day": "sexta", "start_time": "20:00", "end_time": "21:00", "modality": "Muay-Thai", "professor": "Prof. Wallace Conceição"},
            {"day": "sexta", "start_time": "21:00", "end_time": "22:30", "modality": "Jiu-Jitsu", "professor": "Prof. Bruno Souza"},
        ]
        for s in seed_schedule:
            s["id"] = str(uuid.uuid4())
        await db.schedule_slots.insert_many(seed_schedule)

    # Seed events if empty
    if await db.events.count_documents({}) == 0:
        seed_events = [
            {"id": str(uuid.uuid4()), "name": "Copa Winner", "date": "2026-06-21", "description": "Torneio de Taekwondo que reúne grandes equipes do Rio de Janeiro. Um dia de competição, técnica e muita emoção no CT Winner.", "location": "CT Winner — Méier"},
        ]
        await db.events.insert_many(seed_events)

# ---------- Auth routes ----------
@api.post("/auth/login", response_model=TokenOut)
async def login(data: LoginIn):
    email = data.email.lower().strip()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(data.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    return TokenOut(access_token=create_token(email), email=email)

@api.get("/auth/me")
async def me(user=Depends(require_admin)):
    return user

# ---------- Modalities ----------
@api.get("/modalities", response_model=List[Modality])
async def list_modalities():
    items = await db.modalities.find({}, {"_id": 0}).sort("order", 1).to_list(500)
    return items

@api.post("/modalities", response_model=Modality)
async def create_modality(data: ModalityIn, _=Depends(require_admin)):
    m = Modality(**data.model_dump())
    await db.modalities.insert_one(m.model_dump())
    return m

@api.put("/modalities/{mid}", response_model=Modality)
async def update_modality(mid: str, data: ModalityIn, _=Depends(require_admin)):
    res = await db.modalities.update_one({"id": mid}, {"$set": data.model_dump()})
    if res.matched_count == 0:
        raise HTTPException(404, "Modalidade não encontrada")
    item = await db.modalities.find_one({"id": mid}, {"_id": 0})
    return item

@api.delete("/modalities/{mid}")
async def delete_modality(mid: str, _=Depends(require_admin)):
    res = await db.modalities.delete_one({"id": mid})
    if res.deleted_count == 0:
        raise HTTPException(404, "Modalidade não encontrada")
    return {"ok": True}

# ---------- Schedule ----------
@api.get("/schedule", response_model=List[ScheduleSlot])
async def list_schedule():
    items = await db.schedule_slots.find({}, {"_id": 0}).to_list(1000)
    order = {d: i for i, d in enumerate(DAYS_OF_WEEK)}
    items.sort(key=lambda s: (order.get(s["day"], 99), s["start_time"]))
    return items

@api.get("/schedule/current")
async def current_class():
    now = datetime.now(BR_TZ)
    day = DAYS_OF_WEEK[now.weekday()]
    hhmm = now.strftime("%H:%M")
    slot = await db.schedule_slots.find_one(
        {"day": day, "start_time": {"$lte": hhmm}, "end_time": {"$gt": hhmm}},
        {"_id": 0}
    )
    return {"now_br": now.isoformat(), "day": day, "time": hhmm, "active": slot}

@api.post("/schedule", response_model=ScheduleSlot)
async def create_slot(data: ScheduleSlotIn, _=Depends(require_admin)):
    s = ScheduleSlot(**data.model_dump())
    await db.schedule_slots.insert_one(s.model_dump())
    return s

@api.put("/schedule/{sid}", response_model=ScheduleSlot)
async def update_slot(sid: str, data: ScheduleSlotIn, _=Depends(require_admin)):
    res = await db.schedule_slots.update_one({"id": sid}, {"$set": data.model_dump()})
    if res.matched_count == 0:
        raise HTTPException(404, "Horário não encontrado")
    item = await db.schedule_slots.find_one({"id": sid}, {"_id": 0})
    return item

@api.delete("/schedule/{sid}")
async def delete_slot(sid: str, _=Depends(require_admin)):
    res = await db.schedule_slots.delete_one({"id": sid})
    if res.deleted_count == 0:
        raise HTTPException(404, "Horário não encontrado")
    return {"ok": True}

# ---------- Events ----------
@api.get("/events", response_model=List[Event])
async def list_events():
    items = await db.events.find({}, {"_id": 0}).sort("date", 1).to_list(500)
    return items

@api.post("/events", response_model=Event)
async def create_event(data: EventIn, _=Depends(require_admin)):
    e = Event(**data.model_dump())
    await db.events.insert_one(e.model_dump())
    return e

@api.put("/events/{eid}", response_model=Event)
async def update_event(eid: str, data: EventIn, _=Depends(require_admin)):
    res = await db.events.update_one({"id": eid}, {"$set": data.model_dump()})
    if res.matched_count == 0:
        raise HTTPException(404, "Evento não encontrado")
    item = await db.events.find_one({"id": eid}, {"_id": 0})
    return item

@api.delete("/events/{eid}")
async def delete_event(eid: str, _=Depends(require_admin)):
    res = await db.events.delete_one({"id": eid})
    if res.deleted_count == 0:
        raise HTTPException(404, "Evento não encontrado")
    return {"ok": True}

@api.get("/")
async def root():
    return {"message": "CT Winner API"}

app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
