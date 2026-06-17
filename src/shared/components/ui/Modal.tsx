import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/** Modal reutilizable con overlay, titulo y footer opcional. */
export const Modal = ({
  open,
  title,
  onClose,
  children,
  footer,
  className,
}: ModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/75"
        aria-label="Cerrar modal"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-lg border border-border bg-surface-elevated",
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-start justify-between border-b border-border px-6 py-4">
          <h2
            id="modal-title"
            className="font-serif text-lg uppercase tracking-wide text-foreground"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-muted transition-colors hover:text-foreground"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 border-t border-border px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
