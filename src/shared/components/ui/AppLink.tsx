import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/shared/utils/cn";

interface AppLinkProps {
  to: string;
  children: ReactNode;
  end?: boolean;
  className?: string;
  activeClassName?: string;
}

/**
 * Enlace de navegacion con estilos Tailwind y estado activo automatico.
 */
export const AppLink = ({
  to,
  children,
  end,
  className,
  activeClassName,
}: AppLinkProps) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "text-sm font-medium transition-colors",
          isActive
            ? cn("text-foreground", activeClassName)
            : "text-muted hover:text-foreground",
          className,
        )
      }
    >
      {children}
    </NavLink>
  );
};
