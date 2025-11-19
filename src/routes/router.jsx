import { createBrowserRouter } from "react-router";
import App from "../App";
import BillDetailsPage from "../pages/BillDetailsPage";
import HomePage from "../pages/HomePage";
import BillsPage from "../pages/BillsPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from './../pages/RegisterPage';
import ProfilePage from "../pages/ProfilePage";
import MyPayBills from "../pages/MyPayBills";
import PrivateRoute from "../providers/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <NotFoundPage />,
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
        path: "profile",
        element: (
        <PrivateRoute>
          <ProfilePage></ProfilePage>
        </PrivateRoute>
        ),
      },
      {
        path: "bills",
        loader: () => fetch("http://localhost:3000/bills"),
        Component: BillsPage,
      },
      {
        path: "my-pay-bills",
        element: (
        <PrivateRoute>
          <MyPayBills></MyPayBills>
        </PrivateRoute>
        ),
      },
      {
        path: "bills/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/bills/${params.id}`),
        element: (
        <PrivateRoute>
          <BillDetailsPage></BillDetailsPage>
        </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
