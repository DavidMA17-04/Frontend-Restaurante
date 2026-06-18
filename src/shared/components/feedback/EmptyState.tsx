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
      <Inbox className="mb-4 h-10 w-10 text-muted" />
      <h3 className="font-serif text-base text-foreground">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};
