import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/tables";
import { formatDate } from "@/shared/utils/formatDate";
import type { BloqueoMesa } from "../types/bloqueoMesaType";

interface BloqueoMesaTablePlaceholderProps {
  data: BloqueoMesa[];
}

const columns: ColumnDef<BloqueoMesa>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "mesaId", header: "Mesa" },
  {
    accessorKey: "fechaInicio",
    header: "Inicio",
    cell: (info) => formatDate(info.getValue<string>()),
  },
  {
    accessorKey: "fechaFin",
    header: "Fin",
    cell: (info) => formatDate(info.getValue<string>()),
  },
  { accessorKey: "motivo", header: "Motivo" },
];

/** Componente de negocio del modulo Bloqueos de Mesa. */
export const BloqueoMesaTablePlaceholder = ({
  data,
}: BloqueoMesaTablePlaceholderProps) => {
  return (
    <DataTable
      data={data}
      columns={columns}
      emptyMessage="Aun no hay bloqueos. La integracion con el backend se realizara en la siguiente etapa."
    />
  );
};
