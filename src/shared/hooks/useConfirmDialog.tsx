import { useCallback, useState } from "react";
import { ConfirmDialog } from "@/shared/components/ui/ConfirmDialog";

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
}

interface ConfirmState extends Required<Omit<ConfirmOptions, "title">> {
  title: string;
}

const defaultTitle = "Confirmar eliminación";

/** Hook para mostrar un dialogo de confirmacion antes de acciones destructivas. */
export const useConfirmDialog = () => {
  const [state, setState] = useState<ConfirmState | null>(null);
  const [loading, setLoading] = useState(false);

  const confirm = useCallback((options: ConfirmOptions) => {
    setState({
      title: options.title ?? defaultTitle,
      message: options.message,
      confirmLabel: options.confirmLabel ?? "Eliminar",
      cancelLabel: options.cancelLabel ?? "Cancelar",
      onConfirm: options.onConfirm,
    });
  }, []);

  const close = useCallback(() => {
    if (!loading) {
      setState(null);
    }
  }, [loading]);

  const handleConfirm = useCallback(async () => {
    if (!state) {
      return;
    }

    setLoading(true);
    try {
      await state.onConfirm();
      setState(null);
    } finally {
      setLoading(false);
    }
  }, [state]);

  const confirmDialog = state ? (
    <ConfirmDialog
      open
      title={state.title}
      message={state.message}
      confirmLabel={state.confirmLabel}
      cancelLabel={state.cancelLabel}
      loading={loading}
      onConfirm={handleConfirm}
      onCancel={close}
    />
  ) : null;

  return { confirm, confirmDialog };
};
