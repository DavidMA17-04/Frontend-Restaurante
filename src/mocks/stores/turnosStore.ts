import { TURNOS_MOCK } from "@/mocks/turnos.mock";
import { createMockStore } from "@/mocks/mockStore";
import type { Turno } from "@/features/turnos/types/turnoType";

export const turnosStore = createMockStore<Turno>(TURNOS_MOCK);
