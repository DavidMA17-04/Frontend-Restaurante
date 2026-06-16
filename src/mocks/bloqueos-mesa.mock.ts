import type { BloqueoMesa } from "@/features/bloqueos-mesa/types/bloqueoMesaType";

export const BLOQUEOS_MESA_MOCK: BloqueoMesa[] = [
  {
    id: 1,
    mesaId: 2,
    fechaInicio: "2026-06-18",
    fechaFin: "2026-06-19",
    motivo: "Mantenimiento",
  },
  {
    id: 2,
    mesaId: 5,
    fechaInicio: "2026-06-25",
    fechaFin: "2026-06-25",
    motivo: "Evento privado",
  },
  {
    id: 3,
    mesaId: 1,
    fechaInicio: "2026-06-28",
    fechaFin: "2026-06-30",
    motivo: "Renovacion de mobiliario",
  },
  {
    id: 4,
    mesaId: 4,
    fechaInicio: "2026-07-01",
    fechaFin: "2026-07-01",
    motivo: "Reservado para staff",
  },
];
