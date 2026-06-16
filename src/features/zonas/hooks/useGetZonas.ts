import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/constants/queryKeyConstants";
import { getZonas } from "../services/zonaService";
import type { Zona } from "../types/zonaType";

/**
 * Hook que encapsula la consulta de zonas con TanStack Query.
 * enabled: false hasta integrar el backend (etapa posterior).
 */
export const useGetZonas = () => {
  return useQuery<Zona[]>({
    queryKey: [QUERY_KEYS.zonas],
    queryFn: getZonas,
    enabled: false,
  });
};
