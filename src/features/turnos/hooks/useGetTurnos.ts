import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/constants/queryKeyConstants";
import { getTurnos } from "../services/turnoService";
import type { Turno } from "../types/turnoType";

/**
 * Hook que encapsula la consulta de turnos con TanStack Query.
 * enabled: false hasta integrar el backend (etapa posterior).
 */
export const useGetTurnos = () => {
  return useQuery<Turno[]>({
    queryKey: [QUERY_KEYS.turnos],
    queryFn: getTurnos,
    enabled: false,
  });
};
