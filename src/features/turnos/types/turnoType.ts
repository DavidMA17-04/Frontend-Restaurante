/**
 * Representa un turno de trabajo del restaurante.
 * Los campos se alinearan con el DTO del backend ASP.NET Core.
 */
export interface Turno {
  id: number;
  nombre: string;
  horaInicio: string;
  horaFin: string;
}
