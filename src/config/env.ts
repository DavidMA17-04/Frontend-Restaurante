/**
 * Acceso centralizado y tipado a las variables de entorno de Vite.
 * Evita usar import.meta.env disperso por toda la aplicacion.
 */
export const env = {
  apiUrl: import.meta.env.VITE_API_URL ?? "",
} as const;
