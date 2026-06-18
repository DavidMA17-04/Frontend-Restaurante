import type { MesaEstadoDetalle } from "@/features/zonas/utils/mesaEstado";
import { Badge } from "@/shared/components/ui/Badge";
import { cn } from "@/shared/utils/cn";

interface MesaInfoPopoverProps {
  numero: number;
  capacidad: number;
  estado: MesaEstadoDetalle;
  className?: string;
  variant?: "tooltip" | "panel";
}

const estadoBadgeVariant = (tipo: MesaEstadoDetalle["tipo"]) => {
  if (tipo === "libre") {
    return "success" as const;
  }
  if (tipo === "reservada") {
    return "warning" as const;
  }
  return "danger" as const;
};

const estadoLabel = (tipo: MesaEstadoDetalle["tipo"]) => {
  if (tipo === "libre") {
    return "Libre";
  }
  if (tipo === "reservada") {
    return "Reservada";
  }
  return "Bloqueada";
};

/** Carta con detalle de mesa (panel lateral o tooltip). */
export const MesaInfoPopover = ({
  numero,
  capacidad,
  estado,
  className,
  variant = "tooltip",
}: MesaInfoPopoverProps) => {
  const isPanel = variant === "panel";

  return (
    <div
      className={cn(
        isPanel
          ? "w-full"
          : "pointer-events-none z-50 min-w-[200px] border border-brand-500/30 bg-surface-elevated p-3 shadow-lg",
        className,
      )}
      role={isPanel ? "region" : "tooltip"}
      aria-label={isPanel ? `Detalle mesa ${numero}` : undefined}
    >
      <p className="font-serif text-base text-foreground">Mesa {numero}</p>
      <p className="mt-1 text-xs text-muted">
        Capacidad: {capacidad} {capacidad === 1 ? "silla" : "sillas"}
      </p>
      <div className="mt-2">
        <Badge variant={estadoBadgeVariant(estado.tipo)}>
          {estadoLabel(estado.tipo)}
        </Badge>
      </div>

      {estado.tipo === "reservada" && (
        <div className="mt-3 space-y-1 border-t border-border pt-2 text-xs text-muted">
          {estado.clienteNombre && (
            <p>
              <span className="font-medium text-foreground">Cliente:</span>{" "}
              {estado.clienteNombre}
            </p>
          )}
          {estado.horarioTexto && (
            <p>
              <span className="font-medium text-foreground">Horario:</span>{" "}
              {estado.horarioTexto}
            </p>
          )}
          {estado.reserva?.estado && (
            <p>
              <span className="font-medium text-foreground">Estado reserva:</span>{" "}
              {estado.reserva.estado}
            </p>
          )}
        </div>
      )}

      {estado.tipo === "bloqueada" && (
        <div className="mt-3 space-y-1 border-t border-border pt-2 text-xs text-muted">
          {estado.motivo && (
            <p>
              <span className="font-medium text-foreground">Motivo:</span>{" "}
              {estado.motivo}
            </p>
          )}
          {estado.horarioTexto && (
            <p>
              <span className="font-medium text-foreground">Horario:</span>{" "}
              {estado.horarioTexto}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
