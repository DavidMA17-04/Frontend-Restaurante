import { AppLink } from "@/shared/components/ui/Index";
import { NAV_ITEMS, ROUTES } from "@/shared/constants/routeConstants";
import { NAV_ICONS } from "@/shared/utils/navIcons";
import { cn } from "@/shared/utils/cn";

/** Navegacion lateral con iconos y enlaces a todos los modulos. */
export const Sidebar = () => {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-surface lg:block">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Modulos
        </p>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = NAV_ICONS[item.icon];

            return (
              <AppLink
                key={item.path}
                to={item.path}
                end={item.path === ROUTES.home}
                className="flex items-center gap-3 px-3 py-2.5"
                activeClassName="shadow-sm"
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </AppLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

/** Navegacion compacta para pantallas pequenas. */
export const MobileNav = () => {
  return (
    <nav className="flex gap-2 overflow-x-auto border-b border-border bg-surface px-4 py-3 lg:hidden">
      {NAV_ITEMS.map((item) => (
        <AppLink
          key={item.path}
          to={item.path}
          end={item.path === ROUTES.home}
          className={cn("whitespace-nowrap px-3 py-2 text-xs")}
        >
          {item.label}
        </AppLink>
      ))}
    </nav>
  );
};
