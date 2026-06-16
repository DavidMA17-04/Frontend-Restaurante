import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/config/reactQuery";
import { AppRouter } from "@/router/AppRouter";

/** Componente raiz: compone los providers globales y el router. */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
}

export default App;
