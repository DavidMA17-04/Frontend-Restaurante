import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { MobileNav, Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

/**
 * Layout principal: Navbar, Sidebar, contenido y Footer.
 */
export const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Navbar />
      <MobileNav />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
