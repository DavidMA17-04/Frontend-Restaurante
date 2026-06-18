import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import {
  BloqueoMesaFormModal,
  BloqueoMesaTablePlaceholder,
  useCreateBloqueoMesa,
  useDeleteBloqueoMesa,
  useGetBloqueosMesa,
  useUpdateBloqueoMesa,
} from "@/features/bloqueos-mesa";
import type {
  BloqueoMesa,
  BloqueoMesaCreateInput,
} from "@/features/bloqueos-mesa/types/bloqueoMesaType";
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
import { useConfirmDialog } from "@/shared/hooks/useConfirmDialog";

/** Vista del modulo Bloqueos de Mesa con CRUD alineado al backend. */
export const BloqueosMesaPage = () => {
  const { data, isLoading, isError } = useGetBloqueosMesa();
  const createMutation = useCreateBloqueoMesa();
  const updateMutation = useUpdateBloqueoMesa();
  const deleteMutation = useDeleteBloqueoMesa();
  const { confirm, confirmDialog } = useConfirmDialog();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BloqueoMesa | null>(null);

  const filteredData = useMemo(
    () => filterBySearch(data ?? [], search, ["motivo", "mesaId", "fecha"]),
    [data, search],
  );

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const mutationError =
    createMutation.error ?? updateMutation.error ?? deleteMutation.error;

  const openCreate = () => {
    setSelectedItem(null);
    setModalOpen(true);
  };

  const openEdit = (item: BloqueoMesa) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleDelete = (item: BloqueoMesa) => {
    confirm({
      title: "Desbloquear mesa",
      message: `¿Desbloquear la mesa #${item.mesaId}? Se eliminarán sus bloqueos registrados.`,
      confirmLabel: "Desbloquear",
      onConfirm: () => deleteMutation.mutate(item.mesaId),
    });
  };

  const handleFormSubmit = async (payload: BloqueoMesaCreateInput) => {
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
      {confirmDialog}
      <PageHeader
        title="Bloqueos de mesa"
        subtitle="Registra mesas fuera de servicio por mantenimiento, eventos o cierres temporales."
        actions={
          <Button variant="primary" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Nuevo bloqueo
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

      {isLoading && <Loader label="Cargando bloqueos..." />}
      {isError && (
        <AlertMessage
          variant="error"
          message="Error al cargar bloqueos."
          className="mb-6"
        />
      )}

      {!isLoading && !isError && (
        <PageSectionCard title="Listado de bloqueos">
          <TableToolbar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Buscar por motivo, mesa o fecha..."
          />
          <BloqueoMesaTablePlaceholder
            data={filteredData}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        </PageSectionCard>
      )}

      <BloqueoMesaFormModal
        open={modalOpen}
        item={selectedItem}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        isSubmitting={isSaving}
      />
    </section>
  );
};
