/**
 * Acceso centralizado y tipado a las variables de entorno de Vite.
 */
const parseBooleanEnv = (
  value: string | undefined,
  defaultValue: boolean,
): boolean => {
  if (value === undefined || value.trim() === "") {
    return defaultValue;
  }

  const normalized = value.trim().toLowerCase();

  if (normalized === "true" || normalized === "1" || normalized === "yes") {
    return true;
  }

  if (normalized === "false" || normalized === "0" || normalized === "no") {
    return false;
  }

  return defaultValue;
};

export const env = {
  apiUrl: import.meta.env.VITE_API_URL ?? "http://localhost:5052/api",
  /** Por defecto true en desarrollo si la variable no esta definida. */
  useMock: parseBooleanEnv(import.meta.env.VITE_USE_MOCK, import.meta.env.DEV),
} as const;
