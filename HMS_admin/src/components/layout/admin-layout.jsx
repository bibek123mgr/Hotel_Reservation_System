import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import MobileSidebar from "./modile-sidebar";

export default function AdminLayout() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />

            <MobileSidebar
                showMobileMenu={showMobileMenu}
                setShowMobileMenu={setShowMobileMenu}
            />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 md:ml-64 pt-16 md:pt-0">
                <Outlet />
            </main>
        </div>
    );
}
