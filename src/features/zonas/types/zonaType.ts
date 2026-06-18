/**
 * Representa una zona del restaurante.
 * Alineado con ZonaResponseDTO / ZonaCreateDTO del backend.
 */
export interface Zona {
  id: number;
  nombre: string;
  disponibilidad: boolean;
}

export type ZonaCreateInput = Omit<Zona, "id">;
export type ZonaUpdateInput = Partial<ZonaCreateInput>;
