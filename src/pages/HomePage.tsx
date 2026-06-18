import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  TableProperties,
  Users,
} from "lucide-react";
import { useGetClientes } from "@/features/clientes";
import { useGetListaEspera } from "@/features/lista-espera";
import { useGetMesas } from "@/features/mesas";
import { useGetReservas } from "@/features/reservas";
import { Card } from "@/shared/components/ui/Card";
import { PageHeader } from "@/shared/components/feedback";
import { StatCard } from "@/shared/components/layout/StatCard";
import { Badge } from "@/shared/components/ui/Badge";
import { NAV_ITEMS, ROUTES } from "@/shared/constants/routeConstants";
import { NAV_ICONS } from "@/shared/utils/navIcons";
import { formatDateTimeParts } from "@/shared/utils/dateTime";
import { getEstadoBadgeVariant } from "@/shared/utils/statusBadge";

const HERO_IMAGE = "/images/hero-restaurant.jpg";

/** Pagina de inicio con metricas y acceso rapido a cada modulo. */
export const HomePage = () => {
  const modules = NAV_ITEMS.filter((item) => item.path !== ROUTES.home);
  const { data: clientes } = useGetClientes();
  const { data: mesas } = useGetMesas();
  const { data: reservas } = useGetReservas();
  const { data: listaEspera } = useGetListaEspera();

  const totalClientes = clientes?.length ?? 0;
  const totalMesas = mesas?.length ?? 0;
  const reservasConfirmadas =
    reservas?.filter((reserva) => reserva.estado === "Confirmada").length ?? 0;
  const clientesEnEspera = listaEspera?.length ?? 0;

  const ultimasReservas = [...(reservas ?? [])]
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
    .slice(0, 3);

  return (
    <section>
      <PageHeader
        category="Inicio"
        title="Panel principal"
      />

      <div className="relative -mx-4 mb-10 overflow-hidden sm:-mx-6 lg:-mx-10">
        <img
          src={HERO_IMAGE}
          alt="Interior del restaurante La Reserva"
          className="h-56 w-full object-cover md:h-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-brand-500/15 to-brand-500/5" />
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total clientes" value={totalClientes} icon={Users} />
        <StatCard label="Total mesas" value={totalMesas} icon={TableProperties} />
        <StatCard
          label="Reservas confirmadas"
          value={reservasConfirmadas}
          icon={CalendarCheck}
        />
        <StatCard
          label="Clientes en espera"
          value={clientesEnEspera}
          icon={Clock}
        />
      </div>

      {ultimasReservas.length > 0 && (
        <div className="mb-8 overflow-hidden border border-border border-t-2 border-t-brand-500 bg-surface-elevated">
          <div className="border-b border-brand-500/15 bg-brand-50/40 px-6 py-4 dark:bg-brand-50/20">
            <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-brand-600 dark:text-brand-500">
              Reservas recientes
            </h2>
            <p className="mt-1 text-sm text-muted">
              Ultimas reservas registradas en el sistema.
            </p>
          </div>
          <ul className="divide-y divide-border">
            {ultimasReservas.map((reserva) => (
              <li
                key={reserva.id}
                className="flex flex-wrap items-center justify-between gap-3 px-6 py-4"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Reserva #{reserva.id} — Mesa {reserva.mesaId}
                  </p>
                  <p className="text-sm text-muted">
                    Cliente {reserva.clienteId} ·{" "}
                    {formatDateTimeParts(reserva.fecha, reserva.horaInicio)}
                  </p>
                </div>
                <Badge variant={getEstadoBadgeVariant(reserva.estado)}>
                  {reserva.estado}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h2 className="mb-4 font-serif text-sm uppercase tracking-[0.15em] text-brand-500">
          Accesos rapidos
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => {
            const Icon = NAV_ICONS[module.icon];

            return (
              <Link key={module.path} to={module.path} className="group">
                <Card className="h-full border-t-2 border-t-brand-500/60 transition-all duration-200 hover:border-brand-500/60">
                  <div className="flex items-start justify-between gap-4">
                    <Icon className="h-5 w-5 text-brand-500" strokeWidth={1.5} />
                    <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-brand-500" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg text-foreground">
                    {module.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {module.description}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
