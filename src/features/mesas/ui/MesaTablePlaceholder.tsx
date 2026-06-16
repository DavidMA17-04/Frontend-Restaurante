import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/tables";
import type { Mesa } from "../types/mesaType";

interface MesaTablePlaceholderProps {
  data: Mesa[];
}

const columns: ColumnDef<Mesa>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "numero", header: "Numero" },
  { accessorKey: "capacidad", header: "Capacidad" },
  { accessorKey: "zonaId", header: "Zona" },
  { accessorKey: "estado", header: "Estado" },
];

/** Componente de negocio del modulo Mesas. */
export const MesaTablePlaceholder = ({ data }: MesaTablePlaceholderProps) => {
  return (
    <DataTable
      data={data}
      columns={columns}
      emptyMessage="Aun no hay mesas. La integracion con el backend se realizara en la siguiente etapa."
    />
  );
};
