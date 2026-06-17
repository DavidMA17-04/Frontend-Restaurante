import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/constants/queryKeyConstants";
import {
  createBloqueoMesa,
  deleteBloqueoMesa,
  updateBloqueoMesa,
} from "../services/bloqueoMesaService";
import type {
  BloqueoMesa,
  BloqueoMesaCreateInput,
  BloqueoMesaUpdateInput,
} from "../types/bloqueoMesaType";

const invalidate = (queryClient: ReturnType<typeof useQueryClient>) => {
  void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.bloqueosMesa] });
};

export const useCreateBloqueoMesa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBloqueoMesa,
    onSuccess: () => invalidate(queryClient),
  });
};

export const useUpdateBloqueoMesa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: number; data: BloqueoMesaUpdateInput }) =>
      updateBloqueoMesa(params),
    onSuccess: () => invalidate(queryClient),
  });
};

export const useDeleteBloqueoMesa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBloqueoMesa,
    onSuccess: () => invalidate(queryClient),
  });
};

export type { BloqueoMesa, BloqueoMesaCreateInput };
