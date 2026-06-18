import type { ReactNode } from "react";
import { SearchInput } from "@/shared/components/ui/SearchInput";

interface TableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  actions?: ReactNode;
}

/** Barra superior de tablas con busqueda y acciones. */
export const TableToolbar = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Buscar registros...",
  actions,
}: TableToolbarProps) => {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <SearchInput
        value={searchValue}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        className="sm:max-w-xs"
      />
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
};
