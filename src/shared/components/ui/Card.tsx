import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
}

/** Contenedor de superficie reutilizable para secciones de pagina. */
export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        "border border-border bg-surface-elevated p-6 shadow-sm dark:shadow-none",
        className,
      )}
    >
      {children}
    </div>
  );
};
