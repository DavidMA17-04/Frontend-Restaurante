import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/tables";
import { TableRowActions } from "@/shared/components/layout/TableRowActions";
import { formatDateTimeParts } from "@/shared/utils/dateTime";
import type { BloqueoMesa } from "../types/bloqueoMesaType";

interface BloqueoMesaTablePlaceholderProps {
  data: BloqueoMesa[];
  onEdit: (item: BloqueoMesa) => void;
  onDelete: (item: BloqueoMesa) => void;
}

export const BloqueoMesaTablePlaceholder = ({
  data,
  onEdit,
  onDelete,
}: BloqueoMesaTablePlaceholderProps) => {
  const columns: ColumnDef<BloqueoMesa>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "mesaId", header: "Mesa" },
    {
      id: "fechaHorario",
      header: "Fecha y horario",
      cell: ({ row }) =>
        formatDateTimeParts(row.original.fecha, row.original.horaInicio) +
        ` - ${row.original.horaFin.slice(0, 5)}`,
    },
    { accessorKey: "motivo", header: "Motivo" },
    {
      id: "acciones",
      header: "Acciones",
      cell: ({ row }) => (
        <TableRowActions
          onEdit={() => onEdit(row.original)}
          onDelete={() => onDelete(row.original)}
        />
      ),
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      emptyMessage="Aun no hay bloqueos registrados."
    />
  );
};
