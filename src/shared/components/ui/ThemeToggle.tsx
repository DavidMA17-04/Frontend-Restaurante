import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/shared/utils/cn";

interface ThemeToggleProps {
  className?: string;
}

/** Alterna entre tema claro y oscuro. */
export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Activar tema claro" : "Activar tema oscuro"}
      className={cn(
        "flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:bg-foreground/5",
        className,
      )}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-brand-500" strokeWidth={1.5} />
      ) : (
        <Moon className="h-4 w-4 text-brand-600" strokeWidth={1.5} />
      )}
    </button>
  );
};
