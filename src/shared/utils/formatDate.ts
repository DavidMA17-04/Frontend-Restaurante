/**
 * Formatea una fecha ISO o Date a un formato legible es-CR.
 * Retorna cadena vacia si el valor es invalido.
 */
export const formatDate = (value: string | Date): string => {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("es-CR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};
