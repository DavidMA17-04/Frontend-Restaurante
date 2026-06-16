/**
 * Representa una zona del restaurante (ej. terraza, salon principal).
 * Los campos se alinearan con el DTO del backend ASP.NET Core.
 */
export interface Zona {
  id: number;
  nombre: string;
  descripcion: string;
}

export type ZonaCreateInput = Omit<Zona, "id">;
export type ZonaUpdateInput = Partial<ZonaCreateInput>;
