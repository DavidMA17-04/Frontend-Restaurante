import type { Zona } from "@/features/zonas/types/zonaType";

export const ZONAS_MOCK: Zona[] = [
  { id: 1, nombre: "Terraza", disponibilidad: true },
  { id: 2, nombre: "VIP", disponibilidad: true },
  { id: 3, nombre: "Interior", disponibilidad: true },
  { id: 4, nombre: "Exterior", disponibilidad: false },
];
