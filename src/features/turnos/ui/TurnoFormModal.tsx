import { useEffect, useState, type FormEvent } from "react";
import { FormInput, FormSelect } from "@/shared/components/forms";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import type { Turno, TurnoCreateInput } from "../types/turnoType";

interface TurnoFormModalProps {
  open: boolean;
  item: Turno | null;
  onClose: () => void;
  onSubmit: (data: TurnoCreateInput) => void;
  isSubmitting?: boolean;
}

const emptyForm = {
  nombre: "",
  horaInicio: "",
  horaFin: "",
  activo: "true",
};

const toApiTime = (time: string) =>
  time.length === 5 ? `${time}:00` : time;

const fromApiTime = (time: string) => time.slice(0, 5);

/** Modal de crear/editar turno. */
export const TurnoFormModal = ({
  open,
  item,
  onClose,
  onSubmit,
  isSubmitting = false,
}: TurnoFormModalProps) => {
  const isEditing = item !== null;
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (item) {
      setForm({
        nombre: item.nombre,
        horaInicio: fromApiTime(item.horaInicio),
        horaFin: fromApiTime(item.horaFin),
        activo: String(item.activo),
      });
    } else {
      setForm(emptyForm);
    }
  }, [item, open]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!form.nombre.trim() || !form.horaInicio || !form.horaFin) {
      return;
    }

    onSubmit({
      nombre: form.nombre.trim(),
      horaInicio: toApiTime(form.horaInicio),
      horaFin: toApiTime(form.horaFin),
      activo: form.activo === "true",
    });
  };

  return (
    <Modal
      open={open}
      title={isEditing ? "Editar turno" : "Nuevo turno"}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" form="turno-form" disabled={isSubmitting}>
            {isSubmitting
              ? "Guardando..."
              : isEditing
                ? "Guardar cambios"
                : "Crear turno"}
          </Button>
        </>
      }
    >
      <form id="turno-form" onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="turno-nombre"
          label="Nombre"
          value={form.nombre}
          required
          onChange={(event) =>
            setForm((prev) => ({ ...prev, nombre: event.target.value }))
          }
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <FormInput
            id="turno-inicio"
            label="Hora inicio"
            type="time"
            required
            value={form.horaInicio}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, horaInicio: event.target.value }))
            }
          />
          <FormInput
            id="turno-fin"
            label="Hora fin"
            type="time"
            required
            value={form.horaFin}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, horaFin: event.target.value }))
            }
          />
        </div>
        <FormSelect
          id="turno-activo"
          label="Activo"
          value={form.activo}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, activo: event.target.value }))
          }
          options={[
            { value: "true", label: "Si" },
            { value: "false", label: "No" },
          ]}
        />
      </form>
    </Modal>
  );
};
