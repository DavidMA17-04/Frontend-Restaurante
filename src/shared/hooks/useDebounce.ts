import { useEffect, useState } from "react";

/**
 * Retorna una version retrasada de un valor. Util para inputs de busqueda
 * que no deben disparar peticiones en cada pulsacion.
 */
export const useDebounce = <T>(value: T, delay = 400): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
