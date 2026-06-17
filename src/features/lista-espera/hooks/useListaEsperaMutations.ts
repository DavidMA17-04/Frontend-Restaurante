import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/constants/queryKeyConstants";
import {
  createListaEspera,
  promoverListaEspera,
  updateListaEspera,
} from "../services/listaEsperaService";
import type {
  ListaEsperaCreateInput,
  ListaEsperaUpdateInput,
} from "../types/listaEsperaType";

const invalidate = (queryClient: ReturnType<typeof useQueryClient>) => {
  void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.listaEspera] });
  void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.reservas] });
};

export const useCreateListaEspera = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createListaEspera,
    onSuccess: () => invalidate(queryClient),
  });
};

export const useUpdateListaEspera = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: number; data: ListaEsperaUpdateInput }) =>
      updateListaEspera(params),
    onSuccess: () => invalidate(queryClient),
  });
};

export const usePromoverListaEspera = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { listaEsperaId: number; mesaId: number }) =>
      promoverListaEspera(params.listaEsperaId, params.mesaId),
    onSuccess: () => invalidate(queryClient),
  });
};

export type { ListaEsperaCreateInput };
