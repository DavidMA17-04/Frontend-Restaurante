import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/tables";
import { TableRowActions } from "@/shared/components/layout/TableRowActions";
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
    { accessorKey: "descripcion", header: "Descripcion" },
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
      emptyMessage="Aun no hay zonas. La integracion con el backend se realizara en la siguiente etapa."
    />
  );
};
