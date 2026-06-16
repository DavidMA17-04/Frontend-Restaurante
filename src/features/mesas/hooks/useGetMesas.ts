import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/constants/queryKeyConstants";
import { getMesas } from "../services/mesaService";
import type { Mesa } from "../types/mesaType";

/** Hook que encapsula la consulta de mesas con TanStack Query. */
export const useGetMesas = () => {
  return useQuery<Mesa[]>({
    queryKey: [QUERY_KEYS.mesas],
    queryFn: getMesas,
    enabled: true,
  });
};
