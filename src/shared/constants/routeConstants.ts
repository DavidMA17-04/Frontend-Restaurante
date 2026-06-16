/** Rutas de la aplicacion usadas por el router y los enlaces de navegacion. */
export const ROUTES = {
  home: "/",
  clientes: "/clientes",
  empleados: "/empleados",
  mesas: "/mesas",
  reservas: "/reservas",
  turnos: "/turnos",
  zonas: "/zonas",
  bloqueosMesa: "/bloqueos-mesa",
  listaEspera: "/lista-espera",
} as const;

/** Elementos de navegacion mostrados en el Sidebar. */
export const NAV_ITEMS = [
  { label: "Inicio", path: ROUTES.home },
  { label: "Clientes", path: ROUTES.clientes },
  { label: "Empleados", path: ROUTES.empleados },
  { label: "Mesas", path: ROUTES.mesas },
  { label: "Reservas", path: ROUTES.reservas },
  { label: "Turnos", path: ROUTES.turnos },
  { label: "Zonas", path: ROUTES.zonas },
  { label: "Bloqueos de Mesa", path: ROUTES.bloqueosMesa },
  { label: "Lista de Espera", path: ROUTES.listaEspera },
] as const;
