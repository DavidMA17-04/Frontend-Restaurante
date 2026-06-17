import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { EmptyState } from "@/shared/components/feedback";

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  emptyMessage?: string;
}

/**
 * Tabla generica reutilizable construida sobre TanStack Table.
 */
export const DataTable = <T,>({
  data,
  columns,
  emptyMessage = "No hay registros para mostrar.",
}: DataTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (data.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div className="overflow-hidden border border-border bg-surface-elevated">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="border-b border-brand-500/30 bg-brand-50/60 dark:bg-brand-50/30">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-[10px] font-medium uppercase tracking-[0.15em] text-brand-600 dark:text-brand-500"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-border">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="transition-colors hover:bg-brand-50/40 dark:hover:bg-brand-50/20"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 text-sm text-foreground/85"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
