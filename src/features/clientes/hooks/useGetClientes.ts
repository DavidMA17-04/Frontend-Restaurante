import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/constants/queryKeyConstants";
import { getClientes } from "../services/clienteService";
import type { Cliente } from "../types/clienteType";

/**
 * Hook que encapsula la consulta de clientes con TanStack Query.
 * Es el puente entre la capa de presentacion y el servicio.
 *
 * enabled: false evita disparar peticiones HTTP reales en la etapa 1
 * (sin backend integrado). Cambiar a true al conectar la API.
 */
export const useGetClientes = () => {
  return useQuery<Cliente[]>({
    queryKey: [QUERY_KEYS.clientes],
    queryFn: getClientes,
    enabled: false,
  });
};
