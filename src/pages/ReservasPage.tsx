import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import {
  ReservaFormModal,
  ReservaTablePlaceholder,
  useCreateReserva,
  useDeleteReserva,
  useGetReservas,
  useUpdateReserva,
} from "@/features/reservas";
import type {
  Reserva,
  ReservaCreateInput,
} from "@/features/reservas/types/reservaType";
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

/** Vista del modulo Reservas con CRUD completo. */
export const ReservasPage = () => {
  const { data, isLoading, isError } = useGetReservas();
  const createMutation = useCreateReserva();
  const updateMutation = useUpdateReserva();
  const deleteMutation = useDeleteReserva();
  const { confirm, confirmDialog } = useConfirmDialog();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Reserva | null>(null);

  const filteredData = useMemo(
    () =>
      filterBySearch(data ?? [], search, [
        "estado",
        "clienteId",
        "mesaId",
        "fecha",
      ]),
    [data, search],
  );

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const mutationError =
    createMutation.error ?? updateMutation.error ?? deleteMutation.error;

  const openCreate = () => {
    setSelectedItem(null);
    setModalOpen(true);
  };

  const openEdit = (item: Reserva) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleDelete = (item: Reserva) => {
    confirm({
      title: "Eliminar reserva",
      message: `¿Eliminar la reserva #${item.id}? Esta acción no se puede deshacer.`,
      onConfirm: () => deleteMutation.mutate(item.id),
    });
  };

  const handleFormSubmit = async (payload: ReservaCreateInput) => {
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
      {confirmDialog}
      <PageHeader
        title="Reservas"
        subtitle="Planifica y da seguimiento a las reservaciones del día y próximos turnos."
        actions={
          <Button variant="primary" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Nueva reserva
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

      {isLoading && <Loader label="Cargando reservas..." />}
      {isError && (
        <AlertMessage
          variant="error"
          message="Error al cargar reservas."
          className="mb-6"
        />
      )}

      {!isLoading && !isError && (
        <PageSectionCard title="Listado de reservas">
          <TableToolbar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Buscar por estado, cliente, mesa o fecha..."
          />
          <ReservaTablePlaceholder
            data={filteredData}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        </PageSectionCard>
      )}

      <ReservaFormModal
        open={modalOpen}
        item={selectedItem}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        isSubmitting={isSaving}
      />
    </section>
  );
};
