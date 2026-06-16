import { createCrudMutations } from "@/shared/hooks/createCrudMutations";
import { QUERY_KEYS } from "@/shared/constants/queryKeyConstants";
import {
  createCliente,
  deleteCliente,
  updateCliente,
} from "../services/clienteService";
import type {
  Cliente,
  ClienteCreateInput,
  ClienteUpdateInput,
} from "../types/clienteType";

const mutations = createCrudMutations<
  ClienteCreateInput,
  ClienteUpdateInput,
  Cliente
>({
  queryKey: QUERY_KEYS.clientes,
  createFn: createCliente,
  updateFn: updateCliente,
  deleteFn: deleteCliente,
});

export const useCreateCliente = mutations.useCreate;
export const useUpdateCliente = mutations.useUpdate;
export const useDeleteCliente = mutations.useDelete;
