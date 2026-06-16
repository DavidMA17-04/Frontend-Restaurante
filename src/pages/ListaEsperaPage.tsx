import {
  ListaEsperaTablePlaceholder,
  useGetListaEspera,
} from "@/features/lista-espera";
import {
  AlertMessage,
  Loader,
  PageHeader,
} from "@/shared/components/feedback";
import { Card } from "@/shared/components/ui/Card";

/** Vista del modulo Lista de Espera. */
export const ListaEsperaPage = () => {
  const { data, isLoading, isError } = useGetListaEspera();

  return (
    <section>
      <PageHeader
        title="Lista de Espera"
        subtitle="Clientes en espera de mesa disponible."
      />

      {isLoading && <Loader label="Cargando lista de espera..." />}
      {isError && (
        <AlertMessage
          variant="error"
          message="Error al cargar la lista de espera."
          className="mb-6"
        />
      )}

      {!isLoading && !isError && (
        <Card>
          <ListaEsperaTablePlaceholder data={data ?? []} />
        </Card>
      )}
    </section>
  );
};
