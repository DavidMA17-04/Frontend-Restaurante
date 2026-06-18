import { UserCheck } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useGetMesas } from "@/features/mesas";
import { FormSelect } from "@/shared/components/forms";
import { Button } from "@/shared/components/ui/Button";
import { cn } from "@/shared/utils/cn";
import type { ListaEspera } from "../types/listaEsperaType";

interface PromoverListaEsperaModalProps {
  open: boolean;
  item: ListaEspera | null;
  onClose: () => void;
  onConfirm: (mesaId: number) => void;
  isSubmitting?: boolean;
}

/** Dialogo para asignar mesa al promover una entrada de lista de espera. */
export const PromoverListaEsperaModal = ({
  open,
  item,
  onClose,
  onConfirm,
  isSubmitting = false,
}: PromoverListaEsperaModalProps) => {
  const { data: mesas } = useGetMesas();
  const [mesaId, setMesaId] = useState("");

  const mesaOptions = useMemo(
    () =>
      (mesas ?? []).map((mesa) => ({
        value: String(mesa.id),
        label: `Mesa #${mesa.numero} · Cap. ${mesa.capacidad}`,
      })),
    [mesas],
  );

  useEffect(() => {
    if (!open) {
      setMesaId("");
      return;
    }

    if (mesaOptions.length > 0) {
      setMesaId(mesaOptions[0].value);
    }
  }, [open, mesaOptions]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const parsedMesaId = Number(mesaId);

    if (!parsedMesaId) {
      return;
    }

    onConfirm(parsedMesaId);
  };

  if (!open || !item) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/75"
        aria-label="Cerrar dialogo"
        onClick={isSubmitting ? undefined : onClose}
        disabled={isSubmitting}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-md border border-border border-t-2 border-t-brand-500",
          "bg-surface-elevated shadow-sm dark:shadow-none",
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="promover-dialog-title"
      >
        <div className="px-6 py-5">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-50/30">
              <UserCheck
                className="h-5 w-5 text-brand-600 dark:text-brand-500"
                strokeWidth={1.5}
                aria-hidden
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-serif text-xs italic text-brand-600 dark:text-brand-500">
                Asignar mesa
              </p>
              <h2
                id="promover-dialog-title"
                className="mt-1 font-serif text-lg uppercase tracking-wide text-foreground"
              >
                Promover entrada
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                Selecciona la mesa para el cliente en espera (entrada #{item.id}
                , {item.cantidad} comensales).
              </p>
              <form
                id="promover-lista-form"
                onSubmit={handleSubmit}
                className="mt-4"
              >
                {mesaOptions.length > 0 ? (
                  <FormSelect
                    id="promover-mesa"
                    label="Mesa"
                    value={mesaId}
                    onChange={(event) => setMesaId(event.target.value)}
                    options={mesaOptions}
                    required
                    disabled={isSubmitting}
                  />
                ) : (
                  <p className="text-sm text-muted">
                    No hay mesas disponibles para asignar.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-border px-6 py-4">
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button
            type="submit"
            form="promover-lista-form"
            disabled={isSubmitting || mesaOptions.length === 0}
          >
            {isSubmitting ? "Promoviendo..." : "Promover"}
          </Button>
        </div>
      </div>
    </div>
  );
};
