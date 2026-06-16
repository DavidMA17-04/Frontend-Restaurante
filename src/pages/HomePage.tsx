import { NAV_ITEMS, ROUTES } from "@/shared/constants/routeConstants";
import { AppLink } from "@/shared/components/ui/Index";

/** Pagina de inicio: presenta el sistema y enlaza a cada modulo. */
export const HomePage = () => {
  const modules = NAV_ITEMS.filter((item) => item.path !== ROUTES.home);

  return (
    <section className="page">
      <h1 className="page__title">Sistema de Gestion de Restaurante</h1>
      <p className="page__subtitle">
        Plantilla base del frontend (Programacion IV). Selecciona un modulo para
        comenzar.
      </p>

      <div className="home-grid">
        {modules.map((module) => (
          <AppLink key={module.path} to={module.path}>
            {module.label}
          </AppLink>
        ))}
      </div>
    </section>
  );
};
