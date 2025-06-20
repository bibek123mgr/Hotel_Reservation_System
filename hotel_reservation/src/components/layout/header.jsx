import { useState, useEffect, useRef } from "react";
import { Home, Menu, X, ChevronDown, LogOut, User, CalendarCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const { userProfile } = useSelector((store) => store.auth);
    const userName = userProfile?.name || "";
    const userInitial = userName ? userName.charAt(0).toUpperCase() : "";
    const userId = userProfile?.id || null

    const hostname = window.location.hostname;
    const discoverURL = `http://discover.${hostname}:5173`;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);

        const token = localStorage.getItem("access-token");
        if (token) {
            setIsAuthenticated(true);
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("access-token");
        setIsAuthenticated(false);
        setIsDropdownOpen(false);
        navigate("/auth");
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 shadow-sm py-2' : 'bg-transparent py-3'}`}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/home">
                    <div className="flex items-center gap-1.5 cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-500/70 flex items-center justify-center shadow-sm">
                            <Home className="h-4 w-4 text-white" />
                        </div>
                        <div>
                            <h1 className="font-serif text-lg font-bold tracking-tight bg-gradient-to-r from-blue-500 to-blue-500/80 bg-clip-text text-transparent">
                                Reserve Hub
                            </h1>
                            <div className="flex items-center -mt-1">
                                <div className="flex space-x-0.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span key={star} className="text-yellow-400 text-[8px]">★</span>
                                    ))}
                                </div>
                                <span className="text-[8px] ml-1 text-gray-400 font-medium uppercase tracking-wider">Luxury</span>
                            </div>
                        </div>
                    </div>
                </Link>



                {/* Auth or Profile */}
                <div className="hidden lg:flex items-center gap-4 relative" ref={dropdownRef}>
                    {isAuthenticated ? (
                        <div className="relative flex items-center gap-2 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                                {userInitial}
                            </div>
                            <span className="text-sm font-medium text-gray-700">Hi, {userName.split(" ")[0]}</span>
                            <ChevronDown className="w-4 h-4 text-gray-500" />

                            {isDropdownOpen && (
                                <div className="absolute right-0 top-12 bg-white shadow-md rounded-md w-48 z-50 ">
                                    <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm">
                                        <User className="w-4 h-4 mr-2" /> Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 text-sm text-red-500"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/auth"
                            className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition-colors"
                        >
                            Login / Sign Up
                        </Link>
                    )}

                    {/* Discover Button */}
                    <a
                        href={discoverURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600/300 hover:bg-blue-200 transition-colors text-sm font-semibold shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14 3v2H6.41l9.3 9.29-1.42 1.42L5 6.41V14h-2V3h11z" />
                        </svg>
                        Go to Discover
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden text-gray-800 hover:text-blue-500 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-md py-3 animate-in slide-in-from-top">
                    <div className="container mx-auto px-4 flex flex-col gap-2">
                        {["/", "/rooms", "/dining", "/amenities", "/contact"].map((path, idx) => {
                            const labels = ["Home", "Rooms & Suites", "Dining", "Amenities", "Contact"];
                            return (
                                <Link key={path} to={path}>
                                    <span className="py-2 px-3 hover:bg-gray-50 rounded-md text-sm flex cursor-pointer md:hidden">
                                        {labels[idx]}
                                    </span>
                                </Link>
                            );
                        })}
                        <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-3">
                            {isAuthenticated ? (
                                <>
                                    <Link to="/my-reservation" className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-md text-sm font-medium">My Reservation</Link>
                                    <button onClick={handleLogout} className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-md text-sm font-medium">Logout</button>
                                </>
                            ) : (
                                <Link to="/auth" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium">Login / Sign Up</Link>
                            )}
                            <a
                                href={discoverURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-md text-sm font-medium transition-colors"
                            >
                                Go to Discover
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
