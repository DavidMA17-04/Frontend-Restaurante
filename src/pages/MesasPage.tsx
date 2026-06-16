import { MesaTablePlaceholder, useGetMesas } from "@/features/mesas";
import {
  AlertMessage,
  Loader,
  PageHeader,
} from "@/shared/components/feedback";
import { Card } from "@/shared/components/ui/Card";

/** Vista del modulo Mesas. */
export const MesasPage = () => {
  const { data, isLoading, isError } = useGetMesas();

  return (
    <section>
      <PageHeader
        title="Mesas"
        subtitle="Listado de mesas del restaurante."
      />

      {isLoading && <Loader label="Cargando mesas..." />}
      {isError && (
        <AlertMessage
          variant="error"
          message="Error al cargar mesas."
          className="mb-6"
        />
      )}

      {!isLoading && !isError && (
        <Card>
          <MesaTablePlaceholder data={data ?? []} />
        </Card>
      )}
    </section>
  );
};
