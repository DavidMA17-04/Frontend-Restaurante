import type { ZonaMapModel } from "@/features/zonas/utils/mesaEstado";
import { Badge } from "@/shared/components/ui/Badge";
import { cn } from "@/shared/utils/cn";

interface ZonaMapSummaryProps {
  zonasMap: ZonaMapModel[];
}

/** Tarjetas resumen de mesas y sillas por zona. */
export const ZonaMapSummary = ({ zonasMap }: ZonaMapSummaryProps) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {zonasMap.map(({ zona, totalMesas, totalSillas, mesas }) => {
        const libres = mesas.filter((mesa) => mesa.estado.tipo === "libre").length;
        const reservadas = mesas.filter(
          (mesa) => mesa.estado.tipo === "reservada",
        ).length;
        const bloqueadas = mesas.filter(
          (mesa) => mesa.estado.tipo === "bloqueada",
        ).length;

        return (
          <div
            key={zona.id}
            className={cn(
              "border border-border bg-surface-muted p-4",
              !zona.disponibilidad && "opacity-70",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-serif text-sm text-foreground">{zona.nombre}</h3>
              {!zona.disponibilidad && (
                <Badge variant="danger">No disponible</Badge>
              )}
            </div>
            <p className="mt-2 text-lg font-medium text-foreground">
              {totalMesas} mesas · {totalSillas} sillas
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[10px] uppercase tracking-wider">
              <Badge variant="success">{libres} libres</Badge>
              <Badge variant="warning">{reservadas} reservadas</Badge>
              <Badge variant="danger">{bloqueadas} bloqueadas</Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
};
