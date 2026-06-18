import { useEffect, useState, type FormEvent } from "react";
import { FormInput } from "@/shared/components/forms";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import type { Cliente, ClienteCreateInput } from "../types/clienteType";

interface ClienteFormModalProps {
  open: boolean;
  item: Cliente | null;
  onClose: () => void;
  onSubmit: (data: ClienteCreateInput) => void;
  isSubmitting?: boolean;
}

const emptyForm = {
  nombre: "",
  apellido: "",
  telefono: "",
  cedula: "",
};

/** Modal de crear/editar cliente. */
export const ClienteFormModal = ({
  open,
  item,
  onClose,
  onSubmit,
  isSubmitting = false,
}: ClienteFormModalProps) => {
  const isEditing = item !== null;
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (item) {
      setForm({
        nombre: item.nombre,
        apellido: item.apellido,
        telefono: String(item.telefono),
        cedula: String(item.cedula),
      });
    } else {
      setForm(emptyForm);
    }
  }, [item, open]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const telefono = Number(form.telefono);
    const cedula = Number(form.cedula);

    if (!form.nombre.trim() || !form.apellido.trim() || !telefono || !cedula) {
      return;
    }

    onSubmit({
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      telefono,
      cedula,
    });
  };

  return (
    <Modal
      open={open}
      title={isEditing ? "Editar cliente" : "Nuevo cliente"}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" form="cliente-form" disabled={isSubmitting}>
            {isSubmitting
              ? "Guardando..."
              : isEditing
                ? "Guardar cambios"
                : "Crear cliente"}
          </Button>
        </>
      }
    >
      <form id="cliente-form" onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="cliente-nombre"
          label="Nombre"
          value={form.nombre}
          required
          onChange={(event) =>
            setForm((prev) => ({ ...prev, nombre: event.target.value }))
          }
        />
        <FormInput
          id="cliente-apellido"
          label="Apellido"
          value={form.apellido}
          required
          onChange={(event) =>
            setForm((prev) => ({ ...prev, apellido: event.target.value }))
          }
        />
        <FormInput
          id="cliente-telefono"
          label="Telefono"
          type="number"
          value={form.telefono}
          required
          onChange={(event) =>
            setForm((prev) => ({ ...prev, telefono: event.target.value }))
          }
        />
        <FormInput
          id="cliente-cedula"
          label="Cedula"
          type="number"
          value={form.cedula}
          required
          onChange={(event) =>
            setForm((prev) => ({ ...prev, cedula: event.target.value }))
          }
        />
      </form>
    </Modal>
  );
};
