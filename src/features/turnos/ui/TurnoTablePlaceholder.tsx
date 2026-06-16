import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/tables";
import type { Turno } from "../types/turnoType";

interface TurnoTablePlaceholderProps {
  data: Turno[];
}

const columns: ColumnDef<Turno>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "nombre", header: "Nombre" },
  { accessorKey: "horaInicio", header: "Hora inicio" },
  { accessorKey: "horaFin", header: "Hora fin" },
];

/** Componente de negocio del modulo Turnos. */
export const TurnoTablePlaceholder = ({ data }: TurnoTablePlaceholderProps) => {
  return (
    <DataTable
      data={data}
      columns={columns}
      emptyMessage="Aun no hay turnos. La integracion con el backend se realizara en la siguiente etapa."
    />
  );
};
