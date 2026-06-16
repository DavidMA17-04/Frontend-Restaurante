import { TurnoTablePlaceholder, useGetTurnos } from "@/features/turnos";

/** Vista del modulo Turnos. */
export const TurnosPage = () => {
  const { data, isLoading, isError } = useGetTurnos();

  return (
    <section className="page">
      <h1 className="page__title">Turnos</h1>
      <p className="page__subtitle">Listado de turnos de trabajo.</p>

      {isLoading && <p>Cargando...</p>}
      {isError && <p className="page__error">Error al cargar turnos.</p>}

      <TurnoTablePlaceholder data={data ?? []} />
    </section>
  );
};
