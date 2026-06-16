import {
  ListaEsperaTablePlaceholder,
  useGetListaEspera,
} from "@/features/lista-espera";

/** Vista del modulo Lista de Espera. */
export const ListaEsperaPage = () => {
  const { data, isLoading, isError } = useGetListaEspera();

  return (
    <section className="page">
      <h1 className="page__title">Lista de Espera</h1>
      <p className="page__subtitle">
        Clientes en espera de mesa disponible.
      </p>

      {isLoading && <p>Cargando...</p>}
      {isError && (
        <p className="page__error">Error al cargar la lista de espera.</p>
      )}

      <ListaEsperaTablePlaceholder data={data ?? []} />
    </section>
  );
};
