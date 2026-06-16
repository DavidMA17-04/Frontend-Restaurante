import { ClienteTablePlaceholder, useGetClientes } from "@/features/clientes";

/**
 * Vista del modulo Clientes. Orquesta el hook de datos y el componente
 * de negocio; no contiene logica de acceso a datos directa.
 */
export const ClientesPage = () => {
  const { data, isLoading, isError } = useGetClientes();

  return (
    <section className="page">
      <h1 className="page__title">Clientes</h1>
      <p className="page__subtitle">
        Listado de clientes del restaurante.
      </p>

      {isLoading && <p>Cargando...</p>}
      {isError && <p className="page__error">Error al cargar clientes.</p>}

      <ClienteTablePlaceholder data={data ?? []} />
    </section>
  );
};
