import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://98.92.241.39:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
