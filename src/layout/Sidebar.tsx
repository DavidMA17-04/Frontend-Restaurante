import { NavLink } from "react-router-dom";
import { NAV_ITEMS, ROUTES } from "@/shared/constants/routeConstants";
import { NAV_ICONS } from "@/shared/utils/navIcons";
import { cn } from "@/shared/utils/cn";

/** Navegacion lateral con iconos y enlaces a todos los modulos. */
export const Sidebar = () => {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-surface lg:block">
      <div className="sticky top-[7.5rem] h-[calc(100vh-7.5rem)] overflow-y-auto px-4 py-8">
        <p className="mb-4 px-3 text-[10px] font-medium uppercase tracking-[0.25em] text-brand-500">
          Módulos
        </p>
        <nav className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = NAV_ICONS[item.icon];

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === ROUTES.home}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 border border-transparent px-3 py-2.5 text-xs uppercase tracking-wider transition-colors",
                    isActive
                      ? "border-l-2 border-l-brand-500 bg-brand-50 pl-[10px] text-brand-600"
                      : "text-muted hover:bg-brand-50/50 hover:text-foreground",
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
        </nav>
      </div>
    </aside>
  );
};

/** Navegacion compacta para pantallas pequenas. */
export const MobileNav = () => {
  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-brand-500/20 bg-surface px-4 py-3 lg:hidden">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === ROUTES.home}
          className={({ isActive }) =>
            cn(
              "whitespace-nowrap px-3 py-2 text-[10px] uppercase tracking-wider transition-colors",
              isActive
                ? "border-b-2 border-brand-500 text-brand-500"
                : "text-muted hover:text-brand-500",
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};
