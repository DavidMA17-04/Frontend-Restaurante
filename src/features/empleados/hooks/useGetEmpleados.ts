import { useQuery } from "@tanstack/react-query";
import { env } from "@/config/env";
import { QUERY_KEYS } from "@/shared/constants/queryKeyConstants";
import { getEmpleados } from "../services/empleadoService";
import type { Empleado } from "../types/empleadoType";

/** Hook que encapsula la consulta de empleados (solo mock). */
export const useGetEmpleados = () => {
  return useQuery<Empleado[]>({
    queryKey: [QUERY_KEYS.empleados],
    queryFn: getEmpleados,
    enabled: env.useMock,
  });
};
