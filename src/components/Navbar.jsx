import { Link, NavLink, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "/images/download.svg";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const pages = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => (isActive ? "font-bold text-primary bg-primary/10 rounded-lg" : "font-medium hover:text-primary transition-colors rounded-lg")}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/bills" className={({ isActive }) => (isActive ? "font-bold text-primary bg-primary/10 rounded-lg" : "font-medium hover:text-primary transition-colors rounded-lg")}>
          Bills
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/my-pay-bills" className={({ isActive }) => (isActive ? "font-bold text-primary bg-primary/10 rounded-lg" : "font-medium hover:text-primary transition-colors rounded-lg")}>
            My Pay Bills
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100/40 backdrop-blur-md border-b border-base-200 px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={-1} className="menu menu-sm dropdown-content mt-3 z-50 w-52 p-2 bg-base-100 rounded-box shadow-lg border border-base-200">
            {pages}
            {!user && (
              <>
                <li>
                  <NavLink to="/login" className={({ isActive }) => (isActive ? "font-bold text-primary bg-primary/10" : "font-medium")}>Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register" className={({ isActive }) => (isActive ? "font-bold text-primary bg-primary/10" : "font-medium")}>Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        
        <Link to="/" className="btn btn-ghost text-xl flex items-center gap-0">
          <img src={logo} alt="logo" className="w-16" />
          <span className="max-[350px]:hidden font-bold text-primary">UtilityHub</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex gap-2">{pages}</ul>
      </div>

      <div className="navbar-end flex items-center gap-2">
        <ThemeToggle />

        {loading ? (
          <span className="loading loading-spinner loading-md text-primary" />
        ) : user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring ring-primary ring-offset-base-100 ring-offset-2">
              <div className="w-10 rounded-full">
                <img
                  src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                  alt={user.displayName || "User"}
                />
              </div>
            </div>
            <ul tabIndex={-1} className="menu menu-sm dropdown-content mt-3 p-2 w-auto min-w-max bg-base-100 rounded-box shadow-lg border border-base-200 z-50">
              <li>
                <Link to="/profile" className="justify-between font-medium">
                  {user.displayName || "Profile"}
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-error font-medium">Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2 hidden md:flex">
            <Link to="/login" className="btn btn-ghost font-medium hover:text-primary">Login</Link>
            <Link to="/register" className="btn btn-primary text-white shadow-md shadow-primary/20">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;