import { env } from "@/config/env";
import type { Identifiable } from "@/shared/types/crudTypes";

const MOCK_DELAY_MS = 350;

/** Simula latencia de red al usar datos mock. */
const simulateNetworkDelay = async () => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
};

/**
 * Retorna datos mock o ejecuta la peticion real segun VITE_USE_MOCK.
 */
export const resolveMockOrFetch = async <T>(
  mockData: T,
  fetchFn: () => Promise<T>,
): Promise<T> => {
  if (env.useMock) {
    await simulateNetworkDelay();
    return mockData;
  }

  return fetchFn();
};

/**
 * Ejecuta una mutacion mock o la peticion HTTP real segun VITE_USE_MOCK.
 */
export const resolveMockOrMutate = async <T>(
  mockFn: () => T,
  fetchFn: () => Promise<T>,
): Promise<T> => {
  if (env.useMock) {
    await simulateNetworkDelay();
    return mockFn();
  }

  return fetchFn();
};

/** Busca un registro en un arreglo mock estatico por id. */
export const findMockItemById = <T extends Identifiable>(
  items: T[],
  id: number,
): T => {
  const item = items.find((entry) => entry.id === id);

  if (!item) {
    throw new Error(`Registro mock con id ${id} no encontrado.`);
  }

  return item;
};

/**
 * Variante para consultas por id usando un arreglo mock local o un store.
 */
export const resolveMockOrFetchById = async <T>(
  getMockItem: () => T,
  fetchFn: () => Promise<T>,
): Promise<T> => {
  if (env.useMock) {
    await simulateNetworkDelay();
    return getMockItem();
  }

  return fetchFn();
};
