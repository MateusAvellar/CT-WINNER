import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ctw_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const WHATSAPP_NUMBER = "5521980804225";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Gostaria de agendar minha aula experimental no CT Winner. Meu nome é "
)}`;
export const INSTAGRAM_URL = "https://www.instagram.com/ctwinnerrj/";
export const ADDRESS = "R. Lopes da Cruz, 61 — Méier, Rio de Janeiro";
export const MAP_SRC =
  "https://www.google.com/maps?q=R.+Lopes+da+Cruz,+61,+M%C3%A9ier,+Rio+de+Janeiro&output=embed";

export const DAY_LABELS = {
  segunda: "Segunda",
  terca: "Terça",
  quarta: "Quarta",
  quinta: "Quinta",
  sexta: "Sexta",
  sabado: "Sábado",
  domingo: "Domingo",
};
export const DAYS_ORDER = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"];
