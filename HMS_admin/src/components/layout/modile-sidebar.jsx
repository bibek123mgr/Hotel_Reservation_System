import { useState } from "react";
import { HotelIcon, Menu, BellIcon } from "lucide-react";
import Sidebar from "./sidebar";


export default function MobileSidebar({ showMobileMenu, setShowMobileMenu }) {
    const handleCloseSidebar = () => {
        setShowMobileMenu(false);
    };

    return (
        <>
            {/* Mobile header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-white border-b border-slate-200 flex items-center justify-between h-16 px-4">
                <div className="flex items-center">
                    <button
                        type="button"
                        className="text-slate-500 mr-2"
                        onClick={() => setShowMobileMenu(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <span className="text-lg font-semibold text-primary flex items-center">
                        <HotelIcon className="h-5 w-5 mr-2" />
                        HotelAdmin
                    </span>
                </div>
                <div>
                    <button type="button" className="rounded-full bg-white p-1 text-slate-400 hover:text-slate-500">
                        <BellIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Mobile sidebar overlay */}
            {showMobileMenu && (
                <div
                    className="md:hidden fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity"
                    onClick={handleCloseSidebar}
                ></div>
            )}

            {/* Mobile sidebar */}
            {showMobileMenu && (
                <div className="md:hidden fixed inset-y-0 left-0 z-30 w-64 bg-white">
                    <Sidebar onMobileClose={handleCloseSidebar} />
                </div>
            )}
        </>
    );
}
