import axiosInstance from "@/config/axios";
import { API_ENDPOINTS } from "@/shared/constants/apiConstants";
import {
  findMockItemById,
  resolveMockOrFetch,
  resolveMockOrFetchById,
} from "@/shared/utils/resolveMockOrFetch";
import type { Estado } from "../types/estadoType";

const ESTADOS_MOCK: Estado[] = [
  { id: 1, nombre: "Pendiente" },
  { id: 2, nombre: "Confirmada" },
  { id: 3, nombre: "Cancelada" },
];

/** Servicio de acceso a datos del modulo Estados. */
export const getEstados = async (): Promise<Estado[]> => {
  return resolveMockOrFetch(ESTADOS_MOCK, async () => {
    const response = await axiosInstance.get<Estado[]>(API_ENDPOINTS.estados);
    return response.data;
  });
};

export const getEstadoById = async (id: number): Promise<Estado> => {
  return resolveMockOrFetchById(
    () => findMockItemById(ESTADOS_MOCK, id),
    async () => {
      const response = await axiosInstance.get<Estado>(
        `${API_ENDPOINTS.estados}/${id}`,
      );
      return response.data;
    },
  );
};
