import { QueryClient } from "@tanstack/react-query";

/**
 * Cliente global de TanStack Query con valores por defecto razonables.
 * Se provee una unica vez en App.tsx mediante QueryClientProvider.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minuto
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
