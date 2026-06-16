import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/tables";
import type { Zona } from "../types/zonaType";

interface ZonaTablePlaceholderProps {
  data: Zona[];
}

const columns: ColumnDef<Zona>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "nombre", header: "Nombre" },
  { accessorKey: "descripcion", header: "Descripcion" },
];

/** Componente de negocio del modulo Zonas. */
export const ZonaTablePlaceholder = ({ data }: ZonaTablePlaceholderProps) => {
  return (
    <DataTable
      data={data}
      columns={columns}
      emptyMessage="Aun no hay zonas. La integracion con el backend se realizara en la siguiente etapa."
    />
  );
};
