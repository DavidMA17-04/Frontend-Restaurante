import { MESAS_MOCK } from "@/mocks/mesas.mock";
import { createMockStore } from "@/mocks/mockStore";
import type { Mesa } from "@/features/mesas/types/mesaType";

export const mesasStore = createMockStore<Mesa>(MESAS_MOCK);
