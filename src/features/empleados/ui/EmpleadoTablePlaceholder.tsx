import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/shared/components/ui/Badge";
import { DataTable } from "@/shared/components/tables";
import { TableRowActions } from "@/shared/components/layout/TableRowActions";
import { getActivoBadgeVariant } from "@/shared/utils/statusBadge";
import type { Empleado } from "../types/empleadoType";

interface EmpleadoTablePlaceholderProps {
  data: Empleado[];
  onEdit: (item: Empleado) => void;
  onDelete: (item: Empleado) => void;
}

export const EmpleadoTablePlaceholder = ({
  data,
  onEdit,
  onDelete,
}: EmpleadoTablePlaceholderProps) => {
  const columns: ColumnDef<Empleado>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "nombre", header: "Nombre" },
    { accessorKey: "rol", header: "Rol" },
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
      emptyMessage="Aun no hay empleados. La integracion con el backend se realizara en la siguiente etapa."
    />
  );
};
