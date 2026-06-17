import { useEffect, useState, type FormEvent } from "react";
import { FormInput, FormSelect } from "@/shared/components/forms";
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

const emptyForm = {
  nombre: "",
  disponibilidad: "true",
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
        disponibilidad: String(item.disponibilidad),
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
      disponibilidad: form.disponibilidad === "true",
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
        <FormSelect
          id="zona-disponibilidad"
          label="Disponibilidad"
          value={form.disponibilidad}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, disponibilidad: event.target.value }))
          }
          options={[
            { value: "true", label: "Disponible" },
            { value: "false", label: "No disponible" },
          ]}
        />
      </form>
    </Modal>
  );
};
