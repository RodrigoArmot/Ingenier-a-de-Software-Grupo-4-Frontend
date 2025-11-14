import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://di0lh5tbl9.execute-api.us-east-1.amazonaws.com/prod/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
