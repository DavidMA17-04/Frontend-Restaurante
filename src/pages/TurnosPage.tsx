import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import {
  TurnoFormModal,
  TurnoTablePlaceholder,
  useGetTurnos,
} from "@/features/turnos";
import type { Turno } from "@/features/turnos/types/turnoType";
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

/** Vista del modulo Turnos. */
export const TurnosPage = () => {
  const { data, isLoading, isError } = useGetTurnos();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Turno | null>(null);

  const filteredData = useMemo(
    () => filterBySearch(data ?? [], search, ["nombre", "horaInicio", "horaFin"]),
    [data, search],
  );

  const openCreate = () => {
    setSelectedItem(null);
    setModalOpen(true);
  };

  const openEdit = (item: Turno) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleDelete = (item: Turno) => {
    window.confirm(`¿Eliminar el turno "${item.nombre}"?`);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <section>
      <PageHeader
        title="Turnos"
        subtitle="Horarios de trabajo del personal."
        actions={
          <Button variant="primary" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Nuevo turno
          </Button>
        }
      />

      <MockDataBanner entityName="Turnos" />

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

      <TurnoFormModal open={modalOpen} item={selectedItem} onClose={closeModal} />
    </section>
  );
};
