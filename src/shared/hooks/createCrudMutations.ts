import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Identifiable } from "@/shared/types/crudTypes";

interface CrudMutationsConfig<TCreate, TUpdate, TEntity extends Identifiable> {
  queryKey: string;
  createFn: (input: TCreate) => Promise<TEntity>;
  updateFn: (params: { id: number; data: TUpdate }) => Promise<TEntity>;
  deleteFn: (id: number) => Promise<void>;
}

/**
 * Fabrica hooks de mutacion CRUD con invalidacion de cache automatica.
 */
export const createCrudMutations = <
  TCreate,
  TUpdate,
  TEntity extends Identifiable,
>(
  config: CrudMutationsConfig<TCreate, TUpdate, TEntity>,
) => {
  const { queryKey, createFn, updateFn, deleteFn } = config;

  const invalidate = (queryClient: ReturnType<typeof useQueryClient>) => {
    void queryClient.invalidateQueries({ queryKey: [queryKey] });
  };

  const useCreate = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: createFn,
      onSuccess: () => invalidate(queryClient),
    });
  };

  const useUpdate = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: updateFn,
      onSuccess: () => invalidate(queryClient),
    });
  };

  const useDelete = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: deleteFn,
      onSuccess: () => invalidate(queryClient),
    });
  };

  return { useCreate, useUpdate, useDelete };
};
