import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/tables";
import { formatDate } from "@/shared/utils/formatDate";
import type { ListaEspera } from "../types/listaEsperaType";

interface ListaEsperaTablePlaceholderProps {
  data: ListaEspera[];
}

const columns: ColumnDef<ListaEspera>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "clienteId", header: "Cliente" },
  {
    accessorKey: "fechaRegistro",
    header: "Fecha registro",
    cell: (info) => formatDate(info.getValue<string>()),
  },
  { accessorKey: "estado", header: "Estado" },
];

/** Componente de negocio del modulo Lista de Espera. */
export const ListaEsperaTablePlaceholder = ({
  data,
}: ListaEsperaTablePlaceholderProps) => {
  return (
    <DataTable
      data={data}
      columns={columns}
      emptyMessage="Aun no hay registros en la lista de espera. La integracion con el backend se realizara en la siguiente etapa."
    />
  );
};
