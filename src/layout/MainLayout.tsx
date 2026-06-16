import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

/**
 * Layout principal: estructura persistente (Navbar, Sidebar, Footer)
 * y un Outlet donde el router monta cada pagina.
 */
export const MainLayout = () => {
  return (
    <div className="layout">
      <Navbar />
      <div className="layout__body">
        <Sidebar />
        <main className="layout__content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};
