import { empleadosStore } from "@/mocks/stores/empleadosStore";
import {
  resolveMockOrFetch,
  resolveMockOrFetchById,
  resolveMockOrMutate,
} from "@/shared/utils/resolveMockOrFetch";
import type {
  Empleado,
  EmpleadoCreateInput,
  EmpleadoUpdateInput,
} from "../types/empleadoType";

const empleadosApiUnavailable = () => {
  throw new Error(
    "El modulo Empleados solo esta disponible con datos mock (VITE_USE_MOCK=true).",
  );
};

/** Servicio de empleados — mock local; sin endpoint en RestauranteAPI. */
export const getEmpleados = async (): Promise<Empleado[]> => {
  return resolveMockOrFetch(empleadosStore.getAll(), empleadosApiUnavailable);
};

export const getEmpleadoById = async (id: number): Promise<Empleado> => {
  return resolveMockOrFetchById(
    () => empleadosStore.getById(id),
    empleadosApiUnavailable,
  );
};

export const createEmpleado = async (
  input: EmpleadoCreateInput,
): Promise<Empleado> => {
  return resolveMockOrMutate(
    () => empleadosStore.create(input),
    empleadosApiUnavailable,
  );
};

export const updateEmpleado = async ({
  id,
  data,
}: {
  id: number;
  data: EmpleadoUpdateInput;
}): Promise<Empleado> => {
  return resolveMockOrMutate(
    () => empleadosStore.update(id, data),
    empleadosApiUnavailable,
  );
};

export const deleteEmpleado = async (id: number): Promise<void> => {
  return resolveMockOrMutate(
    () => {
      empleadosStore.remove(id);
    },
    empleadosApiUnavailable,
  );
};
