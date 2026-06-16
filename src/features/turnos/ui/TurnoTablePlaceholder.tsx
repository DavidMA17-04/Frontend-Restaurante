import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/tables";
import { TableRowActions } from "@/shared/components/layout/TableRowActions";
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
    { accessorKey: "horaInicio", header: "Hora inicio" },
    { accessorKey: "horaFin", header: "Hora fin" },
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
      emptyMessage="Aun no hay turnos. La integracion con el backend se realizara en la siguiente etapa."
    />
  );
};
