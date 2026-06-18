/** Leyenda de colores del mapa de mesas (estado indicado por las sillas). */
export const ZonaMapLegend = () => {
  const items = [
    {
      label: "Libre",
      className:
        "bg-emerald-500 ring-2 ring-emerald-600/40 dark:bg-emerald-400 dark:ring-emerald-300/50",
    },
    {
      label: "Reservada",
      className:
        "bg-amber-500 ring-2 ring-amber-600/40 dark:bg-amber-400 dark:ring-amber-300/50",
    },
    {
      label: "Bloqueada",
      className:
        "bg-red-500 ring-2 ring-red-600/40 dark:bg-red-400 dark:ring-red-300/50",
    },
    {
      label: "Zona no disponible",
      className: "bg-muted/40 ring-1 ring-border",
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
      <span className="font-medium uppercase tracking-wider text-foreground/70">
        Estado (sillas)
      </span>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${item.className}`} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};
