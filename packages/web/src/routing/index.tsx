import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Games from "../pages/Games";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Games />,
  },
]);

function Routing() {
  return <RouterProvider router={router} />;
}

export default Routing;
