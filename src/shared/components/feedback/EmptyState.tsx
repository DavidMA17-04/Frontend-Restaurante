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
        "flex flex-col items-center justify-center border border-dashed border-border bg-surface px-6 py-12 text-center",
        className,
      )}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center border border-border bg-foreground/5 text-muted">
        <Inbox className="h-6 w-6" />
      </div>
      <h3 className="font-serif text-base text-foreground">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};
