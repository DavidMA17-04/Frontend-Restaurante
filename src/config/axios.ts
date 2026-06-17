import axios from "axios";
import { env } from "@/config/env";
import { API_TIMEOUT } from "@/shared/constants/apiConstants";
import { getApiErrorMessage } from "@/shared/utils/apiError";

/**
 * Instancia generica de Axios compartida por todos los servicios.
 * Centraliza baseURL, timeout e interceptores de error.
 */
const axiosInstance = axios.create({
  baseURL: env.apiUrl,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = getApiErrorMessage(error);
    return Promise.reject(new Error(message));
  },
);

export default axiosInstance;
