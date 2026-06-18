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
import { useGetZonas } from "@/features/zonas";
import {
  AlertMessage,
  Loader,
  PageHeader,
} from "@/shared/components/feedback";
import { PageSectionCard } from "@/shared/components/layout/PageSectionCard";
import { TableToolbar } from "@/shared/components/layout/TableToolbar";
import { Button } from "@/shared/components/ui/Button";
import { getApiErrorMessage } from "@/shared/utils/apiError";
import { useConfirmDialog } from "@/shared/hooks/useConfirmDialog";
/** Vista del modulo Mesas con CRUD completo. */
export const MesasPage = () => {
  const { data, isLoading, isError } = useGetMesas();
  const { data: zonas } = useGetZonas();
  const createMutation = useCreateMesa();
  const updateMutation = useUpdateMesa();
  const deleteMutation = useDeleteMesa();
  const { confirm, confirmDialog } = useConfirmDialog();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Mesa | null>(null);

  const filteredData = useMemo(() => {
    const items = data ?? [];
    const trimmed = search.trim().toLowerCase();

    if (!trimmed) {
      return items;
    }

    const zonasById = new Map(
      (zonas ?? []).map((zona) => [zona.id, zona.nombre.toLowerCase()]),
    );

    return items.filter(
      (mesa) =>
        String(mesa.numero).includes(trimmed) ||
        String(mesa.capacidad).includes(trimmed) ||
        String(mesa.zonaId).includes(trimmed) ||
        (zonasById.get(mesa.zonaId) ?? "").includes(trimmed),
    );
  }, [data, search, zonas]);

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
    confirm({
      title: "Eliminar mesa",
      message: `¿Eliminar la mesa #${item.numero}? También se eliminarán sus reservas y bloqueos asociados.`,
      onConfirm: () => deleteMutation.mutate(item.id),
    });
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
      {confirmDialog}
      <PageHeader
        title="Mesas"
        subtitle="Configura capacidad, número y zona de cada mesa del establecimiento."
        actions={
          <Button variant="primary" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Nueva mesa
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
            searchPlaceholder="Buscar por numero, capacidad o zona..."
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
