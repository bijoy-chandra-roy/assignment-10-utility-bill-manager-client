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
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AboutPage from "../pages/AboutPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <div><NavBar></NavBar><NotFoundPage /><Footer></Footer></div>,
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
            <BillDetailsPage></BillDetailsPage>
        ),
      },
      {
        path: "about",
        Component: AboutPage,
      },
    ],
  },
]);

export default router;
