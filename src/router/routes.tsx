import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/layout/MainLayout";
import { ROUTES } from "@/shared/constants/routeConstants";
import { HomePage } from "@/pages/HomePage";
import { ClientesPage } from "@/pages/ClientesPage";
import { EmpleadosPage } from "@/pages/EmpleadosPage";
import { MesasPage } from "@/pages/MesasPage";
import { ReservasPage } from "@/pages/ReservasPage";
import { TurnosPage } from "@/pages/TurnosPage";
import { ZonasPage } from "@/pages/ZonasPage";
import { BloqueosMesaPage } from "@/pages/BloqueosMesaPage";
import { ListaEsperaPage } from "@/pages/ListaEsperaPage";

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.clientes, element: <ClientesPage /> },
      { path: ROUTES.empleados, element: <EmpleadosPage /> },
      { path: ROUTES.mesas, element: <MesasPage /> },
      { path: ROUTES.reservas, element: <ReservasPage /> },
      { path: ROUTES.turnos, element: <TurnosPage /> },
      { path: ROUTES.zonas, element: <ZonasPage /> },
      { path: ROUTES.bloqueosMesa, element: <BloqueosMesaPage /> },
      { path: ROUTES.listaEspera, element: <ListaEsperaPage /> },
    ],
  },
]);
