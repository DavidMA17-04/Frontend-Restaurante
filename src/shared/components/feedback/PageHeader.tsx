import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  category?: string;
  actions?: ReactNode;
  className?: string;
}

/** Encabezado editorial para paginas del sistema. */
export const PageHeader = ({
  title,
  subtitle,
  category = "Gestión",
  actions,
  className,
}: PageHeaderProps) => {
  const isCentered = !actions;

  return (
    <div
      className={cn(
        "mb-10 border-b border-brand-500/20 pb-10",
        actions
          ? "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          : "text-center",
        className,
      )}
    >
      <div className={cn(isCentered && "mx-auto")}>
        <p className="font-serif text-sm italic text-brand-500">{category}</p>
        <h1 className="mt-2 font-serif text-3xl uppercase tracking-wide text-foreground md:text-5xl">
          {title}
        </h1>
        <div
          className={cn(
            "mt-4 h-px w-16 bg-brand-500",
            isCentered ? "mx-auto" : "",
          )}
        />
        {subtitle && (
          <p className="mt-4 max-w-2xl text-sm text-muted">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      )}
    </div>
  );
};
