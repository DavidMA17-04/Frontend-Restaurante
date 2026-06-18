/** Representa un estado del sistema (reservas, etc.). */
export interface Estado {
  id: number;
  nombre: string;
}

export type EstadoCreateInput = Omit<Estado, "id">;
export type EstadoUpdateInput = Partial<EstadoCreateInput>;
