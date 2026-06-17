import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

interface TableRowActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

/** Acciones de fila para editar o eliminar un registro. */
export const TableRowActions = ({ onEdit, onDelete }: TableRowActionsProps) => {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onEdit}
        aria-label="Editar"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onDelete}
        aria-label="Eliminar"
        className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/50 dark:hover:text-red-300"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
