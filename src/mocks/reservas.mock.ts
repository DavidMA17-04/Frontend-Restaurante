import type { Reserva } from "@/features/reservas/types/reservaType";

export const RESERVAS_MOCK: Reserva[] = [
  {
    id: 1,
    clienteId: 1,
    mesaId: 3,
    fecha: "2026-06-20T19:00:00",
    estado: "Confirmada",
  },
  {
    id: 2,
    clienteId: 2,
    mesaId: 1,
    fecha: "2026-06-21T13:00:00",
    estado: "Pendiente",
  },
  {
    id: 3,
    clienteId: 3,
    mesaId: 2,
    fecha: "2026-06-22T20:30:00",
    estado: "Cancelada",
  },
  {
    id: 4,
    clienteId: 4,
    mesaId: 5,
    fecha: "2026-06-23T18:00:00",
    estado: "Confirmada",
  },
];
