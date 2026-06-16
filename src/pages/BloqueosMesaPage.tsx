import {
  BloqueoMesaTablePlaceholder,
  useGetBloqueosMesa,
} from "@/features/bloqueos-mesa";
import {
  AlertMessage,
  Loader,
  PageHeader,
} from "@/shared/components/feedback";
import { Card } from "@/shared/components/ui/Card";

/** Vista del modulo Bloqueos de Mesa. */
export const BloqueosMesaPage = () => {
  const { data, isLoading, isError } = useGetBloqueosMesa();

  return (
    <section>
      <PageHeader
        title="Bloqueos de Mesa"
        subtitle="Listado de bloqueos temporales de mesas."
      />

      {isLoading && <Loader label="Cargando bloqueos..." />}
      {isError && (
        <AlertMessage
          variant="error"
          message="Error al cargar bloqueos."
          className="mb-6"
        />
      )}

      {!isLoading && !isError && (
        <Card>
          <BloqueoMesaTablePlaceholder data={data ?? []} />
        </Card>
      )}
    </section>
  );
};
