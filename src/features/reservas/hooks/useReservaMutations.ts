import { createCrudMutations } from "@/shared/hooks/createCrudMutations";
import { QUERY_KEYS } from "@/shared/constants/queryKeyConstants";
import {
  createReserva,
  deleteReserva,
  updateReserva,
} from "../services/reservaService";
import type {
  Reserva,
  ReservaCreateInput,
  ReservaUpdateInput,
} from "../types/reservaType";

const mutations = createCrudMutations<
  ReservaCreateInput,
  ReservaUpdateInput,
  Reserva
>({
  queryKey: QUERY_KEYS.reservas,
  createFn: createReserva,
  updateFn: updateReserva,
  deleteFn: deleteReserva,
});

export const useCreateReserva = mutations.useCreate;
export const useUpdateReserva = mutations.useUpdate;
export const useDeleteReserva = mutations.useDelete;
