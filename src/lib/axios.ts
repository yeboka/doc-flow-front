// src/lib/axios.ts
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080", // измени при деплое
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("doc-flow-access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("🔐 Unauthorized, возможно токен устарел");
      window.location.href = "/login"
    }
    return Promise.reject(error);
  }
);

export default API;
