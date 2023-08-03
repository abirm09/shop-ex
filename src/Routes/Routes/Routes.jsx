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
import BecomeASeller from "../../Pages/BecomeASeller/BecomeASeller";
import Dashboard from "../../Layouts/Dashboard";
import Welcome from "../../Pages/Dashboard/Welcome/Welcome";
import AddProduct from "../../Pages/Dashboard/Seller/AddProduct/AddProduct";
import AllAddedProducts from "../../Pages/Dashboard/Seller/AllAddedProducts/AllAddedProducts";
import EditProduct from "../../Pages/Dashboard/Seller/EditProduct/EditProduct";
import InitialCheckProducts from "../../Pages/Dashboard/Staff/Initial-check-products/InitialCheckProducts";
import RejectedProducts from "../../Pages/Dashboard/Seller/RejectedProducts/RejectedProducts";
import ApproveProducts from "../../Pages/Dashboard/Admin/ApproveProducts/ApproveProducts";

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
      {
        path: "become-a-seller",
        element: <BecomeASeller />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "welcome",
        element: <Welcome />,
      },
      {
        path: "add-new-product",
        element: <AddProduct />,
      },
      {
        path: "added-products",
        element: <AllAddedProducts />,
      },
      {
        path: "update-products/:id",
        element: <EditProduct />,
      },
      {
        path: "rejected-products",
        element: <RejectedProducts />,
      },
      //staff
      {
        path: "initial-check-products",
        element: <InitialCheckProducts />,
      },
      //admin
      {
        path: "approve-product",
        element: <ApproveProducts />,
      },
    ],
  },
]);

export default routes;
