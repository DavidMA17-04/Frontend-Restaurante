import { useEffect, useState, type FormEvent } from "react";
import { FormInput, FormSelect } from "@/shared/components/forms";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import { useGetEstados } from "@/features/estados";
import type { Reserva, ReservaCreateInput } from "../types/reservaType";

interface ReservaFormModalProps {
  open: boolean;
  item: Reserva | null;
  onClose: () => void;
  onSubmit: (data: ReservaCreateInput) => void;
  isSubmitting?: boolean;
}

const emptyForm = {
  fecha: "",
  horaInicio: "",
  horaFin: "",
  capacidad: "",
  clienteId: "",
  mesaId: "",
  estadoId: "1",
};

const toApiTime = (time: string) =>
  time.length === 5 ? `${time}:00` : time;

const fromApiTime = (time: string) => time.slice(0, 5);

/** Modal de crear/editar reserva. */
export const ReservaFormModal = ({
  open,
  item,
  onClose,
  onSubmit,
  isSubmitting = false,
}: ReservaFormModalProps) => {
  const isEditing = item !== null;
  const { data: estados = [] } = useGetEstados();
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (item) {
      setForm({
        fecha: item.fecha,
        horaInicio: fromApiTime(item.horaInicio),
        horaFin: fromApiTime(item.horaFin),
        capacidad: String(item.capacidad),
        clienteId: String(item.clienteId),
        mesaId: String(item.mesaId),
        estadoId: String(item.estadoId),
      });
    } else {
      setForm(emptyForm);
    }
  }, [item, open]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const capacidad = Number(form.capacidad);
    const clienteId = Number(form.clienteId);
    const mesaId = Number(form.mesaId);
    const estadoId = Number(form.estadoId);

    if (
      !form.fecha ||
      !form.horaInicio ||
      !form.horaFin ||
      !capacidad ||
      !clienteId ||
      !mesaId ||
      !estadoId
    ) {
      return;
    }

    onSubmit({
      fecha: form.fecha,
      horaInicio: toApiTime(form.horaInicio),
      horaFin: toApiTime(form.horaFin),
      capacidad,
      clienteId,
      mesaId,
      estadoId,
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
          id="reserva-fecha"
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
            id="reserva-inicio"
            label="Hora inicio"
            type="time"
            required
            value={form.horaInicio}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, horaInicio: event.target.value }))
            }
          />
          <FormInput
            id="reserva-fin"
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
          id="reserva-capacidad"
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
        <FormSelect
          id="reserva-estado"
          label="Estado"
          value={form.estadoId}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, estadoId: event.target.value }))
          }
          options={estados.map((estado) => ({
            value: String(estado.id),
            label: estado.nombre,
          }))}
        />
      </form>
    </Modal>
  );
};
