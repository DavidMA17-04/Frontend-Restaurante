import axiosInstance from "@/config/axios";
import { mesasStore } from "@/mocks/stores/mesasStore";
import { API_ENDPOINTS } from "@/shared/constants/apiConstants";
import {
  resolveMockOrFetch,
  resolveMockOrFetchById,
  resolveMockOrMutate,
} from "@/shared/utils/resolveMockOrFetch";
import type {
  Mesa,
  MesaCreateInput,
  MesaUpdateInput,
} from "../types/mesaType";

/** Servicio de acceso a datos del modulo Mesas. */
export const getMesas = async (): Promise<Mesa[]> => {
  return resolveMockOrFetch(mesasStore.getAll(), async () => {
    const response = await axiosInstance.get<Mesa[]>(API_ENDPOINTS.mesas);
    return response.data;
  });
};

export const getMesaById = async (id: number): Promise<Mesa> => {
  return resolveMockOrFetchById(
    () => mesasStore.getById(id),
    async () => {
      const response = await axiosInstance.get<Mesa>(
        `${API_ENDPOINTS.mesas}/${id}`,
      );
      return response.data;
    },
  );
};

export const createMesa = async (input: MesaCreateInput): Promise<Mesa> => {
  return resolveMockOrMutate(
    () => mesasStore.create(input),
    async () => {
      const response = await axiosInstance.post<Mesa>(
        API_ENDPOINTS.mesas,
        input,
      );
      return response.data;
    },
  );
};

export const updateMesa = async ({
  id,
  data,
}: {
  id: number;
  data: MesaUpdateInput;
}): Promise<Mesa> => {
  return resolveMockOrMutate(
    () => mesasStore.update(id, data),
    async () => {
      const response = await axiosInstance.put<Mesa>(
        `${API_ENDPOINTS.mesas}/${id}`,
        data,
      );
      return response.data;
    },
  );
};

export const deleteMesa = async (id: number): Promise<void> => {
  return resolveMockOrMutate(
    () => {
      mesasStore.remove(id);
    },
    async () => {
      await axiosInstance.delete(`${API_ENDPOINTS.mesas}/${id}`);
    },
  );
};
