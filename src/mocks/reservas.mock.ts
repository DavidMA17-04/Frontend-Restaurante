import type { Reserva } from "@/features/reservas/types/reservaType";

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
];
