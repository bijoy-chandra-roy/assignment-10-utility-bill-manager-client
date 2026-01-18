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
import ContactPage from "../pages/ContactPage";
import CareersPage from "../pages/CareersPage";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/DashboardHome";

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
        path: "contact",
        Component: ContactPage,
      },
      {
        path: "careers",
        Component: CareersPage,
      },
      {
        path: "terms",
        Component: AboutPage
      },
      {
        path: "privacy",
        Component: AboutPage
      },
      {
        path: "bills",
        loader: () => fetch("https://assignment-10-utility-bill-manager.vercel.app/bills"),
        Component: BillsPage,
      },
      {
        path: "bills/:id",
        loader: ({ params }) =>
          fetch(`https://assignment-10-utility-bill-manager.vercel.app/bills/${params.id}`),
        element: <BillDetailsPage />,
      },
      {
        path: "about",
        Component: AboutPage,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "profile",
        Component: ProfilePage,
      },
      {
        path: "my-pay-bills",
        Component: MyPayBills,
      },
    ],
  },
]);

export default router;