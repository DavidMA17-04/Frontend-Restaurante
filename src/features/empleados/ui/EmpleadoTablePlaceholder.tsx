import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/tables";
import type { Empleado } from "../types/empleadoType";

interface EmpleadoTablePlaceholderProps {
  data: Empleado[];
}

const columns: ColumnDef<Empleado>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "nombre", header: "Nombre" },
  { accessorKey: "rol", header: "Rol" },
  {
    accessorKey: "activo",
    header: "Activo",
    cell: (info) => (info.getValue() ? "Si" : "No"),
  },
];

/** Componente de negocio del modulo Empleados. */
export const EmpleadoTablePlaceholder = ({
  data,
}: EmpleadoTablePlaceholderProps) => {
  return (
    <DataTable
      data={data}
      columns={columns}
      emptyMessage="Aun no hay empleados. La integracion con el backend se realizara en la siguiente etapa."
    />
  );
};
