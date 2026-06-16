import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/shared/components/ui/Badge";
import { DataTable } from "@/shared/components/tables";
import { TableRowActions } from "@/shared/components/layout/TableRowActions";
import { getEstadoBadgeVariant } from "@/shared/utils/statusBadge";
import type { Mesa } from "../types/mesaType";

interface MesaTablePlaceholderProps {
  data: Mesa[];
  onEdit: (item: Mesa) => void;
  onDelete: (item: Mesa) => void;
}

export const MesaTablePlaceholder = ({
  data,
  onEdit,
  onDelete,
}: MesaTablePlaceholderProps) => {
  const columns: ColumnDef<Mesa>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "numero", header: "Numero" },
    { accessorKey: "capacidad", header: "Capacidad" },
    { accessorKey: "zonaId", header: "Zona" },
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
      emptyMessage="Aun no hay mesas. La integracion con el backend se realizara en la siguiente etapa."
    />
  );
};
