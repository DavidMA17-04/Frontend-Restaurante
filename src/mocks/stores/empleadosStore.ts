import { EMPLEADOS_MOCK } from "@/mocks/empleados.mock";
import { createMockStore } from "@/mocks/mockStore";
import type { Empleado } from "@/features/empleados/types/empleadoType";

export const empleadosStore = createMockStore<Empleado>(EMPLEADOS_MOCK);
