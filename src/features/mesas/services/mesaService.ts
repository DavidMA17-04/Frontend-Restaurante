import axiosInstance from "@/config/axios";
import { API_ENDPOINTS } from "@/shared/constants/apiConstants";
import type { Mesa } from "../types/mesaType";

/** Servicio de acceso a datos del modulo Mesas. */
export const getMesas = async (): Promise<Mesa[]> => {
  const response = await axiosInstance.get<Mesa[]>(API_ENDPOINTS.mesas);
  return response.data;
};

export const getMesaById = async (id: number): Promise<Mesa> => {
  const response = await axiosInstance.get<Mesa>(
    `${API_ENDPOINTS.mesas}/${id}`,
  );
  return response.data;
};
