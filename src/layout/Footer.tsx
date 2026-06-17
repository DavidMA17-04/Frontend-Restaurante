/** Pie de pagina persistente de la aplicacion. */
export const Footer = () => {
  return (
    <footer className="border-t border-brand-500/30 bg-bg px-6 py-6 text-center">
      <p className="font-serif text-sm italic text-muted">
        <span className="text-brand-500">La Reserva</span>
        {" · "}Programación VI · {new Date().getFullYear()}
      </p>
    </footer>
  );
};
