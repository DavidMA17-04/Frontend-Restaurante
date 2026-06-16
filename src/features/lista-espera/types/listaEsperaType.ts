/**
 * Representa una entrada en la lista de espera del restaurante.
 * Los campos se alinearan con el DTO del backend ASP.NET Core.
 */
export interface ListaEspera {
  id: number;
  clienteId: number;
  fechaRegistro: string;
  estado: string;
}
