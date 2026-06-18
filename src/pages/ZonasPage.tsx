import { LayoutGrid, Plus, Table2 } from "lucide-react";
import { useMemo, useState } from "react";
import {
  useCreateZona,
  useDeleteZona,
  useGetZonas,
  useUpdateZona,
  ZonaFormModal,
  ZonaMapView,
  ZonaTablePlaceholder,
} from "@/features/zonas";
import type { Zona, ZonaCreateInput } from "@/features/zonas/types/zonaType";
import {
  AlertMessage,
  Loader,
  PageHeader,
} from "@/shared/components/feedback";
import { PageSectionCard } from "@/shared/components/layout/PageSectionCard";
import { TableToolbar } from "@/shared/components/layout/TableToolbar";
import { Button } from "@/shared/components/ui/Button";
import { getApiErrorMessage } from "@/shared/utils/apiError";
import { cn } from "@/shared/utils/cn";
import { filterBySearch } from "@/shared/utils/filterBySearch";
import { useConfirmDialog } from "@/shared/hooks/useConfirmDialog";

type ViewMode = "listado" | "mapa";

/** Vista del modulo Zonas con CRUD completo y mapa interactivo. */
export const ZonasPage = () => {
  const { data, isLoading, isError } = useGetZonas();
  const createMutation = useCreateZona();
  const updateMutation = useUpdateZona();
  const deleteMutation = useDeleteZona();
  const { confirm, confirmDialog } = useConfirmDialog();

  const [viewMode, setViewMode] = useState<ViewMode>("listado");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Zona | null>(null);

  const filteredData = useMemo(
    () => filterBySearch(data ?? [], search, ["nombre"]),
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
    confirm({
      title: "Eliminar zona",
      message: `¿Eliminar la zona "${item.nombre}"? Esta acción no se puede deshacer.`,
      onConfirm: () => deleteMutation.mutate(item.id),
    });
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
      {confirmDialog}
      <PageHeader
        title="Zonas"
        subtitle="Organiza y consulta la distribución del salón: terraza, VIP, interior y más."
        actions={
          viewMode === "listado" ? (
            <Button variant="primary" onClick={openCreate}>
              <Plus className="h-4 w-4" />
              Nueva zona
            </Button>
          ) : undefined
        }
      />

      <div className="mb-6 flex gap-2 border-b border-border">
        <button
          type="button"
          className={cn(
            "flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
            viewMode === "listado"
              ? "border-brand-500 text-brand-600 dark:text-brand-500"
              : "border-transparent text-muted hover:text-foreground",
          )}
          onClick={() => setViewMode("listado")}
        >
          <Table2 className="h-4 w-4" />
          Listado
        </button>
        <button
          type="button"
          className={cn(
            "flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
            viewMode === "mapa"
              ? "border-brand-500 text-brand-600 dark:text-brand-500"
              : "border-transparent text-muted hover:text-foreground",
          )}
          onClick={() => setViewMode("mapa")}
        >
          <LayoutGrid className="h-4 w-4" />
          Mapa del salon
        </button>
      </div>

      {mutationError && viewMode === "listado" && (
        <AlertMessage
          variant="error"
          title="Error en la operacion"
          message={getApiErrorMessage(mutationError)}
          className="mb-6"
        />
      )}

      {viewMode === "mapa" && <ZonaMapView />}

      {viewMode === "listado" && (
        <>
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
                searchPlaceholder="Buscar por nombre..."
              />
              <ZonaTablePlaceholder
                data={filteredData}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            </PageSectionCard>
          )}
        </>
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
