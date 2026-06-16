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
        "rounded-xl border border-border bg-surface p-6 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
};
