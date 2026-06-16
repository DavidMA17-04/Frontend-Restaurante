import { createCrudMutations } from "@/shared/hooks/createCrudMutations";
import { QUERY_KEYS } from "@/shared/constants/queryKeyConstants";
import {
  createEmpleado,
  deleteEmpleado,
  updateEmpleado,
} from "../services/empleadoService";
import type {
  Empleado,
  EmpleadoCreateInput,
  EmpleadoUpdateInput,
} from "../types/empleadoType";

const mutations = createCrudMutations<
  EmpleadoCreateInput,
  EmpleadoUpdateInput,
  Empleado
>({
  queryKey: QUERY_KEYS.empleados,
  createFn: createEmpleado,
  updateFn: updateEmpleado,
  deleteFn: deleteEmpleado,
});

export const useCreateEmpleado = mutations.useCreate;
export const useUpdateEmpleado = mutations.useUpdate;
export const useDeleteEmpleado = mutations.useDelete;
