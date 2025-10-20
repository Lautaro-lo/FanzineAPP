import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function MainLayout() {
    return (
        <div className="">
            <Navbar />
            <main className="flex-1 overflow-y-auto h-screen">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
