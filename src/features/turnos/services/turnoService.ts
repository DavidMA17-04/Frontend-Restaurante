import axiosInstance from "@/config/axios";
import { TURNOS_MOCK } from "@/mocks/turnos.mock";
import { API_ENDPOINTS } from "@/shared/constants/apiConstants";
import {
  findMockItemById,
  resolveMockOrFetch,
  resolveMockOrFetchById,
} from "@/shared/utils/resolveMockOrFetch";
import type { Turno } from "../types/turnoType";

/** Servicio de acceso a datos del modulo Turnos. */
export const getTurnos = async (): Promise<Turno[]> => {
  return resolveMockOrFetch(TURNOS_MOCK, async () => {
    const response = await axiosInstance.get<Turno[]>(API_ENDPOINTS.turnos);
    return response.data;
  });
};

export const getTurnoById = async (id: number): Promise<Turno> => {
  return resolveMockOrFetchById(
    () => findMockItemById(TURNOS_MOCK, id),
    async () => {
      const response = await axiosInstance.get<Turno>(
        `${API_ENDPOINTS.turnos}/${id}`,
      );
      return response.data;
    },
  );
};
