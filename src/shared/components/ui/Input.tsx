import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

/** Input de texto reutilizable y agnostico de dominio. */
export const Input = ({ label, className = "", id, ...props }: InputProps) => {
  return (
    <div className="field">
      {label && (
        <label className="field__label" htmlFor={id}>
          {label}
        </label>
      )}
      <input id={id} className={`field__input ${className}`.trim()} {...props} />
    </div>
  );
};
