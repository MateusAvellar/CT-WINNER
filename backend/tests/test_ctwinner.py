"""CT Winner backend API tests"""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://construa-site-1.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"
ADMIN_EMAIL = "admin@ctwinner.com"
ADMIN_PASSWORD = "CTWinner2026!"


@pytest.fixture(scope="module")
def token():
    r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
    assert r.status_code == 200, f"Login failed: {r.status_code} {r.text}"
    data = r.json()
    assert "access_token" in data and data["email"] == ADMIN_EMAIL
    return data["access_token"]


@pytest.fixture(scope="module")
def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


# ---------- Public endpoints ----------
class TestPublic:
    def test_root(self):
        r = requests.get(f"{API}/", timeout=15)
        assert r.status_code == 200

    def test_modalities_seeded(self):
        r = requests.get(f"{API}/modalities", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) >= 8
        names = [m["name"] for m in data]
        for n in ["Taekwondo", "Jiu-Jitsu", "Muay-Thai", "Boxe", "Judô", "Karatê", "Teatro", "Balé"]:
            assert n in names
        # sorted by order
        orders = [m["order"] for m in data[:8]]
        assert orders == sorted(orders)

    def test_schedule_seeded_and_sorted(self):
        r = requests.get(f"{API}/schedule", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert len(data) >= 16
        days_order = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"]
        prev = (-1, "")
        for s in data:
            cur = (days_order.index(s["day"]), s["start_time"])
            assert cur >= prev, f"Not sorted: {s}"
            prev = cur

    def test_schedule_current(self):
        r = requests.get(f"{API}/schedule/current", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert "day" in data and "time" in data and "active" in data
        assert data["day"] in ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"]

    def test_events_seeded(self):
        r = requests.get(f"{API}/events", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert len(data) >= 3
        # sorted by date ascending
        dates = [e["date"] for e in data]
        assert dates == sorted(dates)


# ---------- Auth ----------
class TestAuth:
    def test_login_success(self):
        r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
        assert r.status_code == 200
        assert r.json()["email"] == ADMIN_EMAIL

    def test_login_invalid(self):
        r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong"}, timeout=15)
        assert r.status_code == 401

    def test_me_no_token(self):
        r = requests.get(f"{API}/auth/me", timeout=15)
        assert r.status_code == 401

    def test_me_with_token(self, auth_headers):
        r = requests.get(f"{API}/auth/me", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        assert r.json()["email"] == ADMIN_EMAIL

    def test_admin_endpoints_require_auth(self):
        r = requests.post(f"{API}/schedule", json={"day": "segunda", "start_time": "10:00", "end_time": "11:00", "modality": "x", "professor": "y"}, timeout=15)
        assert r.status_code == 401
        r = requests.post(f"{API}/events", json={"name": "x", "date": "2026-12-01", "description": "y"}, timeout=15)
        assert r.status_code == 401
        r = requests.post(f"{API}/modalities", json={"name": "x", "description": "y", "target_audience": "z", "benefits": "b"}, timeout=15)
        assert r.status_code == 401


# ---------- CRUD Schedule ----------
class TestScheduleCRUD:
    def test_create_update_delete(self, auth_headers):
        payload = {"day": "domingo", "start_time": "09:00", "end_time": "10:00", "modality": "TEST_Mod", "professor": "TEST_Prof"}
        r = requests.post(f"{API}/schedule", json=payload, headers=auth_headers, timeout=15)
        assert r.status_code == 200, r.text
        sid = r.json()["id"]
        # verify GET
        r = requests.get(f"{API}/schedule", timeout=15)
        assert any(s["id"] == sid for s in r.json())
        # update
        payload2 = dict(payload, professor="TEST_Updated")
        r = requests.put(f"{API}/schedule/{sid}", json=payload2, headers=auth_headers, timeout=15)
        assert r.status_code == 200
        assert r.json()["professor"] == "TEST_Updated"
        # delete
        r = requests.delete(f"{API}/schedule/{sid}", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        r = requests.get(f"{API}/schedule", timeout=15)
        assert not any(s["id"] == sid for s in r.json())


# ---------- CRUD Events ----------
class TestEventsCRUD:
    def test_create_update_delete(self, auth_headers):
        payload = {"name": "TEST_Event", "date": "2026-12-15", "description": "TEST desc", "location": "TEST loc"}
        r = requests.post(f"{API}/events", json=payload, headers=auth_headers, timeout=15)
        assert r.status_code == 200, r.text
        eid = r.json()["id"]
        r = requests.put(f"{API}/events/{eid}", json=dict(payload, name="TEST_Event_Upd"), headers=auth_headers, timeout=15)
        assert r.status_code == 200 and r.json()["name"] == "TEST_Event_Upd"
        r = requests.delete(f"{API}/events/{eid}", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        r = requests.delete(f"{API}/events/{eid}", headers=auth_headers, timeout=15)
        assert r.status_code == 404


# ---------- CRUD Modalities ----------
class TestModalitiesCRUD:
    def test_create_update_delete(self, auth_headers):
        payload = {"name": "TEST_Modality", "description": "d", "target_audience": "ta", "benefits": "b", "icon": "dumbbell", "order": 99}
        r = requests.post(f"{API}/modalities", json=payload, headers=auth_headers, timeout=15)
        assert r.status_code == 200, r.text
        mid = r.json()["id"]
        r = requests.put(f"{API}/modalities/{mid}", json=dict(payload, description="updated"), headers=auth_headers, timeout=15)
        assert r.status_code == 200 and r.json()["description"] == "updated"
        r = requests.delete(f"{API}/modalities/{mid}", headers=auth_headers, timeout=15)
        assert r.status_code == 200
