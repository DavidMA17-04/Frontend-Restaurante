import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/constants/queryKeyConstants";
import { getListaEspera } from "../services/listaEsperaService";
import type { ListaEspera } from "../types/listaEsperaType";

/**
 * Hook que encapsula la consulta de la lista de espera con TanStack Query.
 * enabled: false hasta integrar el backend (etapa posterior).
 */
export const useGetListaEspera = () => {
  return useQuery<ListaEspera[]>({
    queryKey: [QUERY_KEYS.listaEspera],
    queryFn: getListaEspera,
    enabled: false,
  });
};
