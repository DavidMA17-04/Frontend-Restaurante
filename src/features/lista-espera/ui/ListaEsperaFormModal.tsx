import { useEffect, useState, type FormEvent } from "react";
import { FormInput, FormSelect } from "@/shared/components/forms";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import type { ListaEspera } from "../types/listaEsperaType";

interface ListaEsperaFormModalProps {
  open: boolean;
  item: ListaEspera | null;
  onClose: () => void;
}

const emptyForm = {
  clienteId: "",
  fechaRegistro: "",
  estado: "En espera",
};

const estadoOptions = [
  { value: "En espera", label: "En espera" },
  { value: "Atendido", label: "Atendido" },
  { value: "Cancelado", label: "Cancelado" },
];

/** Modal de crear/editar entrada en lista de espera (solo UI). */
export const ListaEsperaFormModal = ({
  open,
  item,
  onClose,
}: ListaEsperaFormModalProps) => {
  const isEditing = item !== null;
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (item) {
      setForm({
        clienteId: String(item.clienteId),
        fechaRegistro: item.fechaRegistro.slice(0, 16),
        estado: item.estado,
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
      title={isEditing ? "Editar entrada" : "Nueva entrada en lista de espera"}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" form="lista-espera-form">
            {isEditing ? "Guardar cambios" : "Registrar entrada"}
          </Button>
        </>
      }
    >
      <form id="lista-espera-form" onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="lista-cliente"
          label="Cliente ID"
          type="number"
          value={form.clienteId}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, clienteId: event.target.value }))
          }
        />
        <FormInput
          id="lista-fecha"
          label="Fecha de registro"
          type="datetime-local"
          value={form.fechaRegistro}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, fechaRegistro: event.target.value }))
          }
        />
        <FormSelect
          id="lista-estado"
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
