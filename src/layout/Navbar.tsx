import { UtensilsCrossed } from "lucide-react";
import { ThemeToggle } from "@/shared/components/ui/ThemeToggle";

/** Barra superior estilo editorial de lujo. */
export const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 bg-surface text-foreground shadow-sm dark:bg-bg dark:shadow-none">
      <div className="hidden border-b border-brand-500/15 md:block">
        <div className="mx-auto flex max-w-7xl justify-end gap-6 px-6 py-2 text-[10px] uppercase tracking-[0.2em] text-muted">
          <span>Sistema de gestión</span>
          <span className="text-brand-600 dark:text-brand-500">La Reserva</span>
        </div>
      </div>

      <div className="border-b border-brand-500/25 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <UtensilsCrossed className="h-6 w-6 text-brand-600 dark:text-brand-500" strokeWidth={1.5} />
          </div>

          <div className="hidden flex-1 text-center md:block">
            <p className="font-serif text-[11px] uppercase tracking-[0.35em] text-brand-600 dark:text-brand-500">
              La Reserva
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted">
              Restaurante · Gestión operativa
            </p>
          </div>

          <div className="flex items-center justify-end gap-3">
            <ThemeToggle />
            <p className="font-serif text-sm italic text-brand-600/90 dark:text-brand-500/80 md:hidden">
              La Reserva
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
