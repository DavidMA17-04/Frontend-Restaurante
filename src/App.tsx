import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/config/reactQuery";
import { ThemeProvider } from "@/context/ThemeContext";
import { AppRouter } from "@/router/AppRouter";

/** Componente raiz: compone los providers globales y el router. */
function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
