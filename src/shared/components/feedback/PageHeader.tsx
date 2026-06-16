import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

/** Encabezado estandar para paginas del sistema. */
export const PageHeader = ({
  title,
  subtitle,
  actions,
  className,
}: PageHeaderProps) => {
  return (
    <div
      className={cn(
        "mb-6 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between",
        className,
      )}
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 max-w-2xl text-sm text-muted">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
};
