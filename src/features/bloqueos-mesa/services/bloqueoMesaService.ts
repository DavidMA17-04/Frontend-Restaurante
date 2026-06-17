import axiosInstance from "@/config/axios";
import { bloqueosStore } from "@/mocks/stores/bloqueosStore";
import { API_ENDPOINTS } from "@/shared/constants/apiConstants";
import {
  resolveMockOrFetch,
  resolveMockOrFetchById,
  resolveMockOrMutate,
} from "@/shared/utils/resolveMockOrFetch";
import type {
  BloqueoMesa,
  BloqueoMesaCreateInput,
  BloqueoMesaUpdateInput,
} from "../types/bloqueoMesaType";

/** Servicio de acceso a datos del modulo Bloqueos de Mesa. */
export const getBloqueosMesa = async (): Promise<BloqueoMesa[]> => {
  return resolveMockOrFetch(bloqueosStore.getAll(), async () => {
    const response = await axiosInstance.get<BloqueoMesa[]>(
      API_ENDPOINTS.bloqueos,
    );
    return response.data;
  });
};

export const getBloqueoMesaById = async (id: number): Promise<BloqueoMesa> => {
  return resolveMockOrFetchById(
    () => bloqueosStore.getById(id),
    async () => {
      const response = await axiosInstance.get<BloqueoMesa>(
        `${API_ENDPOINTS.bloqueos}/${id}`,
      );
      return response.data;
    },
  );
};

export const createBloqueoMesa = async (
  input: BloqueoMesaCreateInput,
): Promise<BloqueoMesa> => {
  return resolveMockOrMutate(
    () => bloqueosStore.create(input),
    async () => {
      await axiosInstance.post(`${API_ENDPOINTS.bloqueos}/bloquear`, input);
      const bloqueos = await getBloqueosMesa();
      const created = bloqueos.find(
        (item) =>
          item.mesaId === input.mesaId &&
          item.fecha === input.fecha &&
          item.motivo === input.motivo,
      );

      if (!created) {
        throw new Error("No fue posible confirmar el bloqueo creado.");
      }

      return created;
    },
  );
};

export const updateBloqueoMesa = async ({
  id,
  data,
}: {
  id: number;
  data: BloqueoMesaUpdateInput;
}): Promise<BloqueoMesa> => {
  return resolveMockOrMutate(
    () => bloqueosStore.update(id, data),
    async () => {
      const current = await getBloqueoMesaById(id);
      const payload: BloqueoMesaCreateInput = {
        mesaId: data.mesaId ?? current.mesaId,
        fecha: data.fecha ?? current.fecha,
        horaInicio: data.horaInicio ?? current.horaInicio,
        horaFin: data.horaFin ?? current.horaFin,
        motivo: data.motivo ?? current.motivo,
      };
      const response = await axiosInstance.put<BloqueoMesa>(
        `${API_ENDPOINTS.bloqueos}/${id}`,
        payload,
      );
      return response.data;
    },
  );
};

/** En el backend real se desbloquea por mesaId, no por id del bloqueo. */
export const deleteBloqueoMesa = async (mesaId: number): Promise<void> => {
  return resolveMockOrMutate(
    () => {
      const bloqueos = bloqueosStore.getAll().filter((item) => item.mesaId === mesaId);
      bloqueos.forEach((item) => bloqueosStore.remove(item.id));
    },
    async () => {
      await axiosInstance.delete(`${API_ENDPOINTS.bloqueos}/mesa/${mesaId}`);
    },
  );
};
