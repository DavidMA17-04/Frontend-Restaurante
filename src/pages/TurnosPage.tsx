import { TurnoTablePlaceholder, useGetTurnos } from "@/features/turnos";
import {
  AlertMessage,
  Loader,
  PageHeader,
} from "@/shared/components/feedback";
import { Card } from "@/shared/components/ui/Card";

/** Vista del modulo Turnos. */
export const TurnosPage = () => {
  const { data, isLoading, isError } = useGetTurnos();

  return (
    <section>
      <PageHeader
        title="Turnos"
        subtitle="Listado de turnos de trabajo."
      />

      {isLoading && <Loader label="Cargando turnos..." />}
      {isError && (
        <AlertMessage
          variant="error"
          message="Error al cargar turnos."
          className="mb-6"
        />
      )}

      {!isLoading && !isError && (
        <Card>
          <TurnoTablePlaceholder data={data ?? []} />
        </Card>
      )}
    </section>
  );
};
