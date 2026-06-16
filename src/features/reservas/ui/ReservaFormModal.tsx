import { useEffect, useState, type FormEvent } from "react";
import { FormInput, FormSelect } from "@/shared/components/forms";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import type { Reserva, ReservaCreateInput } from "../types/reservaType";

interface ReservaFormModalProps {
  open: boolean;
  item: Reserva | null;
  onClose: () => void;
  onSubmit: (data: ReservaCreateInput) => void;
  isSubmitting?: boolean;
}

const emptyForm = {
  clienteId: "",
  mesaId: "",
  fecha: "",
  estado: "Pendiente",
};

const estadoOptions = [
  { value: "Pendiente", label: "Pendiente" },
  { value: "Confirmada", label: "Confirmada" },
  { value: "Cancelada", label: "Cancelada" },
];

/** Modal de crear/editar reserva. */
export const ReservaFormModal = ({
  open,
  item,
  onClose,
  onSubmit,
  isSubmitting = false,
}: ReservaFormModalProps) => {
  const isEditing = item !== null;
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (item) {
      setForm({
        clienteId: String(item.clienteId),
        mesaId: String(item.mesaId),
        fecha: item.fecha.slice(0, 16),
        estado: item.estado,
      });
    } else {
      setForm(emptyForm);
    }
  }, [item, open]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const clienteId = Number(form.clienteId);
    const mesaId = Number(form.mesaId);

    if (!clienteId || !mesaId || !form.fecha) {
      return;
    }

    onSubmit({
      clienteId,
      mesaId,
      fecha: new Date(form.fecha).toISOString(),
      estado: form.estado,
    });
  };

  return (
    <Modal
      open={open}
      title={isEditing ? "Editar reserva" : "Nueva reserva"}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" form="reserva-form" disabled={isSubmitting}>
            {isSubmitting
              ? "Guardando..."
              : isEditing
                ? "Guardar cambios"
                : "Crear reserva"}
          </Button>
        </>
      }
    >
      <form id="reserva-form" onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="reserva-cliente"
          label="Cliente ID"
          type="number"
          min={1}
          required
          value={form.clienteId}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, clienteId: event.target.value }))
          }
        />
        <FormInput
          id="reserva-mesa"
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
          id="reserva-fecha"
          label="Fecha"
          type="datetime-local"
          required
          value={form.fecha}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, fecha: event.target.value }))
          }
        />
        <FormSelect
          id="reserva-estado"
          label="Estado"
          value={form.estado}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, estado: event.target.value }))
          }
          options={estadoOptions}
        />
      </form>
    </Modal>
  );
};
