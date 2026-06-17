import type { LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  className?: string;
}

/** Tarjeta de metrica para el dashboard. */
export const StatCard = ({ label, value, icon: Icon, className }: StatCardProps) => {
  return (
    <div
      className={cn(
        "border border-border border-t-2 border-t-brand-500 bg-surface-elevated p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-brand-500/80">
            {label}
          </p>
          <p className="mt-2 font-serif text-3xl tracking-wide text-brand-500">
            {value}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center border border-brand-500/30 bg-brand-50 text-brand-500">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};
