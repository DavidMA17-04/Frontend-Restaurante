import { createCrudMutations } from "@/shared/hooks/createCrudMutations";
import { QUERY_KEYS } from "@/shared/constants/queryKeyConstants";
import { createZona, deleteZona, updateZona } from "../services/zonaService";
import type { Zona, ZonaCreateInput, ZonaUpdateInput } from "../types/zonaType";

const mutations = createCrudMutations<
  ZonaCreateInput,
  ZonaUpdateInput,
  Zona
>({
  queryKey: QUERY_KEYS.zonas,
  createFn: createZona,
  updateFn: updateZona,
  deleteFn: deleteZona,
});

export const useCreateZona = mutations.useCreate;
export const useUpdateZona = mutations.useUpdate;
export const useDeleteZona = mutations.useDelete;
