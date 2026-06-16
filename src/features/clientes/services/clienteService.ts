import axiosInstance from "@/config/axios";
import { API_ENDPOINTS } from "@/shared/constants/apiConstants";
import type { Cliente } from "../types/clienteType";

/**
 * Servicio de acceso a datos del modulo Clientes.
 * Solo se comunica con el backend via Axios; no contiene logica de React.
 *
 * Nota (etapa 1): la peticion real esta lista pero deshabilitada en el hook.
 * Cuando el backend este integrado, este servicio funcionara sin cambios.
 */
export const getClientes = async (): Promise<Cliente[]> => {
  const response = await axiosInstance.get<Cliente[]>(API_ENDPOINTS.clientes);
  return response.data;
};

export const getClienteById = async (id: number): Promise<Cliente> => {
  const response = await axiosInstance.get<Cliente>(
    `${API_ENDPOINTS.clientes}/${id}`,
  );
  return response.data;
};
