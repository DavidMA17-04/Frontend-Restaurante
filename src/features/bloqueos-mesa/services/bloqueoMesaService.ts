import axiosInstance from "@/config/axios";
import { API_ENDPOINTS } from "@/shared/constants/apiConstants";
import type { BloqueoMesa } from "../types/bloqueoMesaType";

/** Servicio de acceso a datos del modulo Bloqueos de Mesa. */
export const getBloqueosMesa = async (): Promise<BloqueoMesa[]> => {
  const response = await axiosInstance.get<BloqueoMesa[]>(
    API_ENDPOINTS.bloqueosMesa,
  );
  return response.data;
};

export const getBloqueoMesaById = async (id: number): Promise<BloqueoMesa> => {
  const response = await axiosInstance.get<BloqueoMesa>(
    `${API_ENDPOINTS.bloqueosMesa}/${id}`,
  );
  return response.data;
};
