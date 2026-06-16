import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/shared/utils/cn";

type AlertVariant = "error" | "success" | "info";

interface AlertMessageProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  className?: string;
  action?: ReactNode;
}

const variantStyles: Record<
  AlertVariant,
  { container: string; icon: string; Icon: typeof AlertCircle }
> = {
  error: {
    container: "border-red-200 bg-red-50 text-red-800",
    icon: "text-red-600",
    Icon: AlertCircle,
  },
  success: {
    container: "border-emerald-200 bg-emerald-50 text-emerald-800",
    icon: "text-emerald-600",
    Icon: CheckCircle2,
  },
  info: {
    container: "border-sky-200 bg-sky-50 text-sky-800",
    icon: "text-sky-600",
    Icon: Info,
  },
};

/** Mensaje de alerta reutilizable para errores, exito o informacion. */
export const AlertMessage = ({
  variant = "info",
  title,
  message,
  className,
  action,
}: AlertMessageProps) => {
  const styles = variantStyles[variant];
  const Icon = styles.Icon;

  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border px-4 py-3",
        styles.container,
        className,
      )}
    >
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", styles.icon)} />
      <div className="flex-1">
        {title && <p className="text-sm font-semibold">{title}</p>}
        <p className={cn("text-sm", title && "mt-1")}>{message}</p>
        {action && <div className="mt-3">{action}</div>}
      </div>
    </div>
  );
};
