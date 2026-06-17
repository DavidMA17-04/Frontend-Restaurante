import { useEffect, useState, type FormEvent } from "react";
import { FormInput } from "@/shared/components/forms";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import type { Mesa, MesaCreateInput } from "../types/mesaType";

interface MesaFormModalProps {
  open: boolean;
  item: Mesa | null;
  onClose: () => void;
  onSubmit: (data: MesaCreateInput) => void;
  isSubmitting?: boolean;
}

const emptyForm = {
  numero: "",
  capacidad: "",
  zonaId: "1",
};

/** Modal de crear/editar mesa. */
export const MesaFormModal = ({
  open,
  item,
  onClose,
  onSubmit,
  isSubmitting = false,
}: MesaFormModalProps) => {
  const isEditing = item !== null;
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (item) {
      setForm({
        numero: String(item.numero),
        capacidad: String(item.capacidad),
        zonaId: String(item.zonaId),
      });
    } else {
      setForm(emptyForm);
    }
  }, [item, open]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const numero = Number(form.numero);
    const capacidad = Number(form.capacidad);
    const zonaId = Number(form.zonaId);

    if (!numero || !capacidad || !zonaId) {
      return;
    }

    onSubmit({ numero, capacidad, zonaId });
  };

  return (
    <Modal
      open={open}
      title={isEditing ? "Editar mesa" : "Nueva mesa"}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" form="mesa-form" disabled={isSubmitting}>
            {isSubmitting
              ? "Guardando..."
              : isEditing
                ? "Guardar cambios"
                : "Crear mesa"}
          </Button>
        </>
      }
    >
      <form id="mesa-form" onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="mesa-numero"
          label="Numero"
          type="number"
          min={1}
          required
          value={form.numero}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, numero: event.target.value }))
          }
        />
        <FormInput
          id="mesa-capacidad"
          label="Capacidad"
          type="number"
          min={1}
          required
          value={form.capacidad}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, capacidad: event.target.value }))
          }
        />
        <FormInput
          id="mesa-zona"
          label="Zona ID"
          type="number"
          min={1}
          required
          value={form.zonaId}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, zonaId: event.target.value }))
          }
        />
      </form>
    </Modal>
  );
};
