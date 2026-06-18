import { useEffect, useState, type FormEvent } from "react";
import { FormInput, FormSelect } from "@/shared/components/forms";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import type { Empleado, EmpleadoCreateInput } from "../types/empleadoType";

interface EmpleadoFormModalProps {
  open: boolean;
  item: Empleado | null;
  onClose: () => void;
  onSubmit: (data: EmpleadoCreateInput) => void;
  isSubmitting?: boolean;
}

const emptyForm = {
  nombre: "",
  rol: "",
  activo: "true",
};

/** Modal de crear/editar empleado. */
export const EmpleadoFormModal = ({
  open,
  item,
  onClose,
  onSubmit,
  isSubmitting = false,
}: EmpleadoFormModalProps) => {
  const isEditing = item !== null;
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (item) {
      setForm({
        nombre: item.nombre,
        rol: item.rol,
        activo: String(item.activo),
      });
    } else {
      setForm(emptyForm);
    }
  }, [item, open]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!form.nombre.trim() || !form.rol.trim()) {
      return;
    }

    onSubmit({
      nombre: form.nombre.trim(),
      rol: form.rol.trim(),
      activo: form.activo === "true",
    });
  };

  return (
    <Modal
      open={open}
      title={isEditing ? "Editar empleado" : "Nuevo empleado"}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" form="empleado-form" disabled={isSubmitting}>
            {isSubmitting
              ? "Guardando..."
              : isEditing
                ? "Guardar cambios"
                : "Crear empleado"}
          </Button>
        </>
      }
    >
      <form id="empleado-form" onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="empleado-nombre"
          label="Nombre"
          value={form.nombre}
          required
          onChange={(event) =>
            setForm((prev) => ({ ...prev, nombre: event.target.value }))
          }
        />
        <FormInput
          id="empleado-rol"
          label="Rol"
          value={form.rol}
          required
          onChange={(event) =>
            setForm((prev) => ({ ...prev, rol: event.target.value }))
          }
        />
        <FormSelect
          id="empleado-activo"
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
