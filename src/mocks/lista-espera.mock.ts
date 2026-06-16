import type { ListaEspera } from "@/features/lista-espera/types/listaEsperaType";

export const LISTA_ESPERA_MOCK: ListaEspera[] = [
  {
    id: 1,
    clienteId: 1,
    fechaRegistro: "2026-06-15T19:30:00",
    estado: "En espera",
  },
  {
    id: 2,
    clienteId: 3,
    fechaRegistro: "2026-06-15T20:00:00",
    estado: "Atendido",
  },
  {
    id: 3,
    clienteId: 2,
    fechaRegistro: "2026-06-15T20:15:00",
    estado: "En espera",
  },
  {
    id: 4,
    clienteId: 4,
    fechaRegistro: "2026-06-15T20:45:00",
    estado: "Cancelado",
  },
];
