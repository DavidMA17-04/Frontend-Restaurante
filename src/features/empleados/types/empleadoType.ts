/**
 * Representa un empleado del restaurante.
 * Los campos se alinearan con el DTO del backend ASP.NET Core.
 */
export interface Empleado {
  id: number;
  nombre: string;
  rol: string;
  activo: boolean;
}
