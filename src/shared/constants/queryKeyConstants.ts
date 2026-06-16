/**
 * Claves de cache de TanStack Query agrupadas por modulo.
 * Centralizarlas evita invalidaciones rotas por strings duplicados.
 */
export const QUERY_KEYS = {
  clientes: "clientes",
  empleados: "empleados",
  mesas: "mesas",
  reservas: "reservas",
  turnos: "turnos",
  zonas: "zonas",
  bloqueosMesa: "bloqueos-mesa",
  listaEspera: "lista-espera",
} as const;
