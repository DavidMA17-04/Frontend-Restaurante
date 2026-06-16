import axiosInstance from "@/config/axios";
import { API_ENDPOINTS } from "@/shared/constants/apiConstants";
import type { Reserva } from "../types/reservaType";

/** Servicio de acceso a datos del modulo Reservas. */
export const getReservas = async (): Promise<Reserva[]> => {
  const response = await axiosInstance.get<Reserva[]>(API_ENDPOINTS.reservas);
  return response.data;
};

export const getReservaById = async (id: number): Promise<Reserva> => {
  const response = await axiosInstance.get<Reserva>(
    `${API_ENDPOINTS.reservas}/${id}`,
  );
  return response.data;
};
