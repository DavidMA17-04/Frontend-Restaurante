import type { ListaEspera } from "@/features/lista-espera/types/listaEsperaType";

export const LISTA_ESPERA_MOCK: ListaEspera[] = [
  {
    id: 1,
    clienteId: 1,
    fecha: "2026-06-15",
    horaInicio: "19:30:00",
    horaFin: "21:30:00",
    cantidad: 4,
  },
  {
    id: 2,
    clienteId: 3,
    fecha: "2026-06-15",
    horaInicio: "20:00:00",
    horaFin: "22:00:00",
    cantidad: 2,
  },
];
