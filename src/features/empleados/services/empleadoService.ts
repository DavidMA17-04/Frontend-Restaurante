import axiosInstance from "@/config/axios";
import { API_ENDPOINTS } from "@/shared/constants/apiConstants";
import type { Empleado } from "../types/empleadoType";

/** Servicio de acceso a datos del modulo Empleados. */
export const getEmpleados = async (): Promise<Empleado[]> => {
  const response = await axiosInstance.get<Empleado[]>(API_ENDPOINTS.empleados);
  return response.data;
};

export const getEmpleadoById = async (id: number): Promise<Empleado> => {
  const response = await axiosInstance.get<Empleado>(
    `${API_ENDPOINTS.empleados}/${id}`,
  );
  return response.data;
};
