/** Filtra un arreglo por coincidencia en campos de texto. */
export const filterBySearch = <T>(
  items: T[],
  query: string,
  keys: (keyof T)[],
): T[] => {
  const trimmed = query.trim().toLowerCase();

  if (!trimmed) {
    return items;
  }

  return items.filter((item) =>
    keys.some((key) => String(item[key] ?? "").toLowerCase().includes(trimmed)),
  );
};
