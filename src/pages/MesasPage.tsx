import { MesaTablePlaceholder, useGetMesas } from "@/features/mesas";

/** Vista del modulo Mesas. */
export const MesasPage = () => {
  const { data, isLoading, isError } = useGetMesas();

  return (
    <section className="page">
      <h1 className="page__title">Mesas</h1>
      <p className="page__subtitle">Listado de mesas del restaurante.</p>

      {isLoading && <p>Cargando...</p>}
      {isError && <p className="page__error">Error al cargar mesas.</p>}

      <MesaTablePlaceholder data={data ?? []} />
    </section>
  );
};
