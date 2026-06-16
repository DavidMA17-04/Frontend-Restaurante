import { useEffect, useState, type FormEvent } from "react";
import { FormInput } from "@/shared/components/forms";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import type { Zona, ZonaCreateInput } from "../types/zonaType";

interface ZonaFormModalProps {
  open: boolean;
  item: Zona | null;
  onClose: () => void;
  onSubmit: (data: ZonaCreateInput) => void;
  isSubmitting?: boolean;
}

const emptyForm: ZonaCreateInput = {
  nombre: "",
  descripcion: "",
};

/** Modal de crear/editar zona. */
export const ZonaFormModal = ({
  open,
  item,
  onClose,
  onSubmit,
  isSubmitting = false,
}: ZonaFormModalProps) => {
  const isEditing = item !== null;
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (item) {
      setForm({
        nombre: item.nombre,
        descripcion: item.descripcion,
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
      descripcion: form.descripcion.trim(),
    });
  };

  return (
    <Modal
      open={open}
      title={isEditing ? "Editar zona" : "Nueva zona"}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" form="zona-form" disabled={isSubmitting}>
            {isSubmitting
              ? "Guardando..."
              : isEditing
                ? "Guardar cambios"
                : "Crear zona"}
          </Button>
        </>
      }
    >
      <form id="zona-form" onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="zona-nombre"
          label="Nombre"
          value={form.nombre}
          required
          onChange={(event) =>
            setForm((prev) => ({ ...prev, nombre: event.target.value }))
          }
        />
        <FormInput
          id="zona-descripcion"
          label="Descripcion"
          value={form.descripcion}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, descripcion: event.target.value }))
          }
        />
      </form>
    </Modal>
  );
};
