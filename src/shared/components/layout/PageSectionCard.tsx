import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

interface PageSectionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

/** Card con encabezado interno para secciones de listado. */
export const PageSectionCard = ({
  title,
  description,
  children,
  className,
}: PageSectionCardProps) => {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-surface shadow-sm",
        className,
      )}
    >
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted">{description}</p>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};
