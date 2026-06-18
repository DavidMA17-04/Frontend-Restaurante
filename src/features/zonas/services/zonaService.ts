import axiosInstance from "@/config/axios";
import { zonasStore } from "@/mocks/stores/zonasStore";
import { API_ENDPOINTS } from "@/shared/constants/apiConstants";
import {
  resolveMockOrFetch,
  resolveMockOrFetchById,
  resolveMockOrMutate,
} from "@/shared/utils/resolveMockOrFetch";
import type { Zona, ZonaCreateInput, ZonaUpdateInput } from "../types/zonaType";

/** Servicio de acceso a datos del modulo Zonas. */
export const getZonas = async (): Promise<Zona[]> => {
  return resolveMockOrFetch(zonasStore.getAll(), async () => {
    const response = await axiosInstance.get<Zona[]>(API_ENDPOINTS.zonas);
    return response.data;
  });
};

export const getZonaById = async (id: number): Promise<Zona> => {
  return resolveMockOrFetchById(
    () => zonasStore.getById(id),
    async () => {
      const zonas = await getZonas();
      const zona = zonas.find((item) => item.id === id);

      if (!zona) {
        throw new Error(`Zona con id ${id} no encontrada.`);
      }

      return zona;
    },
  );
};

export const createZona = async (input: ZonaCreateInput): Promise<Zona> => {
  return resolveMockOrMutate(
    () => zonasStore.create(input),
    async () => {
      const response = await axiosInstance.post<Zona>(
        API_ENDPOINTS.zonas,
        input,
      );
      return response.data;
    },
  );
};

export const updateZona = async ({
  id,
  data,
}: {
  id: number;
  data: ZonaUpdateInput;
}): Promise<Zona> => {
  return resolveMockOrMutate(
    () => zonasStore.update(id, data),
    async () => {
      const current = await getZonaById(id);
      const payload: ZonaCreateInput = {
        nombre: data.nombre ?? current.nombre,
        disponibilidad: data.disponibilidad ?? current.disponibilidad,
      };
      const response = await axiosInstance.put<Zona>(
        `${API_ENDPOINTS.zonas}/${id}`,
        payload,
      );
      return response.data;
    },
  );
};

export const deleteZona = async (id: number): Promise<void> => {
  return resolveMockOrMutate(
    () => {
      zonasStore.remove(id);
    },
    async () => {
      await axiosInstance.delete(`${API_ENDPOINTS.zonas}/${id}`);
    },
  );
};
