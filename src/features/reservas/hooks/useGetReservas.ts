import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/constants/queryKeyConstants";
import { getReservas } from "../services/reservaService";
import type { Reserva } from "../types/reservaType";

/** Hook que encapsula la consulta de reservas con TanStack Query. */
export const useGetReservas = () => {
  return useQuery<Reserva[]>({
    queryKey: [QUERY_KEYS.reservas],
    queryFn: getReservas,
    enabled: true,
  });
};
