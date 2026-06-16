import {
  EmpleadoTablePlaceholder,
  useGetEmpleados,
} from "@/features/empleados";
import {
  AlertMessage,
  Loader,
  PageHeader,
} from "@/shared/components/feedback";
import { Card } from "@/shared/components/ui/Card";

/** Vista del modulo Empleados. */
export const EmpleadosPage = () => {
  const { data, isLoading, isError } = useGetEmpleados();

  return (
    <section>
      <PageHeader
        title="Empleados"
        subtitle="Listado del personal del restaurante."
      />

      {isLoading && <Loader label="Cargando empleados..." />}
      {isError && (
        <AlertMessage
          variant="error"
          message="Error al cargar empleados."
          className="mb-6"
        />
      )}

      {!isLoading && !isError && (
        <Card>
          <EmpleadoTablePlaceholder data={data ?? []} />
        </Card>
      )}
    </section>
  );
};
