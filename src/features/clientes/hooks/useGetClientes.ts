import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/constants/queryKeyConstants";
import { getClientes } from "../services/clienteService";
import type { Cliente } from "../types/clienteType";

/** Hook que encapsula la consulta de clientes con TanStack Query. */
export const useGetClientes = () => {
  return useQuery<Cliente[]>({
    queryKey: [QUERY_KEYS.clientes],
    queryFn: getClientes,
    enabled: true,
  });
};
