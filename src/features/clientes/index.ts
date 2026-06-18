export { ClienteTablePlaceholder } from "./ui/ClienteTablePlaceholder";
export { ClienteFormModal } from "./ui/ClienteFormModal";
export { useGetClientes } from "./hooks/useGetClientes";
export {
  useCreateCliente,
  useUpdateCliente,
  useDeleteCliente,
} from "./hooks/useClienteMutations";
export {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
} from "./services/clienteService";
export type {
  Cliente,
  ClienteCreateInput,
  ClienteUpdateInput,
} from "./types/clienteType";
