/**
 * Acceso centralizado y tipado a las variables de entorno de Vite.
 */
export const env = {
  apiUrl: import.meta.env.VITE_API_URL ?? "",
  useMock: import.meta.env.VITE_USE_MOCK === "true",
} as const;
