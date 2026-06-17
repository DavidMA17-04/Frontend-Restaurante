import { createCrudMutations } from "@/shared/hooks/createCrudMutations";
import { QUERY_KEYS } from "@/shared/constants/queryKeyConstants";
import {
  createTurno,
  deleteTurno,
  updateTurno,
} from "../services/turnoService";
import type {
  Turno,
  TurnoCreateInput,
  TurnoUpdateInput,
} from "../types/turnoType";

const mutations = createCrudMutations<
  TurnoCreateInput,
  TurnoUpdateInput,
  Turno
>({
  queryKey: QUERY_KEYS.turnos,
  createFn: createTurno,
  updateFn: updateTurno,
  deleteFn: deleteTurno,
});

export const useCreateTurno = mutations.useCreate;
export const useUpdateTurno = mutations.useUpdate;
export const useDeleteTurno = mutations.useDelete;
