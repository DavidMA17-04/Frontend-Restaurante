import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

export type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success:
    "bg-status-success-muted text-status-success ring-status-success/25 dark:ring-status-success/35",
  warning:
    "bg-status-warning-muted text-status-warning ring-status-warning/25 dark:ring-status-warning/35",
  danger:
    "bg-status-danger-muted text-status-danger ring-status-danger/25 dark:ring-status-danger/35",
  info: "bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-950/60 dark:text-sky-300 dark:ring-sky-500/30",
  neutral:
    "bg-slate-100 text-slate-700 ring-slate-600/10 dark:bg-white/10 dark:text-white/70 dark:ring-white/20",
};

/** Etiqueta visual para estados y categorias. */
export const Badge = ({
  children,
  variant = "neutral",
  className,
}: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ring-1 ring-inset",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
};
