import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCrudMutations } from "@/shared/hooks/createCrudMutations";
import { QUERY_KEYS } from "@/shared/constants/queryKeyConstants";
import { createMesa, deleteMesa, updateMesa } from "../services/mesaService";
import type {
  Mesa,
  MesaCreateInput,
  MesaUpdateInput,
} from "../types/mesaType";

const mutations = createCrudMutations<
  MesaCreateInput,
  MesaUpdateInput,
  Mesa
>({
  queryKey: QUERY_KEYS.mesas,
  createFn: createMesa,
  updateFn: updateMesa,
  deleteFn: deleteMesa,
});

export const useCreateMesa = mutations.useCreate;
export const useUpdateMesa = mutations.useUpdate;

export const useDeleteMesa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMesa,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.mesas] });
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.reservas] });
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.bloqueosMesa] });
    },
  });
};
