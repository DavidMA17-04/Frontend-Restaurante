import { UtensilsCrossed } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { ThemeToggle } from "@/shared/components/ui/ThemeToggle";
import { NAV_ITEMS, ROUTES } from "@/shared/constants/routeConstants";
import { NAV_ICONS } from "@/shared/utils/navIcons";
import { cn } from "@/shared/utils/cn";

/** Barra superior con marca y navegacion horizontal entre modulos. */
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
            <Link
              to={ROUTES.home}
              className="rounded-sm text-brand-600 transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:text-brand-500"
              aria-label="Ir al inicio"
            >
              <UtensilsCrossed className="h-6 w-6" strokeWidth={1.5} />
            </Link>
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

      <nav
        className="border-b border-brand-500/20 bg-surface dark:bg-bg"
        aria-label="Módulos"
      >
        <div className="mx-auto flex max-w-7xl gap-0.5 overflow-x-auto px-4 py-1 sm:px-6">
          {NAV_ITEMS.map((item) => {
            const Icon = NAV_ICONS[item.icon];

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === ROUTES.home}
                className={({ isActive }) =>
                  cn(
                    "flex shrink-0 items-center gap-2 whitespace-nowrap px-3 py-2.5 text-[10px] uppercase tracking-wider transition-colors sm:text-xs",
                    isActive
                      ? "border-b-2 border-brand-500 text-brand-600 dark:text-brand-500"
                      : "border-b-2 border-transparent text-muted hover:text-brand-500",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isActive ? "text-brand-500" : "text-muted",
                      )}
                      strokeWidth={1.5}
                    />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
