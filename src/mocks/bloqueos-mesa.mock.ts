import type { BloqueoMesa } from "@/features/bloqueos-mesa/types/bloqueoMesaType";
import { toDateOnly } from "@/shared/utils/dateTime";

const DEMO_DATE = toDateOnly(new Date());
const DEMO_INICIO = "00:00:00";
const DEMO_FIN = "23:59:59";

export const BLOQUEOS_MESA_MOCK: BloqueoMesa[] = [
  {
    id: 1,
    mesaId: 2,
    fecha: "2026-06-18",
    horaInicio: "14:00:00",
    horaFin: "16:00:00",
    motivo: "Mantenimiento",
  },
  // --- Demo mapa (hoy): mesas bloqueadas ---
  {
    id: 2,
    mesaId: 2,
    fecha: DEMO_DATE,
    horaInicio: DEMO_INICIO,
    horaFin: DEMO_FIN,
    motivo: "Reparacion de mobiliario",
  },
  {
    id: 3,
    mesaId: 5,
    fecha: DEMO_DATE,
    horaInicio: DEMO_INICIO,
    horaFin: DEMO_FIN,
    motivo: "Limpieza profunda",
  },
  {
    id: 4,
    mesaId: 10,
    fecha: DEMO_DATE,
    horaInicio: DEMO_INICIO,
    horaFin: DEMO_FIN,
    motivo: "Zona exterior cerrada temporalmente",
  },
];
