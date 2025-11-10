import React from "react";
import { createBrowserRouter } from "react-router";
import App from "../App";
import Bills from "../pages/Bills";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <h1>Error</h1>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "bills",
        loader: async () => {
          const res = await fetch("http://localhost:3000/bills");
          return res.json();
        },
        Component: Bills,
      },
    ],
  },
]);

export default router;
