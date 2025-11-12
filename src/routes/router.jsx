import React from "react";
import { createBrowserRouter } from "react-router";
import App from "../App";
import Bills from "../pages/Bills";
import Home from "../pages/Home";
import BillInfo from "../pages/BillInfo";
import Update from "../pages/Update";

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
        loader: () => fetch("http://localhost:3000/bills"),
        Component: Bills,
      },
      {
        path: "bills/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/bills/${params.id}`),
        Component: BillInfo,
      },
      {
        path: "update/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/bills/${params.id}`),
        Component: Update,
      },
    ],
  },
]);

export default router;
