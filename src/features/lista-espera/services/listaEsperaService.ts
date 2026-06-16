import axiosInstance from "@/config/axios";
import { API_ENDPOINTS } from "@/shared/constants/apiConstants";
import type { ListaEspera } from "../types/listaEsperaType";

/** Servicio de acceso a datos del modulo Lista de Espera. */
export const getListaEspera = async (): Promise<ListaEspera[]> => {
  const response = await axiosInstance.get<ListaEspera[]>(
    API_ENDPOINTS.listaEspera,
  );
  return response.data;
};

export const getListaEsperaById = async (
  id: number,
): Promise<ListaEspera> => {
  const response = await axiosInstance.get<ListaEspera>(
    `${API_ENDPOINTS.listaEspera}/${id}`,
  );
  return response.data;
};
