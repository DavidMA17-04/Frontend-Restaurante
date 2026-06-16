import { ReservaTablePlaceholder, useGetReservas } from "@/features/reservas";
import {
  AlertMessage,
  Loader,
  PageHeader,
} from "@/shared/components/feedback";
import { Card } from "@/shared/components/ui/Card";

/** Vista del modulo Reservas. */
export const ReservasPage = () => {
  const { data, isLoading, isError } = useGetReservas();

  return (
    <section>
      <PageHeader
        title="Reservas"
        subtitle="Listado de reservas del restaurante."
      />

      {isLoading && <Loader label="Cargando reservas..." />}
      {isError && (
        <AlertMessage
          variant="error"
          message="Error al cargar reservas."
          className="mb-6"
        />
      )}

      {!isLoading && !isError && (
        <Card>
          <ReservaTablePlaceholder data={data ?? []} />
        </Card>
      )}
    </section>
  );
};
