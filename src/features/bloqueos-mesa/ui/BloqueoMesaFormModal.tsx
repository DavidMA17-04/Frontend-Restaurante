import { useEffect, useState, type FormEvent } from "react";
import { FormInput } from "@/shared/components/forms";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import type { BloqueoMesa, BloqueoMesaCreateInput } from "../types/bloqueoMesaType";

interface BloqueoMesaFormModalProps {
  open: boolean;
  item: BloqueoMesa | null;
  onClose: () => void;
  onSubmit: (data: BloqueoMesaCreateInput) => void;
  isSubmitting?: boolean;
}

const emptyForm = {
  mesaId: "",
  fecha: "",
  horaInicio: "",
  horaFin: "",
  motivo: "",
};

const toApiTime = (time: string) =>
  time.length === 5 ? `${time}:00` : time;

const fromApiTime = (time: string) => time.slice(0, 5);

/** Modal de crear/editar bloqueo de mesa. */
export const BloqueoMesaFormModal = ({
  open,
  item,
  onClose,
  onSubmit,
  isSubmitting = false,
}: BloqueoMesaFormModalProps) => {
  const isEditing = item !== null;
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (item) {
      setForm({
        mesaId: String(item.mesaId),
        fecha: item.fecha,
        horaInicio: fromApiTime(item.horaInicio),
        horaFin: fromApiTime(item.horaFin),
        motivo: item.motivo,
      });
    } else {
      setForm(emptyForm);
    }
  }, [item, open]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const mesaId = Number(form.mesaId);

    if (
      !mesaId ||
      !form.fecha ||
      !form.horaInicio ||
      !form.horaFin ||
      !form.motivo.trim()
    ) {
      return;
    }

    onSubmit({
      mesaId,
      fecha: form.fecha,
      horaInicio: toApiTime(form.horaInicio),
      horaFin: toApiTime(form.horaFin),
      motivo: form.motivo.trim(),
    });
  };

  return (
    <Modal
      open={open}
      title={isEditing ? "Editar bloqueo" : "Nuevo bloqueo de mesa"}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" form="bloqueo-form" disabled={isSubmitting}>
            {isSubmitting
              ? "Guardando..."
              : isEditing
                ? "Guardar cambios"
                : "Crear bloqueo"}
          </Button>
        </>
      }
    >
      <form id="bloqueo-form" onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="bloqueo-mesa"
          label="Mesa ID"
          type="number"
          min={1}
          required
          value={form.mesaId}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, mesaId: event.target.value }))
          }
        />
        <FormInput
          id="bloqueo-fecha"
          label="Fecha"
          type="date"
          required
          value={form.fecha}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, fecha: event.target.value }))
          }
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <FormInput
            id="bloqueo-inicio"
            label="Hora inicio"
            type="time"
            required
            value={form.horaInicio}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, horaInicio: event.target.value }))
            }
          />
          <FormInput
            id="bloqueo-fin"
            label="Hora fin"
            type="time"
            required
            value={form.horaFin}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, horaFin: event.target.value }))
            }
          />
        </div>
        <FormInput
          id="bloqueo-motivo"
          label="Motivo"
          required
          value={form.motivo}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, motivo: event.target.value }))
          }
        />
      </form>
    </Modal>
  );
};
