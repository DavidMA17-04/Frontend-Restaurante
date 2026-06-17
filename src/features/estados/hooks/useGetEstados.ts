import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/constants/queryKeyConstants";
import { getEstados } from "../services/estadoService";
import type { Estado } from "../types/estadoType";

/** Hook que encapsula la consulta de estados con TanStack Query. */
export const useGetEstados = () => {
  return useQuery<Estado[]>({
    queryKey: [QUERY_KEYS.estados],
    queryFn: getEstados,
    enabled: true,
  });
};
