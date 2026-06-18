import type { InputHTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

/** Input de texto reutilizable con estilos Tailwind. */
export const Input = ({ label, className, id, ...props }: InputProps) => {
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
          "w-full border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10",
          className,
        )}
        {...props}
      />
    </div>
  );
};
