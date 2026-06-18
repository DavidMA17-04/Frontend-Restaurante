import axiosInstance from "@/config/axios";
import { turnosStore } from "@/mocks/stores/turnosStore";
import { API_ENDPOINTS } from "@/shared/constants/apiConstants";
import {
  resolveMockOrFetch,
  resolveMockOrFetchById,
  resolveMockOrMutate,
} from "@/shared/utils/resolveMockOrFetch";
import type {
  Turno,
  TurnoCreateInput,
  TurnoUpdateInput,
} from "../types/turnoType";

/** Servicio de acceso a datos del modulo Turnos. */
export const getTurnos = async (): Promise<Turno[]> => {
  return resolveMockOrFetch(turnosStore.getAll(), async () => {
    const response = await axiosInstance.get<Turno[]>(API_ENDPOINTS.turnos);
    return response.data;
  });
};

export const getTurnoById = async (id: number): Promise<Turno> => {
  return resolveMockOrFetchById(
    () => turnosStore.getById(id),
    async () => {
      const response = await axiosInstance.get<Turno>(
        `${API_ENDPOINTS.turnos}/${id}`,
      );
      return response.data;
    },
  );
};

export const createTurno = async (input: TurnoCreateInput): Promise<Turno> => {
  return resolveMockOrMutate(
    () => turnosStore.create(input),
    async () => {
      const response = await axiosInstance.post<Turno>(
        API_ENDPOINTS.turnos,
        input,
      );
      return response.data;
    },
  );
};

export const updateTurno = async ({
  id,
  data,
}: {
  id: number;
  data: TurnoUpdateInput;
}): Promise<Turno> => {
  return resolveMockOrMutate(
    () => turnosStore.update(id, data),
    async () => {
      const current = await getTurnoById(id);
      const payload: TurnoCreateInput = {
        nombre: data.nombre ?? current.nombre,
        horaInicio: data.horaInicio ?? current.horaInicio,
        horaFin: data.horaFin ?? current.horaFin,
        activo: data.activo ?? current.activo,
      };
      const response = await axiosInstance.put<Turno>(
        `${API_ENDPOINTS.turnos}/${id}`,
        payload,
      );
      return response.data;
    },
  );
};

export const deleteTurno = async (id: number): Promise<void> => {
  return resolveMockOrMutate(
    () => {
      turnosStore.remove(id);
    },
    async () => {
      await axiosInstance.delete(`${API_ENDPOINTS.turnos}/${id}`);
    },
  );
};
