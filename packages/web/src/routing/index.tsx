import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Games from "../pages/Games";
import GameRound from "../pages/GameRound";
import Results from "../pages/Results";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Games />,
  },
  {
    path: "/round/:id",
    element: <GameRound />,
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
