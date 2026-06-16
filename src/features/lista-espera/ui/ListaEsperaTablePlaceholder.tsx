import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/shared/components/ui/Badge";
import { DataTable } from "@/shared/components/tables";
import { TableRowActions } from "@/shared/components/layout/TableRowActions";
import { getEstadoBadgeVariant } from "@/shared/utils/statusBadge";
import type { ListaEspera } from "../types/listaEsperaType";

interface ListaEsperaTablePlaceholderProps {
  data: ListaEspera[];
  onEdit: (item: ListaEspera) => void;
  onDelete: (item: ListaEspera) => void;
}

export const ListaEsperaTablePlaceholder = ({
  data,
  onEdit,
  onDelete,
}: ListaEsperaTablePlaceholderProps) => {
  const columns: ColumnDef<ListaEspera>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "clienteId", header: "Cliente" },
    {
      accessorKey: "fechaRegistro",
      header: "Fecha registro",
      cell: ({ getValue }) =>
        new Date(getValue<string>()).toLocaleString("es-CR"),
    },
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
      emptyMessage="Aun no hay entradas en lista de espera. La integracion con el backend se realizara en la siguiente etapa."
    />
  );
};
