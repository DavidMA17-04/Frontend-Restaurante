import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/constants/queryKeyConstants";
import { getBloqueosMesa } from "../services/bloqueoMesaService";
import type { BloqueoMesa } from "../types/bloqueoMesaType";

/** Hook que encapsula la consulta de bloqueos de mesa con TanStack Query. */
export const useGetBloqueosMesa = () => {
  return useQuery<BloqueoMesa[]>({
    queryKey: [QUERY_KEYS.bloqueosMesa],
    queryFn: getBloqueosMesa,
    enabled: true,
  });
};
