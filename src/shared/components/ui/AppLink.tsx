import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface AppLinkProps {
  to: string;
  children: ReactNode;
  end?: boolean;
}

/**
 * Enlace de navegacion que aplica una clase activa automaticamente.
 * Envuelve NavLink de react-router para mantener un estilo consistente.
 */
export const AppLink = ({ to, children, end }: AppLinkProps) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `app-link ${isActive ? "app-link--active" : ""}`.trim()
      }
    >
      {children}
    </NavLink>
  );
};
