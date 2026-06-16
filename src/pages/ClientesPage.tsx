import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import {
  ClienteFormModal,
  ClienteTablePlaceholder,
  useCreateCliente,
  useDeleteCliente,
  useGetClientes,
  useUpdateCliente,
} from "@/features/clientes";
import type {
  Cliente,
  ClienteCreateInput,
} from "@/features/clientes/types/clienteType";
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

/** Vista del modulo Clientes con CRUD completo. */
export const ClientesPage = () => {
  const { data, isLoading, isError } = useGetClientes();
  const createMutation = useCreateCliente();
  const updateMutation = useUpdateCliente();
  const deleteMutation = useDeleteCliente();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Cliente | null>(null);

  const filteredData = useMemo(
    () =>
      filterBySearch(data ?? [], search, ["nombre", "email", "telefono"]),
    [data, search],
  );

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const mutationError =
    createMutation.error ?? updateMutation.error ?? deleteMutation.error;

  const openCreate = () => {
    setSelectedItem(null);
    setModalOpen(true);
  };

  const openEdit = (item: Cliente) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleDelete = (item: Cliente) => {
    if (!window.confirm(`¿Eliminar al cliente "${item.nombre}"?`)) {
      return;
    }

    deleteMutation.mutate(item.id);
  };

  const handleFormSubmit = async (payload: ClienteCreateInput) => {
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
        title="Clientes"
        subtitle="Listado de clientes del restaurante. CRUD funcional con datos mock o API segun VITE_USE_MOCK."
        actions={
          <Button variant="primary" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Nuevo cliente
          </Button>
        }
      />

      <MockDataBanner entityName="Clientes" />

      {mutationError && (
        <AlertMessage
          variant="error"
          title="Error en la operacion"
          message={getMutationErrorMessage(mutationError)}
          className="mb-6"
        />
      )}

      {isLoading && <Loader label="Cargando clientes..." />}

      {isError && (
        <AlertMessage
          variant="error"
          title="Error al cargar"
          message="No fue posible obtener los clientes desde el servidor."
          className="mb-6"
        />
      )}

      {!isLoading && !isError && (
        <PageSectionCard
          title="Listado de clientes"
          description="Vista preparada para mostrar nombre, email y telefono."
        >
          <TableToolbar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Buscar por nombre, email o telefono..."
          />
          <ClienteTablePlaceholder
            data={filteredData}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        </PageSectionCard>
      )}

      <ClienteFormModal
        open={modalOpen}
        item={selectedItem}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        isSubmitting={isSaving}
      />
    </section>
  );
};
