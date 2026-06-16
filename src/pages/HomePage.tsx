import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card } from "@/shared/components/ui/Card";
import { PageHeader } from "@/shared/components/feedback";
import { NAV_ITEMS, ROUTES } from "@/shared/constants/routeConstants";
import { NAV_ICONS } from "@/shared/utils/navIcons";

/** Pagina de inicio con acceso rapido a cada modulo. */
export const HomePage = () => {
  const modules = NAV_ITEMS.filter((item) => item.path !== ROUTES.home);

  return (
    <section>
      <PageHeader
        title="Panel principal"
        subtitle="Plantilla base del frontend para la gestion del restaurante. Selecciona un modulo para comenzar."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => {
          const Icon = NAV_ICONS[module.icon];

          return (
            <Link key={module.path} to={module.path} className="group">
              <Card className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-600/30 hover:shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-brand-600" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-slate-900">
                  {module.label}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {module.description}
                </p>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
