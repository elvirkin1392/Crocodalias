import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Games from "../pages/Games";
import Round from "../pages/Round";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Games />,

  },
  {
    path: '/round/:id',
    element: <Round/>
  }

]);

function Routing() {
  return <RouterProvider router={router} />;
}

export default Routing;
