import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/tables";
import type { Cliente } from "../types/clienteType";

interface ClienteTablePlaceholderProps {
  data: Cliente[];
}

const columns: ColumnDef<Cliente>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "nombre", header: "Nombre" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "telefono", header: "Telefono" },
];

/**
 * Componente de negocio del modulo Clientes.
 * Define las columnas del dominio y delega el render a DataTable (shared).
 */
export const ClienteTablePlaceholder = ({
  data,
}: ClienteTablePlaceholderProps) => {
  return (
    <DataTable
      data={data}
      columns={columns}
      emptyMessage="Aun no hay clientes. La integracion con el backend se realizara en la siguiente etapa."
    />
  );
};
