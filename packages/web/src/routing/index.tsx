import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Games from "../pages/Games";
import GameRound from "../pages/GameRound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Games />,
  },
  {
    path: "/round/:id",
    element: <GameRound />,
  },
]);

function Routing() {
  return <RouterProvider router={router} />;
}

export default Routing;
