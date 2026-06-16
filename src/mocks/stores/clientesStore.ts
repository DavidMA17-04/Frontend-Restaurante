import { CLIENTES_MOCK } from "@/mocks/clientes.mock";
import { createMockStore } from "@/mocks/mockStore";
import type { Cliente } from "@/features/clientes/types/clienteType";

export const clientesStore = createMockStore<Cliente>(CLIENTES_MOCK);
