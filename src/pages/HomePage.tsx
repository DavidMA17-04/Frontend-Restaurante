import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  TableProperties,
  Users,
} from "lucide-react";
import { LISTA_ESPERA_MOCK } from "@/mocks";
import { useGetClientes } from "@/features/clientes";
import { useGetMesas } from "@/features/mesas";
import { useGetReservas } from "@/features/reservas";
import { Card } from "@/shared/components/ui/Card";
import { PageHeader } from "@/shared/components/feedback";
import { StatCard } from "@/shared/components/layout/StatCard";
import { Badge } from "@/shared/components/ui/Badge";
import { NAV_ITEMS, ROUTES } from "@/shared/constants/routeConstants";
import { NAV_ICONS } from "@/shared/utils/navIcons";
import { getEstadoBadgeVariant } from "@/shared/utils/statusBadge";

/** Pagina de inicio con metricas y acceso rapido a cada modulo. */
export const HomePage = () => {
  const modules = NAV_ITEMS.filter((item) => item.path !== ROUTES.home);
  const { data: clientes } = useGetClientes();
  const { data: mesas } = useGetMesas();
  const { data: reservas } = useGetReservas();

  const totalClientes = clientes?.length ?? 0;
  const mesasDisponibles =
    mesas?.filter((mesa) => mesa.estado === "Disponible").length ?? 0;
  const reservasConfirmadas =
    reservas?.filter((reserva) => reserva.estado === "Confirmada").length ?? 0;
  const clientesEnEspera = LISTA_ESPERA_MOCK.filter(
    (entrada) => entrada.estado.toLowerCase().includes("espera"),
  ).length;

  const ultimasReservas = [...(reservas ?? [])]
    .sort(
      (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime(),
    )
    .slice(0, 3);

  return (
    <section>
      <PageHeader
        title="Panel principal"
        subtitle="Resumen del restaurante con datos de demostracion. Selecciona un modulo para gestionar cada area."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total clientes" value={totalClientes} icon={Users} />
        <StatCard
          label="Mesas disponibles"
          value={mesasDisponibles}
          icon={TableProperties}
        />
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
        <div className="mb-8 overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-sm font-semibold text-slate-900">
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
                  <p className="text-sm font-medium text-slate-900">
                    Reserva #{reserva.id} — Mesa {reserva.mesaId}
                  </p>
                  <p className="text-sm text-muted">
                    Cliente {reserva.clienteId} ·{" "}
                    {new Date(reserva.fecha).toLocaleString("es-CR")}
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
        <h2 className="mb-4 text-sm font-semibold text-slate-900">
          Accesos rapidos
        </h2>
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
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">
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
