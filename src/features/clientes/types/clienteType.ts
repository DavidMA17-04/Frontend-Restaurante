/**
 * Representa un cliente del restaurante.
 * Alineado con ClienteResponseDTO / ClienteCreateDTO del backend.
 */
export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  telefono: number;
  cedula: number;
}

export type ClienteCreateInput = Omit<Cliente, "id">;
export type ClienteUpdateInput = Partial<ClienteCreateInput>;

/** Payload enviado al API (identico al DTO de creacion del backend). */
export type ClienteApiPayload = ClienteCreateInput;
