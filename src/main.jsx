import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./Routes/Routes/Routes";
import { HelmetProvider } from "react-helmet-async";
import ShopExProvider from "./Provider/ShopExProvider/ShopExProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <ShopExProvider>
        <RouterProvider router={routes} />
      </ShopExProvider>
    </HelmetProvider>
  </React.StrictMode>
);
