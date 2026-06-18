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

/** Modulos disponibles solo con datos mock (sin endpoint en el backend). */
export const MOCK_ONLY_MODULES = ["empleados"] as const;

export type NavIconKey =
  | "home"
  | "users"
  | "briefcase"
  | "layoutGrid"
  | "calendar"
  | "clock"
  | "mapPin"
  | "ban"
  | "list";

/** Elementos de navegacion mostrados en el Navbar y tarjetas del Home. */
export const NAV_ITEMS = [
  {
    label: "Inicio",
    path: ROUTES.home,
    icon: "home" as NavIconKey,
    description: "Panel principal del sistema",
  },
  {
    label: "Clientes",
    path: ROUTES.clientes,
    icon: "users" as NavIconKey,
    description: "Gestion de clientes registrados",
  },
  {
    label: "Mesas",
    path: ROUTES.mesas,
    icon: "layoutGrid" as NavIconKey,
    description: "Mesas, capacidad y estado",
  },
  {
    label: "Reservas",
    path: ROUTES.reservas,
    icon: "calendar" as NavIconKey,
    description: "Reservaciones y disponibilidad",
  },
  {
    label: "Turnos",
    path: ROUTES.turnos,
    icon: "clock" as NavIconKey,
    description: "Horarios de servicio",
  },
  {
    label: "Zonas",
    path: ROUTES.zonas,
    icon: "mapPin" as NavIconKey,
    description: "Areas del restaurante",
  },
  {
    label: "Bloqueos de Mesa",
    path: ROUTES.bloqueosMesa,
    icon: "ban" as NavIconKey,
    description: "Bloqueos temporales de mesas",
  },
  {
    label: "Lista de Espera",
    path: ROUTES.listaEspera,
    icon: "list" as NavIconKey,
    description: "Clientes en espera de mesa",
  },
] as const;
