import axiosInstance from "@/config/axios";
import { empleadosStore } from "@/mocks/stores/empleadosStore";
import { API_ENDPOINTS } from "@/shared/constants/apiConstants";
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

/** Servicio de acceso a datos del modulo Empleados. */
export const getEmpleados = async (): Promise<Empleado[]> => {
  return resolveMockOrFetch(empleadosStore.getAll(), async () => {
    const response = await axiosInstance.get<Empleado[]>(
      API_ENDPOINTS.empleados,
    );
    return response.data;
  });
};

export const getEmpleadoById = async (id: number): Promise<Empleado> => {
  return resolveMockOrFetchById(
    () => empleadosStore.getById(id),
    async () => {
      const response = await axiosInstance.get<Empleado>(
        `${API_ENDPOINTS.empleados}/${id}`,
      );
      return response.data;
    },
  );
};

export const createEmpleado = async (
  input: EmpleadoCreateInput,
): Promise<Empleado> => {
  return resolveMockOrMutate(
    () => empleadosStore.create(input),
    async () => {
      const response = await axiosInstance.post<Empleado>(
        API_ENDPOINTS.empleados,
        input,
      );
      return response.data;
    },
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
    async () => {
      const response = await axiosInstance.put<Empleado>(
        `${API_ENDPOINTS.empleados}/${id}`,
        data,
      );
      return response.data;
    },
  );
};

export const deleteEmpleado = async (id: number): Promise<void> => {
  return resolveMockOrMutate(
    () => {
      empleadosStore.remove(id);
    },
    async () => {
      await axiosInstance.delete(`${API_ENDPOINTS.empleados}/${id}`);
    },
  );
};
