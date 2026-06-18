import { TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/shared/components/ui/Button";
import { cn } from "@/shared/utils/cn";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/** Dialogo de confirmacion con estilo editorial para acciones destructivas. */
export const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel = "Eliminar",
  cancelLabel = "Cancelar",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [loading, onCancel, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/75"
        aria-label="Cerrar dialogo"
        onClick={loading ? undefined : onCancel}
        disabled={loading}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-md border border-border border-t-2 border-t-status-danger",
          "bg-surface-elevated shadow-sm dark:shadow-none",
        )}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
      >
        <div className="px-6 py-5">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-status-danger-muted">
              <TriangleAlert
                className="h-5 w-5 text-status-danger"
                strokeWidth={1.5}
                aria-hidden
              />
            </div>
            <div>
              <p className="font-serif text-xs italic text-brand-600 dark:text-brand-500">
                Acción irreversible
              </p>
              <h2
                id="confirm-dialog-title"
                className="mt-1 font-serif text-lg uppercase tracking-wide text-foreground"
              >
                {title}
              </h2>
              <p
                id="confirm-dialog-message"
                className="mt-3 text-sm leading-6 text-muted"
              >
                {message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-border px-6 py-4">
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={loading}>
            {loading ? "Procesando..." : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
