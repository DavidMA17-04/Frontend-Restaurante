import type { BadgeVariant } from "@/shared/components/ui/Badge";

/** Mapea valores de estado a variantes visuales del Badge. */
export const getEstadoBadgeVariant = (estado: string): BadgeVariant => {
  const normalized = estado.toLowerCase();

  if (
    normalized.includes("confirm") ||
    normalized.includes("disponib") ||
    normalized.includes("atendido") ||
    normalized.includes("activo")
  ) {
    return "success";
  }

  if (
    normalized.includes("pendiente") ||
    normalized.includes("espera") ||
    normalized.includes("reserv")
  ) {
    return "warning";
  }

  if (
    normalized.includes("cancel") ||
    normalized.includes("ocupad") ||
    normalized.includes("bloque")
  ) {
    return "danger";
  }

  return "info";
};

/** Variante para campos booleanos activo/inactivo. */
export const getActivoBadgeVariant = (activo: boolean): BadgeVariant =>
  activo ? "success" : "neutral";
