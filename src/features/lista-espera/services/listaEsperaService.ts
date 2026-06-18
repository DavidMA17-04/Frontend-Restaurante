import axiosInstance from "@/config/axios";
import { listaEsperaStore } from "@/mocks/stores/listaEsperaStore";
import { API_ENDPOINTS } from "@/shared/constants/apiConstants";
import {
  resolveMockOrFetch,
  resolveMockOrFetchById,
  resolveMockOrMutate,
} from "@/shared/utils/resolveMockOrFetch";
import type {
  ListaEspera,
  ListaEsperaCreateInput,
  ListaEsperaUpdateInput,
} from "../types/listaEsperaType";

const buildListaPayload = (
  input: ListaEsperaCreateInput | ListaEsperaUpdateInput,
  current?: ListaEspera,
): ListaEsperaCreateInput => ({
  clienteId: input.clienteId ?? current!.clienteId,
  fecha: input.fecha ?? current!.fecha,
  horaInicio: input.horaInicio ?? current!.horaInicio,
  horaFin: input.horaFin ?? current!.horaFin,
  cantidad: input.cantidad ?? current!.cantidad,
});

/** Servicio de acceso a datos del modulo Lista de Espera. */
export const getListaEspera = async (): Promise<ListaEspera[]> => {
  return resolveMockOrFetch(listaEsperaStore.getAll(), async () => {
    const response = await axiosInstance.get<ListaEspera[]>(
      API_ENDPOINTS.listaEspera,
    );
    return response.data;
  });
};

export const getListaEsperaById = async (id: number): Promise<ListaEspera> => {
  return resolveMockOrFetchById(
    () => listaEsperaStore.getById(id),
    async () => {
      const response = await axiosInstance.get<ListaEspera>(
        `${API_ENDPOINTS.listaEspera}/${id}`,
      );
      return response.data;
    },
  );
};

export const createListaEspera = async (
  input: ListaEsperaCreateInput,
): Promise<ListaEspera> => {
  return resolveMockOrMutate(
    () => listaEsperaStore.create(input),
    async () => {
      const response = await axiosInstance.post<ListaEspera>(
        API_ENDPOINTS.listaEspera,
        input,
      );
      return response.data;
    },
  );
};

export const updateListaEspera = async ({
  id,
  data,
}: {
  id: number;
  data: ListaEsperaUpdateInput;
}): Promise<ListaEspera> => {
  return resolveMockOrMutate(
    () => listaEsperaStore.update(id, data),
    async () => {
      const current = await getListaEsperaById(id);
      const payload = buildListaPayload(data, current);
      const response = await axiosInstance.put<ListaEspera>(
        `${API_ENDPOINTS.listaEspera}/${id}`,
        payload,
      );
      return response.data;
    },
  );
};

export const promoverListaEspera = async (
  listaEsperaId: number,
  mesaId: number,
): Promise<void> => {
  return resolveMockOrMutate(
    () => {
      listaEsperaStore.remove(listaEsperaId);
    },
    async () => {
      await axiosInstance.post(
        `${API_ENDPOINTS.listaEspera}/${listaEsperaId}/promover/${mesaId}`,
      );
    },
  );
};
