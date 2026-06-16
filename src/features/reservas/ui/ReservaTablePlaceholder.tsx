import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/tables";
import { formatDate } from "@/shared/utils/formatDate";
import type { Reserva } from "../types/reservaType";

interface ReservaTablePlaceholderProps {
  data: Reserva[];
}

const columns: ColumnDef<Reserva>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "clienteId", header: "Cliente" },
  { accessorKey: "mesaId", header: "Mesa" },
  {
    accessorKey: "fecha",
    header: "Fecha",
    cell: (info) => formatDate(info.getValue<string>()),
  },
  { accessorKey: "estado", header: "Estado" },
];

/** Componente de negocio del modulo Reservas. */
export const ReservaTablePlaceholder = ({
  data,
}: ReservaTablePlaceholderProps) => {
  return (
    <DataTable
      data={data}
      columns={columns}
      emptyMessage="Aun no hay reservas. La integracion con el backend se realizara en la siguiente etapa."
    />
  );
};
