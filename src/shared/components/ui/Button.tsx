import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

/** Boton reutilizable y agnostico de dominio. */
export const Button = ({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`btn btn--${variant} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};
