import type { BloqueoMesa } from "@/features/bloqueos-mesa/types/bloqueoMesaType";
import type { Cliente } from "@/features/clientes/types/clienteType";
import type { Mesa } from "@/features/mesas/types/mesaType";
import type { Reserva } from "@/features/reservas/types/reservaType";
import type { Zona } from "@/features/zonas/types/zonaType";
import { formatDateTimeParts } from "@/shared/utils/dateTime";

export type MesaEstadoTipo = "libre" | "reservada" | "bloqueada";

export interface ConsultaHorario {
  fecha: string;
  horaInicio: string;
  horaFin: string;
}

export interface MesaEstadoDetalle {
  mesaId: number;
  tipo: MesaEstadoTipo;
  reserva?: Reserva;
  bloqueo?: BloqueoMesa;
  clienteNombre?: string;
  horarioTexto?: string;
  motivo?: string;
}

export interface MesaMapItem extends Mesa {
  estado: MesaEstadoDetalle;
  posicion: { x: number; y: number };
}

export interface ZonaMapModel {
  zona: Zona;
  mesas: MesaMapItem[];
  totalMesas: number;
  totalSillas: number;
}

const ESTADOS_RESERVA_INACTIVOS = new Set(["cancelada", "cancelado"]);

const normalizarHora = (hora: string) => {
  const parts = hora.split(":");
  if (parts.length === 2) {
    return `${hora}:00`;
  }
  return hora;
};

const haySolapamiento = (
  fechaA: string,
  inicioA: string,
  finA: string,
  fechaB: string,
  inicioB: string,
  finB: string,
) => {
  if (fechaA !== fechaB) {
    return false;
  }

  const aInicio = normalizarHora(inicioA);
  const aFin = normalizarHora(finA);
  const bInicio = normalizarHora(inicioB);
  const bFin = normalizarHora(finB);

  return aInicio < bFin && aFin > bInicio;
};

const getClienteNombre = (
  clienteId: number,
  clientes: Cliente[],
): string | undefined => {
  const cliente = clientes.find((item) => item.id === clienteId);
  if (!cliente) {
    return undefined;
  }
  return `${cliente.nombre} ${cliente.apellido}`.trim();
};

export const getMesaEstado = (
  mesaId: number,
  consulta: ConsultaHorario,
  reservas: Reserva[],
  bloqueos: BloqueoMesa[],
  clientes: Cliente[],
): MesaEstadoDetalle => {
  const bloqueoActivo = bloqueos.find(
    (bloqueo) =>
      bloqueo.mesaId === mesaId &&
      haySolapamiento(
        consulta.fecha,
        consulta.horaInicio,
        consulta.horaFin,
        bloqueo.fecha,
        bloqueo.horaInicio,
        bloqueo.horaFin,
      ),
  );

  if (bloqueoActivo) {
    return {
      mesaId,
      tipo: "bloqueada",
      bloqueo: bloqueoActivo,
      motivo: bloqueoActivo.motivo,
      horarioTexto: formatDateTimeParts(
        bloqueoActivo.fecha,
        bloqueoActivo.horaInicio,
      ),
    };
  }

  const reservaActiva = reservas.find(
    (reserva) =>
      reserva.mesaId === mesaId &&
      !ESTADOS_RESERVA_INACTIVOS.has(reserva.estado.toLowerCase()) &&
      haySolapamiento(
        consulta.fecha,
        consulta.horaInicio,
        consulta.horaFin,
        reserva.fecha,
        reserva.horaInicio,
        reserva.horaFin,
      ),
  );

  if (reservaActiva) {
    return {
      mesaId,
      tipo: "reservada",
      reserva: reservaActiva,
      clienteNombre: getClienteNombre(reservaActiva.clienteId, clientes),
      horarioTexto: formatDateTimeParts(
        reservaActiva.fecha,
        reservaActiva.horaInicio,
      ),
    };
  }

  return { mesaId, tipo: "libre" };
};

export const buildConsultaHorario = (
  fecha: string,
  hora: string,
  duracionHoras = 2,
): ConsultaHorario => {
  const inicio = normalizarHora(hora.length === 5 ? `${hora}:00` : hora);
  const [hours, minutes] = inicio.split(":").map(Number);
  const finDate = new Date();
  finDate.setHours(hours + duracionHoras, minutes, 0, 0);
  const horaFin = `${String(finDate.getHours()).padStart(2, "0")}:${String(finDate.getMinutes()).padStart(2, "0")}:00`;

  return { fecha, horaInicio: inicio, horaFin };
};
