import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/shared/components/ui/Badge";
import { DataTable } from "@/shared/components/tables";
import { TableRowActions } from "@/shared/components/layout/TableRowActions";
import { getActivoBadgeVariant } from "@/shared/utils/statusBadge";
import type { Zona } from "../types/zonaType";

interface ZonaTablePlaceholderProps {
  data: Zona[];
  onEdit: (item: Zona) => void;
  onDelete: (item: Zona) => void;
}

export const ZonaTablePlaceholder = ({
  data,
  onEdit,
  onDelete,
}: ZonaTablePlaceholderProps) => {
  const columns: ColumnDef<Zona>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "nombre", header: "Nombre" },
    {
      accessorKey: "disponibilidad",
      header: "Disponibilidad",
      cell: ({ getValue }) => {
        const disponible = getValue<boolean>();
        return (
          <Badge variant={getActivoBadgeVariant(disponible)}>
            {disponible ? "Disponible" : "No disponible"}
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
      emptyMessage="Aun no hay zonas registradas."
    />
  );
};
