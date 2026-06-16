/**
 * Representa una reserva del restaurante.
 * Los campos se alinearan con el DTO del backend ASP.NET Core.
 */
export interface Reserva {
  id: number;
  clienteId: number;
  mesaId: number;
  fecha: string;
  estado: string;
}

export type ReservaCreateInput = Omit<Reserva, "id">;
export type ReservaUpdateInput = Partial<ReservaCreateInput>;
