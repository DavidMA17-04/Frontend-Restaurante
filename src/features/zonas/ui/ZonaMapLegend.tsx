import { mesaLegendItems } from "@/features/zonas/constants/mesaEstadoStyles";

/** Leyenda de colores del mapa de mesas (estado indicado por las sillas). */
export const ZonaMapLegend = () => {
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
      <span className="font-medium uppercase tracking-wider text-foreground/70">
        Estado (sillas)
      </span>
      {mesaLegendItems.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${item.className}`} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};
