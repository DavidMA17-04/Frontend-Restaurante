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
        "rounded-xl border border-border bg-surface p-5 shadow-sm",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};
