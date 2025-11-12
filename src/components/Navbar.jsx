import { Link, NavLink } from "react-router";
import logo from "/images/file.svg";

const NavBar = ({ user = null, onLogout = () => {} }) => {
  const pages = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => (isActive ? "font-bold" : "")}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/bills" className={({ isActive }) => (isActive ? "font-bold" : "")}>
          Bills
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/my-pay-bills" className={({ isActive }) => (isActive ? "font-bold" : "")}>
            My Pay Bills
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={-1} className="menu menu-sm dropdown-content mt-3 w-52 p-2 bg-base-100 rounded-box">
            {pages}
            {!user && (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            )}
            {user && (
              <li>
                <button onClick={onLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost text-xl flex items-center gap-2">
          <img src={logo} alt="logo" className="w-8" />
          UtilityHub
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex gap-6">{pages}</ul>
      </div>

      <div className="navbar-end">
        {!user && (
          <>
            <Link to="/login" className="btn">
              Login
            </Link>
            <Link to="/register" className="btn ml-2">
              Register
            </Link>
          </>
        )}

        {user && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                  alt={user.displayName || "User"}
                />
              </div>
            </div>
            <ul tabIndex={-1} className="menu menu-sm dropdown-content mt-3 p-2 w-auto min-w-max">
              <li>
                <Link to="/profile">{user.displayName || "Profile"}</Link>
              </li>
              <li>
                <button onClick={onLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
