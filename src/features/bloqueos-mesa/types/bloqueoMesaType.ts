/**
 * Representa un bloqueo temporal de una mesa (mantenimiento, evento, etc.).
 * Los campos se alinearan con el DTO del backend ASP.NET Core.
 */
export interface BloqueoMesa {
  id: number;
  mesaId: number;
  fechaInicio: string;
  fechaFin: string;
  motivo: string;
}
