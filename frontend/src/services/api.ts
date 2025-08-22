// src/services/api.ts
import { login, getMe } from "../services/api";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Création d'une instance axios configurée
const api = axios.create({
  baseURL: API_URL,
});

// Intercepteur → ajoute automatiquement le JWT si présent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- ENDPOINTS ----

// Authentification → récupère un JWT
export const login = async (username: string, password: string) => {
  const response = await api.post(
    "/token",
    { username, password },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data; // { access_token, token_type }
};

// Génération de contenu
export const generateContent = async (payload: {
  template_id: string;
  fields: Record<string, string>;
  generate_image?: boolean;
}) => {
  const response = await api.post("/generate", payload);
  return response.data; // { content, image_url }
};

// Récupérer l’utilisateur connecté
export const getMe = async () => {
  const response = await api.get("/users/me");
  return response.data; // { username, roles... }
};

// 📌 Récupérer tous les contenus générés par l’utilisateur connecté
export const getContents = async () => {
  const response = await api.get("/contents");
  return response.data; // { contents: [...] }
};

export default api;