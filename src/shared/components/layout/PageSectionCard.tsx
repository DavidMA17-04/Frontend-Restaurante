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
        "overflow-hidden border border-border border-t-2 border-t-brand-500/50 bg-surface-elevated",
        className,
      )}
    >
      <div className="border-b border-brand-500/15 bg-brand-50/40 px-6 py-4 dark:bg-brand-50/20">
        <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-brand-600 dark:text-brand-500">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-muted">{description}</p>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};
