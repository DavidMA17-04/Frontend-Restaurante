import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/shared/components/ui/Badge";
import { DataTable } from "@/shared/components/tables";
import { TableRowActions } from "@/shared/components/layout/TableRowActions";
import { getActivoBadgeVariant } from "@/shared/utils/statusBadge";
import type { Turno } from "../types/turnoType";

interface TurnoTablePlaceholderProps {
  data: Turno[];
  onEdit: (item: Turno) => void;
  onDelete: (item: Turno) => void;
}

export const TurnoTablePlaceholder = ({
  data,
  onEdit,
  onDelete,
}: TurnoTablePlaceholderProps) => {
  const columns: ColumnDef<Turno>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "nombre", header: "Nombre" },
    {
      accessorKey: "horaInicio",
      header: "Hora inicio",
      cell: ({ getValue }) => String(getValue<string>()).slice(0, 5),
    },
    {
      accessorKey: "horaFin",
      header: "Hora fin",
      cell: ({ getValue }) => String(getValue<string>()).slice(0, 5),
    },
    {
      accessorKey: "activo",
      header: "Activo",
      cell: ({ getValue }) => {
        const activo = getValue<boolean>();
        return (
          <Badge variant={getActivoBadgeVariant(activo)}>
            {activo ? "Si" : "No"}
          </Badge>
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
      emptyMessage="Aun no hay turnos registrados."
    />
  );
};
