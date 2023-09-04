import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SettingsGeneral from "../pages/SettingsGeneral";
import Games from "../pages/Games";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Games/>,
  },
  {
    path: "/settings",
    element: <SettingsGeneral/>,
  },
]);

function Routing(props) {
  return (
    <RouterProvider router={router} />
  );
}

export default Routing;