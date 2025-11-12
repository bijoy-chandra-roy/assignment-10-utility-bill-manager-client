import { createBrowserRouter } from "react-router";
import App from "../App";
import BillDetailsPage from "../pages/BillDetailsPage";
import Update from "../pages/Update";
import HomePage from "../pages/HomePage";
import BillsPage from "../pages/BillsPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from './../pages/RegisterPage';

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <NotFoundPage/>,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "register",
        Component: RegisterPage,
      },
      {
        path: "bills",
        loader: () => fetch("http://localhost:3000/bills"),
        Component: BillsPage,
      },
      {
        path: "bills/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/bills/${params.id}`),
        Component: BillDetailsPage,
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
