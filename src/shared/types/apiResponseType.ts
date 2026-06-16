/** Respuesta paginada generica del backend. */
export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

/** Forma estandar de un error devuelto por la API. */
export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}
