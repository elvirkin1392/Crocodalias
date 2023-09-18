import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Games from "../pages/Games";
import Round from "../pages/gameRound/Round";
import Results from "../pages/Results";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Games />,
  },
  {
    path: "/round/:id",
    element: <Round />,
  },
  {
    path: "/results",
    element: <Results />,
  },
]);

function Routing() {
  return <RouterProvider router={router} />;
}

export default Routing;
