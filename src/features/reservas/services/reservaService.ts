import axiosInstance from "@/config/axios";
import { reservasStore } from "@/mocks/stores/reservasStore";
import { API_ENDPOINTS } from "@/shared/constants/apiConstants";
import {
  resolveMockOrFetch,
  resolveMockOrFetchById,
  resolveMockOrMutate,
} from "@/shared/utils/resolveMockOrFetch";
import type {
  Reserva,
  ReservaCreateInput,
  ReservaUpdateInput,
} from "../types/reservaType";

/** Servicio de acceso a datos del modulo Reservas. */
export const getReservas = async (): Promise<Reserva[]> => {
  return resolveMockOrFetch(reservasStore.getAll(), async () => {
    const response = await axiosInstance.get<Reserva[]>(API_ENDPOINTS.reservas);
    return response.data;
  });
};

export const getReservaById = async (id: number): Promise<Reserva> => {
  return resolveMockOrFetchById(
    () => reservasStore.getById(id),
    async () => {
      const response = await axiosInstance.get<Reserva>(
        `${API_ENDPOINTS.reservas}/${id}`,
      );
      return response.data;
    },
  );
};

export const createReserva = async (
  input: ReservaCreateInput,
): Promise<Reserva> => {
  return resolveMockOrMutate(
    () => reservasStore.create(input),
    async () => {
      const response = await axiosInstance.post<Reserva>(
        API_ENDPOINTS.reservas,
        input,
      );
      return response.data;
    },
  );
};

export const updateReserva = async ({
  id,
  data,
}: {
  id: number;
  data: ReservaUpdateInput;
}): Promise<Reserva> => {
  return resolveMockOrMutate(
    () => reservasStore.update(id, data),
    async () => {
      const response = await axiosInstance.put<Reserva>(
        `${API_ENDPOINTS.reservas}/${id}`,
        data,
      );
      return response.data;
    },
  );
};

export const deleteReserva = async (id: number): Promise<void> => {
  return resolveMockOrMutate(
    () => {
      reservasStore.remove(id);
    },
    async () => {
      await axiosInstance.delete(`${API_ENDPOINTS.reservas}/${id}`);
    },
  );
};
