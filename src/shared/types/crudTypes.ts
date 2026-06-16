/** Entidad con identificador numerico para operaciones CRUD. */
export interface Identifiable {
  id: number;
}

export type CreateInput<T extends Identifiable> = Omit<T, "id">;

export type UpdateInput<T extends Identifiable> = Partial<CreateInput<T>>;

export interface UpdatePayload<T extends Identifiable> {
  id: number;
  data: UpdateInput<T>;
}
