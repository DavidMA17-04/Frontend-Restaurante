import type { SelectHTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

export interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

/** Select reutilizable con estilos Tailwind. */
export const FormSelect = ({
  label,
  error,
  options,
  className,
  id,
  ...props
}: FormSelectProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          className="text-sm font-medium text-slate-700"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          "w-full rounded-lg border bg-surface px-3 py-2 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-4",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
            : "border-border focus:border-brand-600 focus:ring-brand-600/10",
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
};
