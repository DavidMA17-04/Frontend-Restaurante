import type { Turno } from "@/features/turnos/types/turnoType";

export const TURNOS_MOCK: Turno[] = [
  {
    id: 1,
    nombre: "Turno General",
    horaInicio: "08:00:00",
    horaFin: "23:00:00",
    activo: true,
  },
  {
    id: 2,
    nombre: "Almuerzo",
    horaInicio: "12:00:00",
    horaFin: "15:00:00",
    activo: true,
  },
];
