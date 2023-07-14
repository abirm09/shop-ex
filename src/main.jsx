import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./Routes/Routes/Routes";
import { HelmetProvider } from "react-helmet-async";
import ShopExProvider from "./Provider/ShopExProvider/ShopExProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Aos from "aos";
import "aos/dist/aos.css";
const queryClient = new QueryClient();
Aos.init();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <ShopExProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={routes} />
        </QueryClientProvider>
      </ShopExProvider>
    </HelmetProvider>
  </React.StrictMode>
);
