/**
 * Representa una entrada en la lista de espera del restaurante.
 * Alineado con ListaEsperaResponseDTO / ListaEsperaCreateDTO del backend.
 */
export interface ListaEspera {
  id: number;
  clienteId: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  cantidad: number;
}

export type ListaEsperaCreateInput = Omit<ListaEspera, "id">;
export type ListaEsperaUpdateInput = Partial<ListaEsperaCreateInput>;
