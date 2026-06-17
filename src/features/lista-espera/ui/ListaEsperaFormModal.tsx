import { useEffect, useState, type FormEvent } from "react";
import { FormInput } from "@/shared/components/forms";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import type { ListaEspera, ListaEsperaCreateInput } from "../types/listaEsperaType";

interface ListaEsperaFormModalProps {
  open: boolean;
  item: ListaEspera | null;
  onClose: () => void;
  onSubmit: (data: ListaEsperaCreateInput) => void;
  isSubmitting?: boolean;
}

const emptyForm = {
  clienteId: "",
  fecha: "",
  horaInicio: "",
  horaFin: "",
  cantidad: "",
};

const toApiTime = (time: string) =>
  time.length === 5 ? `${time}:00` : time;

const fromApiTime = (time: string) => time.slice(0, 5);

/** Modal de crear/editar entrada en lista de espera. */
export const ListaEsperaFormModal = ({
  open,
  item,
  onClose,
  onSubmit,
  isSubmitting = false,
}: ListaEsperaFormModalProps) => {
  const isEditing = item !== null;
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (item) {
      setForm({
        clienteId: String(item.clienteId),
        fecha: item.fecha,
        horaInicio: fromApiTime(item.horaInicio),
        horaFin: fromApiTime(item.horaFin),
        cantidad: String(item.cantidad),
      });
    } else {
      setForm(emptyForm);
    }
  }, [item, open]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const clienteId = Number(form.clienteId);
    const cantidad = Number(form.cantidad);

    if (
      !clienteId ||
      !form.fecha ||
      !form.horaInicio ||
      !form.horaFin ||
      !cantidad
    ) {
      return;
    }

    onSubmit({
      clienteId,
      fecha: form.fecha,
      horaInicio: toApiTime(form.horaInicio),
      horaFin: toApiTime(form.horaFin),
      cantidad,
    });
  };

  return (
    <Modal
      open={open}
      title={isEditing ? "Editar entrada" : "Nueva entrada en lista de espera"}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" form="lista-espera-form" disabled={isSubmitting}>
            {isSubmitting
              ? "Guardando..."
              : isEditing
                ? "Guardar cambios"
                : "Registrar entrada"}
          </Button>
        </>
      }
    >
      <form id="lista-espera-form" onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="lista-cliente"
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
          id="lista-fecha"
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
            id="lista-inicio"
            label="Hora inicio"
            type="time"
            required
            value={form.horaInicio}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, horaInicio: event.target.value }))
            }
          />
          <FormInput
            id="lista-fin"
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
          id="lista-cantidad"
          label="Cantidad de personas"
          type="number"
          min={1}
          required
          value={form.cantidad}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, cantidad: event.target.value }))
          }
        />
      </form>
    </Modal>
  );
};
