import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    HotelIcon,
    LayoutDashboardIcon,
    CalendarCheckIcon,
    UsersIcon,
    PieChartIcon,
    SettingsIcon,
    HelpCircleIcon,
    LogOutIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAndRedirect } from "../../app/features/auth/authSlice";

export default function Sidebar({ onMobileClose }) {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userProfile } = useSelector((store) => store.auth);

    const handleLogout = () => {
        dispatch(logoutAndRedirect(navigate));
    };

    const role = localStorage.getItem("role")

    const isActive = (path) => location.pathname === path;

    const linkClass = (path) =>
        `flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive(path)
            ? "bg-slate-100 text-blue-600"
            : "text-slate-700 hover:bg-slate-100 hover:text-blue-600"
        }`;

    return (
        <aside className="hidden md:flex md:w-64 flex-col fixed inset-y-0 z-10 bg-white border-r border-slate-200">
            <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200">
                <div className="flex items-center">
                    <HotelIcon className="h-6 w-6 text-blue-600 mr-2" />
                    <span className="text-lg font-semibold text-blue-600">
                        Reserve Hub
                    </span>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto pt-5 px-3">
                <div className="space-y-1">
                    <Link to="/dashboard" onClick={onMobileClose} className={linkClass("/dashboard")}>
                        <LayoutDashboardIcon className="mr-3 h-5 w-5" />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/reservations" onClick={onMobileClose} className={linkClass("/reservations")}>
                        <CalendarCheckIcon className="mr-3 h-5 w-5" />
                        <span>Reservations</span>
                    </Link>
                    <Link to="/rooms" onClick={onMobileClose} className={linkClass("/rooms")}>
                        <HotelIcon className="mr-3 h-5 w-5" />
                        <span>Rooms</span>
                    </Link>
                    <Link to="/guests" onClick={onMobileClose} className={linkClass("/guests")}>
                        <UsersIcon className="mr-3 h-5 w-5" />
                        <span>Guests</span>
                    </Link>
                    {/* <Link to="/reports" onClick={onMobileClose} className={linkClass("/reports")}>
                        <PieChartIcon className="mr-3 h-5 w-5" />
                        <span>Reports</span>
                    </Link> */}
                    {role == "hotel_admin" && <Link to="/settings" onClick={onMobileClose} className={linkClass("/settings")}>
                        <SettingsIcon className="mr-3 h-5 w-5" />
                        <span>Settings</span>
                    </Link>}

                </div>

                {/* <div className="mt-10">
                    <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Support
                    </h3>
                    <div className="mt-2 space-y-1">
                        <a
                            href="#"
                            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                        >
                            <HelpCircleIcon className="mr-3 h-5 w-5" />
                            <span>Help Center</span>
                        </a>
                    </div>
                </div> */}
            </nav>

            <div className="flex-shrink-0 flex items-center justify-between border-t border-slate-200 p-4">
                {userProfile ? (
                    <div className="flex items-center">
                        <img
                            src={`https://ui-avatars.com/api/?name=${userProfile.name}&background=random`}
                            alt={userProfile.name}
                            className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                                {userProfile.name}
                            </p>
                            <p className="text-xs font-medium text-slate-500 group-hover:text-slate-700">
                                {userProfile.role === "hotel_admin"
                                    ? "Hotel Manager"
                                    : "Super Admin User"}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-slate-500">Loading...</p>
                )}

                <button
                    onClick={handleLogout}
                    type="button"
                    className="ml-4 flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:text-red-700"
                >
                    <LogOutIcon className="mr-2 h-5 w-5" />
                </button>
            </div>
        </aside>
    );
}
