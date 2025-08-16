// src/services/api.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"; // backend

const api = axios.create({
  baseURL: API_URL,
});

// Intercepteur pour ajouter le token JWT automatiquement
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const response = await api.post("/token", {
    username: email,
    password,
  });
  return response.data;
};

export const generateContent = async (payload: {
  template_id: string;
  fields: Record<string, string>;
  generate_image?: boolean;
}) => {
  const response = await api.post("/generate", payload);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

export default api;