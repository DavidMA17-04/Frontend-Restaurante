import axiosInstance from "@/config/axios";
import { clientesStore } from "@/mocks/stores/clientesStore";
import { API_ENDPOINTS } from "@/shared/constants/apiConstants";
import {
  resolveMockOrFetch,
  resolveMockOrFetchById,
  resolveMockOrMutate,
} from "@/shared/utils/resolveMockOrFetch";
import type {
  Cliente,
  ClienteCreateInput,
  ClienteUpdateInput,
} from "../types/clienteType";

/** Servicio de acceso a datos del modulo Clientes. */
export const getClientes = async (): Promise<Cliente[]> => {
  return resolveMockOrFetch(clientesStore.getAll(), async () => {
    const response = await axiosInstance.get<Cliente[]>(API_ENDPOINTS.clientes);
    return response.data;
  });
};

export const getClienteById = async (id: number): Promise<Cliente> => {
  return resolveMockOrFetchById(
    () => clientesStore.getById(id),
    async () => {
      const response = await axiosInstance.get<Cliente>(
        `${API_ENDPOINTS.clientes}/${id}`,
      );
      return response.data;
    },
  );
};

export const createCliente = async (
  input: ClienteCreateInput,
): Promise<Cliente> => {
  return resolveMockOrMutate(
    () => clientesStore.create(input),
    async () => {
      const response = await axiosInstance.post<Cliente>(
        API_ENDPOINTS.clientes,
        input,
      );
      return response.data;
    },
  );
};

export const updateCliente = async ({
  id,
  data,
}: {
  id: number;
  data: ClienteUpdateInput;
}): Promise<Cliente> => {
  return resolveMockOrMutate(
    () => clientesStore.update(id, data),
    async () => {
      const response = await axiosInstance.put<Cliente>(
        `${API_ENDPOINTS.clientes}/${id}`,
        data,
      );
      return response.data;
    },
  );
};

export const deleteCliente = async (id: number): Promise<void> => {
  return resolveMockOrMutate(
    () => {
      clientesStore.remove(id);
    },
    async () => {
      await axiosInstance.delete(`${API_ENDPOINTS.clientes}/${id}`);
    },
  );
};
