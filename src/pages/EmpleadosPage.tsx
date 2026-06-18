import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import {
  EmpleadoFormModal,
  EmpleadoTablePlaceholder,
  useCreateEmpleado,
  useDeleteEmpleado,
  useGetEmpleados,
  useUpdateEmpleado,
} from "@/features/empleados";
import type {
  Empleado,
  EmpleadoCreateInput,
} from "@/features/empleados/types/empleadoType";
import {
  AlertMessage,
  Loader,
  PageHeader,
} from "@/shared/components/feedback";
import { PageSectionCard } from "@/shared/components/layout/PageSectionCard";
import { TableToolbar } from "@/shared/components/layout/TableToolbar";
import { Button } from "@/shared/components/ui/Button";
import { env } from "@/config/env";
import { getApiErrorMessage } from "@/shared/utils/apiError";
import { filterBySearch } from "@/shared/utils/filterBySearch";

export const EmpleadosPage = () => {
  const { data, isLoading, isError } = useGetEmpleados();
  const createMutation = useCreateEmpleado();
  const updateMutation = useUpdateEmpleado();
  const deleteMutation = useDeleteEmpleado();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Empleado | null>(null);

  const filteredData = useMemo(
    () => filterBySearch(data ?? [], search, ["nombre", "rol"]),
    [data, search],
  );

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const mutationError =
    createMutation.error ?? updateMutation.error ?? deleteMutation.error;

  const openCreate = () => {
    setSelectedItem(null);
    setModalOpen(true);
  };

  const openEdit = (item: Empleado) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleDelete = (item: Empleado) => {
    if (!window.confirm(`¿Eliminar al empleado "${item.nombre}"?`)) {
      return;
    }

    deleteMutation.mutate(item.id);
  };

  const handleFormSubmit = async (payload: EmpleadoCreateInput) => {
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
        title="Empleados"
        subtitle="Listado del personal del restaurante."
        actions={
          <Button variant="primary" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Nuevo empleado
          </Button>
        }
      />

      {!env.useMock && (
        <AlertMessage
          variant="info"
          title="Modulo no disponible"
          message="Empleados no existe en RestauranteAPI. Activa VITE_USE_MOCK=true para usar datos de demostracion."
          className="mb-6"
        />
      )}

      {mutationError && (
        <AlertMessage
          variant="error"
          title="Error en la operacion"
          message={getApiErrorMessage(mutationError)}
          className="mb-6"
        />
      )}

      {isLoading && <Loader label="Cargando empleados..." />}
      {isError && (
        <AlertMessage
          variant="error"
          message="Error al cargar empleados."
          className="mb-6"
        />
      )}

      {!isLoading && !isError && (
        <PageSectionCard title="Listado de empleados">
          <TableToolbar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Buscar por nombre o rol..."
          />
          <EmpleadoTablePlaceholder
            data={filteredData}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        </PageSectionCard>
      )}

      <EmpleadoFormModal
        open={modalOpen}
        item={selectedItem}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        isSubmitting={isSaving}
      />
    </section>
  );
};
