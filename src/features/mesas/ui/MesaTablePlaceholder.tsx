import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useGetZonas } from "@/features/zonas";
import { DataTable } from "@/shared/components/tables";
import { TableRowActions } from "@/shared/components/layout/TableRowActions";
import type { Mesa } from "../types/mesaType";

interface MesaTablePlaceholderProps {
  data: Mesa[];
  onEdit: (item: Mesa) => void;
  onDelete: (item: Mesa) => void;
}

export const MesaTablePlaceholder = ({
  data,
  onEdit,
  onDelete,
}: MesaTablePlaceholderProps) => {
  const { data: zonas } = useGetZonas();

  const zonasById = useMemo(
    () => new Map((zonas ?? []).map((zona) => [zona.id, zona.nombre])),
    [zonas],
  );

  const columns: ColumnDef<Mesa>[] = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "numero", header: "Numero" },
      { accessorKey: "capacidad", header: "Capacidad" },
      {
        id: "zona",
        header: "Zona",
        cell: ({ row }) =>
          zonasById.get(row.original.zonaId) ?? `Zona ${row.original.zonaId}`,
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
    ],
    [onDelete, onEdit, zonasById],
  );

  return (
    <DataTable
      data={data}
      columns={columns}
      emptyMessage="Aun no hay mesas registradas."
    />
  );
};
