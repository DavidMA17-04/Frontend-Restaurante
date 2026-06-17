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
          className="text-xs font-medium uppercase tracking-wider text-muted"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "w-full border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:outline-none focus:ring-4",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
            : "border-border focus:border-brand-500 focus:ring-brand-500/10",
          className,
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
};
