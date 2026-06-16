import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/tables";
import { TableRowActions } from "@/shared/components/layout/TableRowActions";
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
      accessorKey: "fechaInicio",
      header: "Inicio",
      cell: ({ getValue }) =>
        new Date(getValue<string>()).toLocaleString("es-CR"),
    },
    {
      accessorKey: "fechaFin",
      header: "Fin",
      cell: ({ getValue }) =>
        new Date(getValue<string>()).toLocaleString("es-CR"),
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
      emptyMessage="Aun no hay bloqueos. La integracion con el backend se realizara en la siguiente etapa."
    />
  );
};
