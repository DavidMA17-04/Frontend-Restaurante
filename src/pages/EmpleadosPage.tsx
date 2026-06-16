import {
  EmpleadoTablePlaceholder,
  useGetEmpleados,
} from "@/features/empleados";

/** Vista del modulo Empleados. */
export const EmpleadosPage = () => {
  const { data, isLoading, isError } = useGetEmpleados();

  return (
    <section className="page">
      <h1 className="page__title">Empleados</h1>
      <p className="page__subtitle">Listado del personal del restaurante.</p>

      {isLoading && <p>Cargando...</p>}
      {isError && <p className="page__error">Error al cargar empleados.</p>}

      <EmpleadoTablePlaceholder data={data ?? []} />
    </section>
  );
};
