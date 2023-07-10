import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layouts/Main";
import Home from "../../Pages/Home/Home/Home";
import Category from "../../Pages/Category/Category/Category";
import Accounts from "../../Layouts/Accounts";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import Setting from "../../Pages/Setting/Setting";
import ChangePassword from "../../Pages/ChangePassword/ChangePassword";
import Error404 from "../../Pages/Error404/Error404";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import DeleteAccount from "../../Pages/DeleteAccount/DeleteAccount";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/accounts",
    element: (
      <PrivateRoutes>
        <Accounts />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "settings",
        element: <Setting />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
      {
        path: "delete-account",
        element: <DeleteAccount />,
      },
    ],
  },
]);

export default routes;
