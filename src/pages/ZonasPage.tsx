import { ZonaTablePlaceholder, useGetZonas } from "@/features/zonas";

/** Vista del modulo Zonas. */
export const ZonasPage = () => {
  const { data, isLoading, isError } = useGetZonas();

  return (
    <section className="page">
      <h1 className="page__title">Zonas</h1>
      <p className="page__subtitle">Listado de zonas del restaurante.</p>

      {isLoading && <p>Cargando...</p>}
      {isError && <p className="page__error">Error al cargar zonas.</p>}

      <ZonaTablePlaceholder data={data ?? []} />
    </section>
  );
};
