/**
 * Representa una mesa del restaurante.
 * Alineado con MesaResponseDTO / MesaCreateDTO del backend.
 */
export interface Mesa {
  id: number;
  numero: number;
  capacidad: number;
  zonaId: number;
}

export type MesaCreateInput = Omit<Mesa, "id">;
export type MesaUpdateInput = Partial<MesaCreateInput>;
