/** Tiempo maximo de espera (ms) para las peticiones HTTP. */
export const API_TIMEOUT = 10000;

/** Endpoints REST expuestos por RestauranteAPI (ASP.NET Core). */
export const API_ENDPOINTS = {
  clientes: "/Clientes",
  mesas: "/Mesas",
  reservas: "/Reservas",
  turnos: "/Turnos",
  zonas: "/Zonas",
  bloqueos: "/Bloqueos",
  listaEspera: "/ListaEspera",
  estados: "/Estados",
} as const;
