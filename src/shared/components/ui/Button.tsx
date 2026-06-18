import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "success";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border border-brand-500 bg-brand-500 text-foreground hover:border-brand-600 hover:bg-brand-600 focus-visible:ring-brand-500/30",
  secondary:
    "border border-border bg-transparent text-foreground hover:border-brand-500/40 hover:bg-surface-hover focus-visible:ring-brand-500/20 dark:hover:bg-brand-50",
  ghost:
    "text-muted hover:bg-surface-hover hover:text-brand-600 focus-visible:ring-brand-500/20 dark:hover:bg-brand-50",
  danger:
    "border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 focus-visible:ring-red-600/30 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-300 dark:hover:bg-red-950",
  success:
    "border border-emerald-600 bg-emerald-600 text-white hover:border-emerald-700 hover:bg-emerald-700 focus-visible:ring-emerald-600/30 dark:border-emerald-500 dark:bg-emerald-600 dark:hover:border-emerald-400 dark:hover:bg-emerald-500",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-[10px] uppercase tracking-wider",
  md: "px-4 py-2 text-[10px] uppercase tracking-wider",
  lg: "px-5 py-2.5 text-xs uppercase tracking-wider",
};

/** Boton reutilizable con variantes Tailwind. */
export const Button = ({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
