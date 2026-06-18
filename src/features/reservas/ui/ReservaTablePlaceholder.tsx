import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/shared/components/ui/Badge";
import { DataTable } from "@/shared/components/tables";
import { TableRowActions } from "@/shared/components/layout/TableRowActions";
import { formatDateTimeParts } from "@/shared/utils/dateTime";
import { getEstadoBadgeVariant } from "@/shared/utils/statusBadge";
import type { Reserva } from "../types/reservaType";

interface ReservaTablePlaceholderProps {
  data: Reserva[];
  onEdit: (item: Reserva) => void;
  onDelete: (item: Reserva) => void;
}

export const ReservaTablePlaceholder = ({
  data,
  onEdit,
  onDelete,
}: ReservaTablePlaceholderProps) => {
  const columns: ColumnDef<Reserva>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "clienteId", header: "Cliente" },
    { accessorKey: "mesaId", header: "Mesa" },
    {
      id: "fechaHorario",
      header: "Fecha y horario",
      cell: ({ row }) =>
        formatDateTimeParts(row.original.fecha, row.original.horaInicio) +
        ` - ${row.original.horaFin.slice(0, 5)}`,
    },
    { accessorKey: "capacidad", header: "Capacidad" },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ getValue }) => {
        const estado = getValue<string>();
        return (
          <Badge variant={getEstadoBadgeVariant(estado)}>{estado}</Badge>
        );
      },
    },
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
      emptyMessage="Aun no hay reservas registradas."
    />
  );
};
