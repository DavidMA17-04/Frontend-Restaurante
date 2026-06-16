import axiosInstance from "@/config/axios";
import { API_ENDPOINTS } from "@/shared/constants/apiConstants";
import type { Zona } from "../types/zonaType";

/** Servicio de acceso a datos del modulo Zonas. */
export const getZonas = async (): Promise<Zona[]> => {
  const response = await axiosInstance.get<Zona[]>(API_ENDPOINTS.zonas);
  return response.data;
};

export const getZonaById = async (id: number): Promise<Zona> => {
  const response = await axiosInstance.get<Zona>(
    `${API_ENDPOINTS.zonas}/${id}`,
  );
  return response.data;
};
