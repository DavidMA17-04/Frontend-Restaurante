import { LISTA_ESPERA_MOCK } from "@/mocks/lista-espera.mock";
import { createMockStore } from "@/mocks/mockStore";
import type { ListaEspera } from "@/features/lista-espera/types/listaEsperaType";

export const listaEsperaStore = createMockStore<ListaEspera>(LISTA_ESPERA_MOCK);
