import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

export default function Layout({ hideHeader = false, hideFooter = false }) {
    return (
        <div className="flex flex-col min-h-screen">
            {!hideHeader && <Header />}
            <main className="flex-1">
                <Outlet />
            </main>
            {!hideFooter && <Footer />}
        </div>
    );
}
