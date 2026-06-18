import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/tables";
import { TableRowActions } from "@/shared/components/layout/TableRowActions";
import type { Cliente } from "../types/clienteType";

interface ClienteTablePlaceholderProps {
  data: Cliente[];
  onEdit: (item: Cliente) => void;
  onDelete: (item: Cliente) => void;
}

export const ClienteTablePlaceholder = ({
  data,
  onEdit,
  onDelete,
}: ClienteTablePlaceholderProps) => {
  const columns: ColumnDef<Cliente>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "nombre", header: "Nombre" },
    { accessorKey: "apellido", header: "Apellido" },
    { accessorKey: "telefono", header: "Telefono" },
    { accessorKey: "cedula", header: "Cedula" },
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
      emptyMessage="Aun no hay clientes registrados."
    />
  );
};
