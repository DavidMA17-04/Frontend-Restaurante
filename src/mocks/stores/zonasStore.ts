import { ZONAS_MOCK } from "@/mocks/zonas.mock";
import { createMockStore } from "@/mocks/mockStore";
import type { Zona } from "@/features/zonas/types/zonaType";

export const zonasStore = createMockStore<Zona>(ZONAS_MOCK);
