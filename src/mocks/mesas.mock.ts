import type { Mesa } from "@/features/mesas/types/mesaType";

export const MESAS_MOCK: Mesa[] = [
  { id: 1, numero: 1, capacidad: 4, zonaId: 1, estado: "Disponible" },
  { id: 2, numero: 2, capacidad: 2, zonaId: 1, estado: "Ocupada" },
  { id: 3, numero: 3, capacidad: 6, zonaId: 2, estado: "Reservada" },
  { id: 4, numero: 4, capacidad: 4, zonaId: 3, estado: "Disponible" },
  { id: 5, numero: 5, capacidad: 8, zonaId: 4, estado: "Bloqueada" },
];
