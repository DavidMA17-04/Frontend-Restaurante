import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/tables";
import { TableRowActions } from "@/shared/components/layout/TableRowActions";
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
      emptyMessage="Aun no hay mesas registradas."
    />
  );
};
