import axiosInstance from "@/config/axios";
import { API_ENDPOINTS } from "@/shared/constants/apiConstants";
import type { Turno } from "../types/turnoType";

/** Servicio de acceso a datos del modulo Turnos. */
export const getTurnos = async (): Promise<Turno[]> => {
  const response = await axiosInstance.get<Turno[]>(API_ENDPOINTS.turnos);
  return response.data;
};

export const getTurnoById = async (id: number): Promise<Turno> => {
  const response = await axiosInstance.get<Turno>(
    `${API_ENDPOINTS.turnos}/${id}`,
  );
  return response.data;
};
