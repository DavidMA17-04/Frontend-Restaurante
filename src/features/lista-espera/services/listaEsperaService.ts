import axiosInstance from "@/config/axios";
import { LISTA_ESPERA_MOCK } from "@/mocks/lista-espera.mock";
import { API_ENDPOINTS } from "@/shared/constants/apiConstants";
import {
  findMockItemById,
  resolveMockOrFetch,
  resolveMockOrFetchById,
} from "@/shared/utils/resolveMockOrFetch";
import type { ListaEspera } from "../types/listaEsperaType";

/** Servicio de acceso a datos del modulo Lista de Espera. */
export const getListaEspera = async (): Promise<ListaEspera[]> => {
  return resolveMockOrFetch(LISTA_ESPERA_MOCK, async () => {
    const response = await axiosInstance.get<ListaEspera[]>(
      API_ENDPOINTS.listaEspera,
    );
    return response.data;
  });
};

export const getListaEsperaById = async (
  id: number,
): Promise<ListaEspera> => {
  return resolveMockOrFetchById(
    () => findMockItemById(LISTA_ESPERA_MOCK, id),
    async () => {
      const response = await axiosInstance.get<ListaEspera>(
        `${API_ENDPOINTS.listaEspera}/${id}`,
      );
      return response.data;
    },
  );
};
