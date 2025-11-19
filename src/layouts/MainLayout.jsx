import { Outlet } from "react-router";
import Footer from './../components/Footer';
import Navbar from '../components/NavBar';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
