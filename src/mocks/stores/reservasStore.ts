import { RESERVAS_MOCK } from "@/mocks/reservas.mock";
import { createMockStore } from "@/mocks/mockStore";
import type { Reserva } from "@/features/reservas/types/reservaType";

export const reservasStore = createMockStore<Reserva>(RESERVAS_MOCK);
