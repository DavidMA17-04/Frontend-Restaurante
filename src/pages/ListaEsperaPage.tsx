import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import {
  ListaEsperaFormModal,
  ListaEsperaTablePlaceholder,
  useGetListaEspera,
} from "@/features/lista-espera";
import type { ListaEspera } from "@/features/lista-espera/types/listaEsperaType";
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

/** Vista del modulo Lista de Espera. */
export const ListaEsperaPage = () => {
  const { data, isLoading, isError } = useGetListaEspera();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ListaEspera | null>(null);

  const filteredData = useMemo(
    () => filterBySearch(data ?? [], search, ["estado", "clienteId"]),
    [data, search],
  );

  const openCreate = () => {
    setSelectedItem(null);
    setModalOpen(true);
  };

  const openEdit = (item: ListaEspera) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleDelete = (item: ListaEspera) => {
    window.confirm(`¿Eliminar la entrada #${item.id}?`);
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

      <MockDataBanner entityName="Lista de espera" />

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
            searchPlaceholder="Buscar por estado o cliente..."
          />
          <ListaEsperaTablePlaceholder
            data={filteredData}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        </PageSectionCard>
      )}

      <ListaEsperaFormModal
        open={modalOpen}
        item={selectedItem}
        onClose={closeModal}
      />
    </section>
  );
};
