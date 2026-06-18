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
  PageHeader,
} from "@/shared/components/feedback";
import { PageSectionCard } from "@/shared/components/layout/PageSectionCard";
import { TableToolbar } from "@/shared/components/layout/TableToolbar";
import { Button } from "@/shared/components/ui/Button";
import { getApiErrorMessage } from "@/shared/utils/apiError";
import { filterBySearch } from "@/shared/utils/filterBySearch";
import { useConfirmDialog } from "@/shared/hooks/useConfirmDialog";

/** Vista del modulo Clientes con CRUD completo. */
export const ClientesPage = () => {
  const { data, isLoading, isError } = useGetClientes();
  const createMutation = useCreateCliente();
  const updateMutation = useUpdateCliente();
  const deleteMutation = useDeleteCliente();
  const { confirm, confirmDialog } = useConfirmDialog();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Cliente | null>(null);

  const filteredData = useMemo(
    () =>
      filterBySearch(data ?? [], search, [
        "nombre",
        "apellido",
        "telefono",
        "cedula",
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

  const openEdit = (item: Cliente) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleDelete = (item: Cliente) => {
    confirm({
      title: "Eliminar cliente",
      message: `¿Eliminar al cliente "${item.nombre}"? Esta acción no se puede deshacer.`,
      onConfirm: () => deleteMutation.mutate(item.id),
    });
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
      {confirmDialog}
      <PageHeader
        title="Clientes"
        subtitle="Administra la información de los comensales y su historial en el restaurante."
        actions={
          <Button variant="primary" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Nuevo cliente
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
          description="Nombre, apellido, telefono y cedula del cliente."
        >
          <TableToolbar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Buscar por nombre, apellido, telefono o cedula..."
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
