import { Plus } from "lucide-react";
import { ClienteTablePlaceholder, useGetClientes } from "@/features/clientes";
import {
  AlertMessage,
  Loader,
  PageHeader,
} from "@/shared/components/feedback";
import { Button } from "@/shared/components/ui/Index";
import { Card } from "@/shared/components/ui/Card";

/**
 * Vista demo del modulo Clientes con diseno pulido.
 * Mantiene la arquitectura: page -> hook -> componente de negocio.
 */
export const ClientesPage = () => {
  const { data, isLoading, isError } = useGetClientes();

  return (
    <section>
      <PageHeader
        title="Clientes"
        subtitle="Listado de clientes del restaurante. Esta vista servira como referencia visual e integracion futura con el backend."
        actions={
          <Button variant="primary" disabled>
            <Plus className="h-4 w-4" />
            Nuevo cliente
          </Button>
        }
      />

      <AlertMessage
        variant="info"
        title="Integracion pendiente"
        message="Los datos aun no se cargan desde la API. Cuando conectes el backend, activa el hook useGetClientes y este listado mostrara registros reales."
        className="mb-6"
      />

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
        <Card className="p-0 overflow-hidden">
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-sm font-semibold text-slate-900">
              Listado de clientes
            </h2>
            <p className="mt-1 text-sm text-muted">
              Vista preparada para mostrar nombre, email y telefono.
            </p>
          </div>
          <div className="p-6">
            <ClienteTablePlaceholder data={data ?? []} />
          </div>
        </Card>
      )}
    </section>
  );
};
