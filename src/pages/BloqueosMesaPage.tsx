import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import {
  BloqueoMesaFormModal,
  BloqueoMesaTablePlaceholder,
  useGetBloqueosMesa,
} from "@/features/bloqueos-mesa";
import type { BloqueoMesa } from "@/features/bloqueos-mesa/types/bloqueoMesaType";
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

/** Vista del modulo Bloqueos de Mesa. */
export const BloqueosMesaPage = () => {
  const { data, isLoading, isError } = useGetBloqueosMesa();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BloqueoMesa | null>(null);

  const filteredData = useMemo(
    () => filterBySearch(data ?? [], search, ["motivo", "mesaId"]),
    [data, search],
  );

  const openCreate = () => {
    setSelectedItem(null);
    setModalOpen(true);
  };

  const openEdit = (item: BloqueoMesa) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleDelete = (item: BloqueoMesa) => {
    window.confirm(`¿Eliminar el bloqueo #${item.id}?`);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <section>
      <PageHeader
        title="Bloqueos de mesa"
        subtitle="Bloqueos temporales por mantenimiento o eventos."
        actions={
          <Button variant="primary" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Nuevo bloqueo
          </Button>
        }
      />

      <MockDataBanner entityName="Bloqueos de mesa" />

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
            searchPlaceholder="Buscar por motivo o mesa..."
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
      />
    </section>
  );
};
