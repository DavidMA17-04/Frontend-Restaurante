import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/tables";
import { Button } from "@/shared/components/ui/Button";
import { formatDateTimeParts } from "@/shared/utils/dateTime";
import type { ListaEspera } from "../types/listaEsperaType";

interface ListaEsperaTablePlaceholderProps {
  data: ListaEspera[];
  onEdit: (item: ListaEspera) => void;
  onPromover: (item: ListaEspera) => void;
}

export const ListaEsperaTablePlaceholder = ({
  data,
  onEdit,
  onPromover,
}: ListaEsperaTablePlaceholderProps) => {
  const columns: ColumnDef<ListaEspera>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "clienteId", header: "Cliente" },
    {
      id: "fechaHorario",
      header: "Fecha y horario",
      cell: ({ row }) =>
        formatDateTimeParts(row.original.fecha, row.original.horaInicio) +
        ` - ${row.original.horaFin.slice(0, 5)}`,
    },
    { accessorKey: "cantidad", header: "Personas" },
    {
      id: "acciones",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEdit(row.original)}
          >
            Editar
          </Button>
          <Button
            type="button"
            variant="success"
            size="sm"
            onClick={() => onPromover(row.original)}
          >
            Promover
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      emptyMessage="Aun no hay entradas en lista de espera."
    />
  );
};
