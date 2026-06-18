import type { MesaEstadoTipo } from "@/features/zonas/utils/mesaEstado";

/** Clases de silla por estado — paleta La Reserva (sage, dorado, burdeos). */
export const mesaChairStyles: Record<MesaEstadoTipo, string> = {
  libre: "bg-status-success ring-2 ring-status-success/35 dark:ring-status-success/50",
  reservada:
    "bg-status-warning ring-2 ring-status-warning/35 dark:ring-status-warning/50",
  bloqueada:
    "bg-status-danger ring-2 ring-status-danger/35 dark:ring-status-danger/50",
};

export const mesaLegendItems = [
  { label: "Libre", className: mesaChairStyles.libre },
  { label: "Reservada", className: mesaChairStyles.reservada },
  { label: "Bloqueada", className: mesaChairStyles.bloqueada },
  {
    label: "Zona no disponible",
    className: "bg-muted/40 ring-1 ring-border",
  },
] as const;
