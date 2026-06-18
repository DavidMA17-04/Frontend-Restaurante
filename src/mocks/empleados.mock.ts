import type { Empleado } from "@/features/empleados/types/empleadoType";

export const EMPLEADOS_MOCK: Empleado[] = [
  { id: 1, nombre: "Carlos Ruiz", rol: "Mesero", activo: true },
  { id: 2, nombre: "Sofia Lopez", rol: "Cajero", activo: true },
  { id: 3, nombre: "Pedro Jimenez", rol: "Gerente", activo: true },
  { id: 4, nombre: "Laura Castro", rol: "Chef", activo: false },
];
