import axios from "axios";
import { env } from "@/config/env";
import { API_TIMEOUT } from "@/shared/constants/apiConstants";

/**
 * Instancia generica de Axios compartida por todos los servicios.
 * Centraliza baseURL, timeout y (a futuro) interceptores de auth/errores.
 */
const axiosInstance = axios.create({
  baseURL: env.apiUrl,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
