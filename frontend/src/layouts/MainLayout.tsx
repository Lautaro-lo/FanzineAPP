import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
            <Navbar />
            <main className="flex-1 overflow-y-auto px-6 py-8 md:px-12 lg:px-24">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
