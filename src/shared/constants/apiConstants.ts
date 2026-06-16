/** Tiempo maximo de espera (ms) para las peticiones HTTP. */
export const API_TIMEOUT = 5000;

/** Endpoints REST expuestos por el backend ASP.NET Core. */
export const API_ENDPOINTS = {
  clientes: "/clientes",
  empleados: "/empleados",
  mesas: "/mesas",
  reservas: "/reservas",
  turnos: "/turnos",
  zonas: "/zonas",
  bloqueosMesa: "/bloqueos-mesa",
  listaEspera: "/lista-espera",
} as const;
