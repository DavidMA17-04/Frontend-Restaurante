import type { InputHTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/** Campo de formulario reutilizable con estilos Tailwind. */
export const FormInput = ({
  label,
  error,
  className,
  id,
  ...props
}: FormInputProps) => {
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
      <input
        id={id}
        className={cn(
          "w-full rounded-lg border bg-surface px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-4",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
            : "border-border focus:border-brand-600 focus:ring-brand-600/10",
          className,
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
};
