import {
  BloqueoMesaTablePlaceholder,
  useGetBloqueosMesa,
} from "@/features/bloqueos-mesa";

/** Vista del modulo Bloqueos de Mesa. */
export const BloqueosMesaPage = () => {
  const { data, isLoading, isError } = useGetBloqueosMesa();

  return (
    <section className="page">
      <h1 className="page__title">Bloqueos de Mesa</h1>
      <p className="page__subtitle">
        Listado de bloqueos temporales de mesas.
      </p>

      {isLoading && <p>Cargando...</p>}
      {isError && <p className="page__error">Error al cargar bloqueos.</p>}

      <BloqueoMesaTablePlaceholder data={data ?? []} />
    </section>
  );
};
