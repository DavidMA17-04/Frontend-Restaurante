/** Formato de fecha ISO (DateOnly) esperado por el backend. */
export const toDateOnly = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/** Formato de hora (TimeOnly) esperado por el backend. */
export const toTimeOnly = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

/** Combina fecha y hora locales en ISO para almacenamiento interno. */
export const combineDateAndTime = (fecha: string, hora: string): string => {
  return new Date(`${fecha}T${hora}`).toISOString();
};

/** Separa un ISO string en partes para inputs date/time. */
export const splitIsoDateTime = (iso: string) => {
  const date = new Date(iso);
  return {
    fecha: toDateOnly(date),
    hora: `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`,
  };
};

/** Formatea DateOnly + TimeOnly del backend para mostrar en tablas. */
export const formatDateOnly = (fecha: string) => {
  const [year, month, day] = fecha.split("-");
  return `${day}/${month}/${year}`;
};

export const formatTimeOnly = (hora: string) => hora.slice(0, 5);

export const formatDateTimeParts = (fecha: string, hora: string) =>
  `${formatDateOnly(fecha)} ${formatTimeOnly(hora)}`;
