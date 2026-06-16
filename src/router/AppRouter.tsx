import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

/** Provee la configuracion de rutas a la aplicacion. */
export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
