import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import {
  MesaFormModal,
  MesaTablePlaceholder,
  useCreateMesa,
  useDeleteMesa,
  useGetMesas,
  useUpdateMesa,
} from "@/features/mesas";
import type { Mesa, MesaCreateInput } from "@/features/mesas/types/mesaType";
import {
  AlertMessage,
  Loader,
  MockDataBanner,
  PageHeader,
} from "@/shared/components/feedback";
import { PageSectionCard } from "@/shared/components/layout/PageSectionCard";
import { TableToolbar } from "@/shared/components/layout/TableToolbar";
import { Button } from "@/shared/components/ui/Button";
import { filterBySearch } from "@/shared/utils/filterBySearch";

const getMutationErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Ocurrio un error inesperado.";

/** Vista del modulo Mesas con CRUD completo. */
export const MesasPage = () => {
  const { data, isLoading, isError } = useGetMesas();
  const createMutation = useCreateMesa();
  const updateMutation = useUpdateMesa();
  const deleteMutation = useDeleteMesa();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Mesa | null>(null);

  const filteredData = useMemo(
    () =>
      filterBySearch(data ?? [], search, ["numero", "capacidad", "estado"]),
    [data, search],
  );

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const mutationError =
    createMutation.error ?? updateMutation.error ?? deleteMutation.error;

  const openCreate = () => {
    setSelectedItem(null);
    setModalOpen(true);
  };

  const openEdit = (item: Mesa) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleDelete = (item: Mesa) => {
    if (!window.confirm(`¿Eliminar la mesa #${item.numero}?`)) {
      return;
    }

    deleteMutation.mutate(item.id);
  };

  const handleFormSubmit = async (payload: MesaCreateInput) => {
    try {
      if (selectedItem) {
        await updateMutation.mutateAsync({ id: selectedItem.id, data: payload });
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
        title="Mesas"
        subtitle="Listado de mesas del restaurante."
        actions={
          <Button variant="primary" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Nueva mesa
          </Button>
        }
      />

      <MockDataBanner entityName="Mesas" />

      {mutationError && (
        <AlertMessage
          variant="error"
          title="Error en la operacion"
          message={getMutationErrorMessage(mutationError)}
          className="mb-6"
        />
      )}

      {isLoading && <Loader label="Cargando mesas..." />}
      {isError && (
        <AlertMessage
          variant="error"
          message="Error al cargar mesas."
          className="mb-6"
        />
      )}

      {!isLoading && !isError && (
        <PageSectionCard title="Listado de mesas">
          <TableToolbar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Buscar por numero o estado..."
          />
          <MesaTablePlaceholder
            data={filteredData}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        </PageSectionCard>
      )}

      <MesaFormModal
        open={modalOpen}
        item={selectedItem}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        isSubmitting={isSaving}
      />
    </section>
  );
};
