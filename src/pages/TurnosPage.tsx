import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import {
  TurnoFormModal,
  TurnoTablePlaceholder,
  useCreateTurno,
  useDeleteTurno,
  useGetTurnos,
  useUpdateTurno,
} from "@/features/turnos";
import type { Turno, TurnoCreateInput } from "@/features/turnos/types/turnoType";
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

/** Vista del modulo Turnos con CRUD completo. */
export const TurnosPage = () => {
  const { data, isLoading, isError } = useGetTurnos();
  const createMutation = useCreateTurno();
  const updateMutation = useUpdateTurno();
  const deleteMutation = useDeleteTurno();
  const { confirm, confirmDialog } = useConfirmDialog();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Turno | null>(null);

  const filteredData = useMemo(
    () => filterBySearch(data ?? [], search, ["nombre", "horaInicio", "horaFin"]),
    [data, search],
  );

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const mutationError =
    createMutation.error ?? updateMutation.error ?? deleteMutation.error;

  const openCreate = () => {
    setSelectedItem(null);
    setModalOpen(true);
  };

  const openEdit = (item: Turno) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleDelete = (item: Turno) => {
    confirm({
      title: "Eliminar turno",
      message: `¿Eliminar el turno "${item.nombre}"? Esta acción no se puede deshacer.`,
      onConfirm: () => deleteMutation.mutate(item.id),
    });
  };

  const handleFormSubmit = async (payload: TurnoCreateInput) => {
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
        title="Turnos"
        subtitle="Define los horarios de servicio y la disponibilidad del equipo."
        actions={
          <Button variant="primary" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Nuevo turno
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

      {isLoading && <Loader label="Cargando turnos..." />}
      {isError && (
        <AlertMessage
          variant="error"
          message="Error al cargar turnos."
          className="mb-6"
        />
      )}

      {!isLoading && !isError && (
        <PageSectionCard title="Listado de turnos">
          <TableToolbar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Buscar por nombre u horario..."
          />
          <TurnoTablePlaceholder
            data={filteredData}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        </PageSectionCard>
      )}

      <TurnoFormModal
        open={modalOpen}
        item={selectedItem}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        isSubmitting={isSaving}
      />
    </section>
  );
};
