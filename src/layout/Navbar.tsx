import { UtensilsCrossed } from "lucide-react";

/** Barra superior persistente de la aplicacion. */
export const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center border-b border-brand-700/20 bg-brand-700 px-6 shadow-sm">
      <div className="flex items-center gap-3 text-white">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
          <UtensilsCrossed className="h-5 w-5" />
        </div>
        <div>
          <p className="text-base font-semibold leading-none">
            Sistema Restaurante
          </p>
          <p className="mt-1 text-xs text-brand-100">
            Gestion operativa del restaurante
          </p>
        </div>
      </div>
    </header>
  );
};
