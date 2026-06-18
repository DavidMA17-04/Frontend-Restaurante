import { Loader2 } from "lucide-react";
import { cn } from "@/shared/utils/cn";

interface LoaderProps {
  label?: string;
  className?: string;
}

/** Indicador de carga reutilizable. */
export const Loader = ({
  label = "Cargando...",
  className,
}: LoaderProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border border-border bg-surface px-4 py-6 text-sm text-muted",
        className,
      )}
    >
      <Loader2 className="h-5 w-5 animate-spin text-brand-500" />
      <span>{label}</span>
    </div>
  );
};
