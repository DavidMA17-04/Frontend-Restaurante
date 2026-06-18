/**
 * Representa un turno de trabajo del restaurante.
 * Alineado con la entidad Turno del backend.
 */
export interface Turno {
  id: number;
  nombre: string;
  horaInicio: string;
  horaFin: string;
  activo: boolean;
}

export type TurnoCreateInput = Omit<Turno, "id">;
export type TurnoUpdateInput = Partial<TurnoCreateInput>;
