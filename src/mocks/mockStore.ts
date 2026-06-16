import type { Identifiable } from "@/shared/types/crudTypes";

export interface MockStore<T extends Identifiable> {
  getAll: () => T[];
  getById: (id: number) => T;
  create: (input: Omit<T, "id">) => T;
  update: (id: number, input: Partial<Omit<T, "id">>) => T;
  remove: (id: number) => void;
}

/**
 * Almacen en memoria para simular persistencia durante la sesion con mocks.
 */
export const createMockStore = <T extends Identifiable>(
  seed: T[],
): MockStore<T> => {
  let items = [...seed];
  let nextId =
    items.length === 0 ? 1 : Math.max(...items.map((item) => item.id)) + 1;

  const findIndex = (id: number) => items.findIndex((item) => item.id === id);

  return {
    getAll: () => [...items],

    getById: (id: number) => {
      const item = items.find((entry) => entry.id === id);

      if (!item) {
        throw new Error(`Registro mock con id ${id} no encontrado.`);
      }

      return { ...item };
    },

    create: (input) => {
      const created = { id: nextId++, ...input } as T;
      items = [...items, created];
      return { ...created };
    },

    update: (id, input) => {
      const index = findIndex(id);

      if (index === -1) {
        throw new Error(`Registro mock con id ${id} no encontrado.`);
      }

      const updated = { ...items[index], ...input, id } as T;
      items = items.map((item) => (item.id === id ? updated : item));
      return { ...updated };
    },

    remove: (id) => {
      const index = findIndex(id);

      if (index === -1) {
        throw new Error(`Registro mock con id ${id} no encontrado.`);
      }

      items = items.filter((item) => item.id !== id);
    },
  };
};
