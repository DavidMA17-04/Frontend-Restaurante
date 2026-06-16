import type { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/**
 * Campo de formulario reutilizable basado en props HTML nativas.
 * En la fase de CRUD se conectara a la libreria de formularios elegida.
 */
export const FormInput = ({
  label,
  error,
  className = "",
  id,
  ...props
}: FormInputProps) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={`form-input ${error ? "form-input--error" : ""} ${className}`.trim()}
        {...props}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};
