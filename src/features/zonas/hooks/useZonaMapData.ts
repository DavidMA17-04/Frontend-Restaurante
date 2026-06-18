import { useMemo } from "react";
import { useGetBloqueosMesa } from "@/features/bloqueos-mesa/hooks/useGetBloqueosMesa";
import { useGetClientes } from "@/features/clientes/hooks/useGetClientes";
import { useGetMesas } from "@/features/mesas/hooks/useGetMesas";
import { useGetReservas } from "@/features/reservas/hooks/useGetReservas";
import {
  resolveMesaPosition,
  toAbsolutePosition,
  ZONA_AREAS,
} from "@/features/zonas/map/zonaMapLayout";
import {
  buildConsultaHorario,
  getMesaEstado,
  type ConsultaHorario,
  type ZonaMapModel,
} from "@/features/zonas/utils/mesaEstado";
import { useGetZonas } from "./useGetZonas";

interface UseZonaMapDataParams {
  fecha: string;
  hora: string;
}

export const useZonaMapData = ({ fecha, hora }: UseZonaMapDataParams) => {
  const zonasQuery = useGetZonas();
  const mesasQuery = useGetMesas();
  const reservasQuery = useGetReservas();
  const bloqueosQuery = useGetBloqueosMesa();
  const clientesQuery = useGetClientes();

  const isLoading =
    zonasQuery.isLoading ||
    mesasQuery.isLoading ||
    reservasQuery.isLoading ||
    bloqueosQuery.isLoading ||
    clientesQuery.isLoading;

  const isError =
    zonasQuery.isError ||
    mesasQuery.isError ||
    reservasQuery.isError ||
    bloqueosQuery.isError ||
    clientesQuery.isError;

  const consulta: ConsultaHorario = useMemo(
    () => buildConsultaHorario(fecha, hora),
    [fecha, hora],
  );

  const zonasMap = useMemo<ZonaMapModel[]>(() => {
    const zonas = zonasQuery.data ?? [];
    const mesas = mesasQuery.data ?? [];
    const reservas = reservasQuery.data ?? [];
    const bloqueos = bloqueosQuery.data ?? [];
    const clientes = clientesQuery.data ?? [];

    return zonas.map((zona) => {
      const mesasZona = mesas.filter((mesa) => mesa.zonaId === zona.id);
      const mesaIds = mesasZona.map((mesa) => mesa.id);
      const zonaArea = ZONA_AREAS[zona.id] ?? { x: 5, y: 5, width: 40, height: 40 };

      const mesasMap = mesasZona.map((mesa) => {
        const relativePos = resolveMesaPosition(mesa.id, zona.id, mesaIds);
        const absolutePos = toAbsolutePosition(zonaArea, relativePos);

        return {
          ...mesa,
          estado: getMesaEstado(
            mesa.id,
            consulta,
            reservas,
            bloqueos,
            clientes,
          ),
          posicion: absolutePos,
        };
      });

      return {
        zona,
        mesas: mesasMap,
        totalMesas: mesasZona.length,
        totalSillas: mesasZona.reduce((sum, mesa) => sum + mesa.capacidad, 0),
      };
    });
  }, [
    bloqueosQuery.data,
    clientesQuery.data,
    consulta,
    mesasQuery.data,
    reservasQuery.data,
    zonasQuery.data,
  ]);

  return {
    consulta,
    zonasMap,
    isLoading,
    isError,
  };
};
