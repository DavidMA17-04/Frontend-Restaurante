import type { Reserva } from "@/features/reservas/types/reservaType";
import { toDateOnly } from "@/shared/utils/dateTime";

/** Fecha de hoy: las reservas demo siempre coinciden con el selector del mapa. */
const DEMO_DATE = toDateOnly(new Date());

/** Ventana amplia para que el estado se vea casi a cualquier hora del dia. */
const DEMO_INICIO = "00:00:00";
const DEMO_FIN = "23:59:59";

export const RESERVAS_MOCK: Reserva[] = [
  {
    id: 1,
    fecha: "2026-06-20",
    horaInicio: "19:00:00",
    horaFin: "21:00:00",
    capacidad: 4,
    clienteId: 1,
    mesaId: 3,
    estadoId: 2,
    estado: "Confirmada",
  },
  {
    id: 2,
    fecha: "2026-06-21",
    horaInicio: "13:00:00",
    horaFin: "15:00:00",
    capacidad: 2,
    clienteId: 2,
    mesaId: 1,
    estadoId: 1,
    estado: "Pendiente",
  },
  // --- Demo mapa (hoy): mesas reservadas en varias zonas ---
  {
    id: 3,
    fecha: DEMO_DATE,
    horaInicio: DEMO_INICIO,
    horaFin: DEMO_FIN,
    capacidad: 2,
    clienteId: 2,
    mesaId: 1,
    estadoId: 2,
    estado: "Confirmada",
  },
  {
    id: 4,
    fecha: DEMO_DATE,
    horaInicio: DEMO_INICIO,
    horaFin: DEMO_FIN,
    capacidad: 6,
    clienteId: 1,
    mesaId: 3,
    estadoId: 2,
    estado: "Confirmada",
  },
  {
    id: 5,
    fecha: DEMO_DATE,
    horaInicio: DEMO_INICIO,
    horaFin: DEMO_FIN,
    capacidad: 8,
    clienteId: 3,
    mesaId: 4,
    estadoId: 2,
    estado: "Confirmada",
  },
  {
    id: 6,
    fecha: DEMO_DATE,
    horaInicio: DEMO_INICIO,
    horaFin: DEMO_FIN,
    capacidad: 6,
    clienteId: 1,
    mesaId: 6,
    estadoId: 1,
    estado: "Pendiente",
  },
  {
    id: 7,
    fecha: DEMO_DATE,
    horaInicio: DEMO_INICIO,
    horaFin: DEMO_FIN,
    capacidad: 4,
    clienteId: 2,
    mesaId: 7,
    estadoId: 2,
    estado: "Confirmada",
  },
  {
    id: 8,
    fecha: DEMO_DATE,
    horaInicio: DEMO_INICIO,
    horaFin: DEMO_FIN,
    capacidad: 4,
    clienteId: 3,
    mesaId: 8,
    estadoId: 2,
    estado: "Confirmada",
  },
];
