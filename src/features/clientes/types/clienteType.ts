/**
 * Representa un cliente del restaurante.
 * Los campos se alinearan con el DTO del backend ASP.NET Core.
 */
export interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
}
