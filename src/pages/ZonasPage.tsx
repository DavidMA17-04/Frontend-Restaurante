import { ZonaTablePlaceholder, useGetZonas } from "@/features/zonas";
import {
  AlertMessage,
  Loader,
  PageHeader,
} from "@/shared/components/feedback";
import { Card } from "@/shared/components/ui/Card";

/** Vista del modulo Zonas. */
export const ZonasPage = () => {
  const { data, isLoading, isError } = useGetZonas();

  return (
    <section>
      <PageHeader
        title="Zonas"
        subtitle="Listado de zonas del restaurante."
      />

      {isLoading && <Loader label="Cargando zonas..." />}
      {isError && (
        <AlertMessage
          variant="error"
          message="Error al cargar zonas."
          className="mb-6"
        />
      )}

      {!isLoading && !isError && (
        <Card>
          <ZonaTablePlaceholder data={data ?? []} />
        </Card>
      )}
    </section>
  );
};
