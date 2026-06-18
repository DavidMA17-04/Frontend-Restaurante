/**
 * Representa una reserva del restaurante.
 * Alineado con ReservaResponseDTO / ReservaCreateDTO del backend.
 */
export interface Reserva {
  id: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  capacidad: number;
  clienteId: number;
  mesaId: number;
  estadoId: number;
  estado: string;
}

export type ReservaCreateInput = Omit<Reserva, "id" | "estado">;
export type ReservaUpdateInput = Partial<ReservaCreateInput>;
