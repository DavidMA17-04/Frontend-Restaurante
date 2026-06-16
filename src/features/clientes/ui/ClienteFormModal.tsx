import { useEffect, useState, type FormEvent } from "react";
import { FormInput } from "@/shared/components/forms";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import type { ClienteCreateInput } from "../types/clienteType";
import type { Cliente } from "../types/clienteType";

interface ClienteFormModalProps {
  open: boolean;
  item: Cliente | null;
  onClose: () => void;
  onSubmit: (data: ClienteCreateInput) => void;
  isSubmitting?: boolean;
}

const emptyForm: ClienteCreateInput = {
  nombre: "",
  email: "",
  telefono: "",
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
        email: item.email,
        telefono: item.telefono,
      });
    } else {
      setForm(emptyForm);
    }
  }, [item, open]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!form.nombre.trim()) {
      return;
    }

    onSubmit({
      nombre: form.nombre.trim(),
      email: form.email.trim(),
      telefono: form.telefono.trim(),
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
          id="cliente-email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <FormInput
          id="cliente-telefono"
          label="Telefono"
          value={form.telefono}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, telefono: event.target.value }))
          }
        />
      </form>
    </Modal>
  );
};
