import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import {
  useCreateZona,
  useDeleteZona,
  useGetZonas,
  useUpdateZona,
  ZonaFormModal,
  ZonaTablePlaceholder,
} from "@/features/zonas";
import type { Zona, ZonaCreateInput } from "@/features/zonas/types/zonaType";
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

/** Vista del modulo Zonas con CRUD completo. */
export const ZonasPage = () => {
  const { data, isLoading, isError } = useGetZonas();
  const createMutation = useCreateZona();
  const updateMutation = useUpdateZona();
  const deleteMutation = useDeleteZona();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Zona | null>(null);

  const filteredData = useMemo(
    () => filterBySearch(data ?? [], search, ["nombre", "descripcion"]),
    [data, search],
  );

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const mutationError =
    createMutation.error ?? updateMutation.error ?? deleteMutation.error;

  const openCreate = () => {
    setSelectedItem(null);
    setModalOpen(true);
  };

  const openEdit = (item: Zona) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleDelete = (item: Zona) => {
    if (!window.confirm(`¿Eliminar la zona "${item.nombre}"?`)) {
      return;
    }

    deleteMutation.mutate(item.id);
  };

  const handleFormSubmit = async (payload: ZonaCreateInput) => {
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
        title="Zonas"
        subtitle="Areas del restaurante (terraza, salon, etc.)."
        actions={
          <Button variant="primary" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Nueva zona
          </Button>
        }
      />

      <MockDataBanner entityName="Zonas" />

      {mutationError && (
        <AlertMessage
          variant="error"
          title="Error en la operacion"
          message={getMutationErrorMessage(mutationError)}
          className="mb-6"
        />
      )}

      {isLoading && <Loader label="Cargando zonas..." />}
      {isError && (
        <AlertMessage
          variant="error"
          message="Error al cargar zonas."
          className="mb-6"
        />
      )}

      {!isLoading && !isError && (
        <PageSectionCard title="Listado de zonas">
          <TableToolbar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Buscar por nombre o descripcion..."
          />
          <ZonaTablePlaceholder
            data={filteredData}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        </PageSectionCard>
      )}

      <ZonaFormModal
        open={modalOpen}
        item={selectedItem}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        isSubmitting={isSaving}
      />
    </section>
  );
};
