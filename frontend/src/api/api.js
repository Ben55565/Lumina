import axios from "axios";
import { setLoadingExternal } from "../context/LoadingContext";
import i18n from "../i18n";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Accept-Language"] = i18n.language;
    setLoadingExternal(true, i18n.t("loadingMessage"));
    return config;
  },
  (error) => {
    setLoadingExternal(false);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    setLoadingExternal(false);
    return response;
  },
  (error) => {
    setLoadingExternal(false);
    return Promise.reject(error);
  }
);

export default api;
