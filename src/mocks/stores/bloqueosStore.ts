import { BLOQUEOS_MESA_MOCK } from "@/mocks/bloqueos-mesa.mock";
import { createMockStore } from "@/mocks/mockStore";
import type { BloqueoMesa } from "@/features/bloqueos-mesa/types/bloqueoMesaType";

export const bloqueosStore = createMockStore<BloqueoMesa>(BLOQUEOS_MESA_MOCK);
