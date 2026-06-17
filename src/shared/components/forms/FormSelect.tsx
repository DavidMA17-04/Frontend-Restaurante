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
          className="text-xs font-medium uppercase tracking-wider text-muted"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          "w-full border bg-surface px-3 py-2 text-sm text-foreground transition-colors focus:outline-none focus:ring-4",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
            : "border-border focus:border-brand-500 focus:ring-brand-500/10",
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
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
};
