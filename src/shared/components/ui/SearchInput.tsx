import { Search } from "lucide-react";
import { cn } from "@/shared/utils/cn";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/** Input de busqueda con icono para toolbars de tablas. */
export const SearchInput = ({
  value,
  onChange,
  placeholder = "Buscar...",
  className,
}: SearchInputProps) => {
  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-600/10"
      />
    </div>
  );
};
