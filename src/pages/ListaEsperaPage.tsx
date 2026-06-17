import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import {
  ListaEsperaFormModal,
  ListaEsperaTablePlaceholder,
  useCreateListaEspera,
  useGetListaEspera,
  usePromoverListaEspera,
  useUpdateListaEspera,
} from "@/features/lista-espera";
import type {
  ListaEspera,
  ListaEsperaCreateInput,
} from "@/features/lista-espera/types/listaEsperaType";
import {
  AlertMessage,
  Loader,
  PageHeader,
} from "@/shared/components/feedback";
import { PageSectionCard } from "@/shared/components/layout/PageSectionCard";
import { TableToolbar } from "@/shared/components/layout/TableToolbar";
import { Button } from "@/shared/components/ui/Button";
import { getApiErrorMessage } from "@/shared/utils/apiError";
import { filterBySearch } from "@/shared/utils/filterBySearch";

/** Vista del modulo Lista de Espera alineada al backend. */
export const ListaEsperaPage = () => {
  const { data, isLoading, isError } = useGetListaEspera();
  const createMutation = useCreateListaEspera();
  const updateMutation = useUpdateListaEspera();
  const promoverMutation = usePromoverListaEspera();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ListaEspera | null>(null);

  const filteredData = useMemo(
    () => filterBySearch(data ?? [], search, ["clienteId", "fecha", "cantidad"]),
    [data, search],
  );

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const mutationError =
    createMutation.error ?? updateMutation.error ?? promoverMutation.error;

  const openCreate = () => {
    setSelectedItem(null);
    setModalOpen(true);
  };

  const openEdit = (item: ListaEspera) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handlePromover = (item: ListaEspera) => {
    const mesaId = window.prompt(
      `Ingresa el ID de la mesa para promover la entrada #${item.id}:`,
    );

    if (!mesaId) {
      return;
    }

    promoverMutation.mutate({
      listaEsperaId: item.id,
      mesaId: Number(mesaId),
    });
  };

  const handleFormSubmit = async (payload: ListaEsperaCreateInput) => {
    try {
      if (selectedItem) {
        await updateMutation.mutateAsync({
          id: selectedItem.id,
          data: payload,
        });
      } else {
        await createMutation.mutateAsync(payload);
      }

      closeModal();
    } catch {
      // El error se muestra via mutationError en la UI.
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <section>
      <PageHeader
        title="Lista de espera"
        subtitle="Clientes en espera de mesa disponible."
        actions={
          <Button variant="primary" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Nueva entrada
          </Button>
        }
      />

      {mutationError && (
        <AlertMessage
          variant="error"
          title="Error en la operacion"
          message={getApiErrorMessage(mutationError)}
          className="mb-6"
        />
      )}

      {isLoading && <Loader label="Cargando lista de espera..." />}
      {isError && (
        <AlertMessage
          variant="error"
          message="Error al cargar lista de espera."
          className="mb-6"
        />
      )}

      {!isLoading && !isError && (
        <PageSectionCard title="Listado de espera">
          <TableToolbar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Buscar por cliente, fecha o cantidad..."
          />
          <ListaEsperaTablePlaceholder
            data={filteredData}
            onEdit={openEdit}
            onPromover={handlePromover}
          />
        </PageSectionCard>
      )}

      <ListaEsperaFormModal
        open={modalOpen}
        item={selectedItem}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        isSubmitting={isSaving}
      />
    </section>
  );
};
