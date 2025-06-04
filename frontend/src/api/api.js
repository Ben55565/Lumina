import axios from "axios";
import { setLoadingExternal } from "../context/LoadingContext";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    setLoadingExternal(true);
    return config;
  },
  (error) => {
    setLoadingExternal(false);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    setLoadingExternal(false);
    return response;
  },
  (error) => {
    setLoadingExternal(false);
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default api;
