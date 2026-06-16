import { useEffect, useState, type FormEvent } from "react";
import { FormInput } from "@/shared/components/forms";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import type { BloqueoMesa } from "../types/bloqueoMesaType";

interface BloqueoMesaFormModalProps {
  open: boolean;
  item: BloqueoMesa | null;
  onClose: () => void;
}

const emptyForm = {
  mesaId: "",
  fechaInicio: "",
  fechaFin: "",
  motivo: "",
};

/** Modal de crear/editar bloqueo de mesa (solo UI). */
export const BloqueoMesaFormModal = ({
  open,
  item,
  onClose,
}: BloqueoMesaFormModalProps) => {
  const isEditing = item !== null;
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (item) {
      setForm({
        mesaId: String(item.mesaId),
        fechaInicio: item.fechaInicio.slice(0, 16),
        fechaFin: item.fechaFin.slice(0, 16),
        motivo: item.motivo,
      });
    } else {
      setForm(emptyForm);
    }
  }, [item, open]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Modal
      open={open}
      title={isEditing ? "Editar bloqueo" : "Nuevo bloqueo de mesa"}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" form="bloqueo-form">
            {isEditing ? "Guardar cambios" : "Crear bloqueo"}
          </Button>
        </>
      }
    >
      <form id="bloqueo-form" onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="bloqueo-mesa"
          label="Mesa ID"
          type="number"
          value={form.mesaId}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, mesaId: event.target.value }))
          }
        />
        <FormInput
          id="bloqueo-inicio"
          label="Fecha inicio"
          type="datetime-local"
          value={form.fechaInicio}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, fechaInicio: event.target.value }))
          }
        />
        <FormInput
          id="bloqueo-fin"
          label="Fecha fin"
          type="datetime-local"
          value={form.fechaFin}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, fechaFin: event.target.value }))
          }
        />
        <FormInput
          id="bloqueo-motivo"
          label="Motivo"
          value={form.motivo}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, motivo: event.target.value }))
          }
        />
      </form>
    </Modal>
  );
};
