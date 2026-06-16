import type { ReactNode } from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/shared/utils/cn";

interface EmptyStateProps {
  title?: string;
  message: string;
  action?: ReactNode;
  className?: string;
}

/** Estado vacio reutilizable para listas y tablas. */
export const EmptyState = ({
  title = "Sin registros",
  message,
  action,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface px-6 py-12 text-center",
        className,
      )}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <Inbox className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};
