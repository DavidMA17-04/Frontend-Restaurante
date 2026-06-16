import axiosInstance from "@/config/axios";
import { BLOQUEOS_MESA_MOCK } from "@/mocks/bloqueos-mesa.mock";
import { API_ENDPOINTS } from "@/shared/constants/apiConstants";
import {
  findMockItemById,
  resolveMockOrFetch,
  resolveMockOrFetchById,
} from "@/shared/utils/resolveMockOrFetch";
import type { BloqueoMesa } from "../types/bloqueoMesaType";

/** Servicio de acceso a datos del modulo Bloqueos de Mesa. */
export const getBloqueosMesa = async (): Promise<BloqueoMesa[]> => {
  return resolveMockOrFetch(BLOQUEOS_MESA_MOCK, async () => {
    const response = await axiosInstance.get<BloqueoMesa[]>(
      API_ENDPOINTS.bloqueosMesa,
    );
    return response.data;
  });
};

export const getBloqueoMesaById = async (id: number): Promise<BloqueoMesa> => {
  return resolveMockOrFetchById(
    () => findMockItemById(BLOQUEOS_MESA_MOCK, id),
    async () => {
      const response = await axiosInstance.get<BloqueoMesa>(
        `${API_ENDPOINTS.bloqueosMesa}/${id}`,
      );
      return response.data;
    },
  );
};
