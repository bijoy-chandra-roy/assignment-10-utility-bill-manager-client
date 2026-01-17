import { Outlet, NavLink, Link } from "react-router";
import { FaHome, FaHistory, FaUser, FaSignOutAlt, FaBars } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";

const DashboardLayout = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut();
    };

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col bg-base-200 min-h-screen">
                <div className="w-full navbar bg-base-100 lg:hidden shadow-sm">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                            <FaBars />
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 font-bold text-lg">UtilityHub Dashboard</div>
                </div>

                <div className="p-8">
                    <Outlet />
                </div>
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                
                <aside className="menu p-4 w-80 min-h-full bg-base-100 dark:bg-base-300 text-base-content shadow-xl flex flex-col">
                    
                    <div>
                        <div className="mb-6 px-4">
                            <h2 className="text-2xl font-bold text-primary">UtilityHub</h2>
                            <p className="text-xs opacity-50">User Dashboard</p>

                            <div className="mt-4 flex items-center gap-3">
                                <div className="avatar">
                                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={user?.photoURL} alt="User" />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-bold text-sm">{user?.displayName}</p>
                                    <p className="text-xs opacity-60">Verified User</p>
                                </div>
                            </div>
                        </div>

                        <li>
                            <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "bg-primary text-white" : ""}>
                                <FaHome /> Overview
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/my-pay-bills" className={({ isActive }) => isActive ? "bg-primary text-white" : ""}>
                                <FaHistory /> My Payment History
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? "bg-primary text-white" : ""}>
                                <FaUser /> My Profile
                            </NavLink>
                        </li>
                    </div>

                    <div className="mt-auto"></div>

                    <div className="divider my-2"></div>

                    <div className="relative">
                        <li>
                            <Link to="/" className="pr-14">
                                Home (Public)
                            </Link>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="text-error pr-14">
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>

                        <div className="absolute right-0 top-1/2 -translate-y-1/2">
                            <ThemeToggle />
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default DashboardLayout;