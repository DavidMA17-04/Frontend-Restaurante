import { useEffect, useState, type FormEvent } from "react";
import { FormInput } from "@/shared/components/forms";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import type { Turno } from "../types/turnoType";

interface TurnoFormModalProps {
  open: boolean;
  item: Turno | null;
  onClose: () => void;
}

const emptyForm = {
  nombre: "",
  horaInicio: "",
  horaFin: "",
};

/** Modal de crear/editar turno (solo UI). */
export const TurnoFormModal = ({ open, item, onClose }: TurnoFormModalProps) => {
  const isEditing = item !== null;
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (item) {
      setForm({
        nombre: item.nombre,
        horaInicio: item.horaInicio,
        horaFin: item.horaFin,
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
      title={isEditing ? "Editar turno" : "Nuevo turno"}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" form="turno-form">
            {isEditing ? "Guardar cambios" : "Crear turno"}
          </Button>
        </>
      }
    >
      <form id="turno-form" onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="turno-nombre"
          label="Nombre"
          value={form.nombre}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, nombre: event.target.value }))
          }
        />
        <FormInput
          id="turno-inicio"
          label="Hora inicio"
          type="time"
          value={form.horaInicio}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, horaInicio: event.target.value }))
          }
        />
        <FormInput
          id="turno-fin"
          label="Hora fin"
          type="time"
          value={form.horaFin}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, horaFin: event.target.value }))
          }
        />
      </form>
    </Modal>
  );
};
