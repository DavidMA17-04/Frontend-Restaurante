import { AppLink } from "@/shared/components/ui/Index";
import { NAV_ITEMS, ROUTES } from "@/shared/constants/routeConstants";

/** Navegacion lateral con enlaces a todos los modulos del sistema. */
export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        {NAV_ITEMS.map((item) => (
          <AppLink key={item.path} to={item.path} end={item.path === ROUTES.home}>
            {item.label}
          </AppLink>
        ))}
      </nav>
    </aside>
  );
};
