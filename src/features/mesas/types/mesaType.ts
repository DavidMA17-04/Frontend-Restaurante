/**
 * Representa una mesa del restaurante.
 * Los campos se alinearan con el DTO del backend ASP.NET Core.
 */
export interface Mesa {
  id: number;
  numero: number;
  capacidad: number;
  zonaId: number;
  estado: string;
}

export type MesaCreateInput = Omit<Mesa, "id">;
export type MesaUpdateInput = Partial<MesaCreateInput>;
