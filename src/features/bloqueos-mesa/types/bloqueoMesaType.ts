/**
 * Representa un bloqueo temporal de una mesa.
 * Alineado con BloqueoResponseDTO / BloqueoCreateDTO del backend.
 */
export interface BloqueoMesa {
  id: number;
  mesaId: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  motivo: string;
}

export type BloqueoMesaCreateInput = Omit<BloqueoMesa, "id">;
export type BloqueoMesaUpdateInput = Partial<BloqueoMesaCreateInput>;
