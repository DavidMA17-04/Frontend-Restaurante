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
          "rounded-lg text-sm font-medium transition-colors",
          isActive
            ? cn("bg-brand-600 text-white shadow-sm", activeClassName)
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
          className,
        )
      }
    >
      {children}
    </NavLink>
  );
};
