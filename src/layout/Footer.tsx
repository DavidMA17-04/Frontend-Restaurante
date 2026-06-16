/** Pie de pagina persistente de la aplicacion. */
export const Footer = () => {
  return (
    <footer className="border-t border-border bg-surface px-6 py-4 text-center text-sm text-muted">
      Programacion IV · Sistema Restaurante · {new Date().getFullYear()}
    </footer>
  );
};
