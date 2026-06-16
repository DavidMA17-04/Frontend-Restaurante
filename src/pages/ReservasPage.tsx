import { ReservaTablePlaceholder, useGetReservas } from "@/features/reservas";

/** Vista del modulo Reservas. */
export const ReservasPage = () => {
  const { data, isLoading, isError } = useGetReservas();

  return (
    <section className="page">
      <h1 className="page__title">Reservas</h1>
      <p className="page__subtitle">Listado de reservas del restaurante.</p>

      {isLoading && <p>Cargando...</p>}
      {isError && <p className="page__error">Error al cargar reservas.</p>}

      <ReservaTablePlaceholder data={data ?? []} />
    </section>
  );
};
