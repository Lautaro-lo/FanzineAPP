import type React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray-200 text-gray-600">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between">
                <p className="text-sm">
                    © {new Date().getFullYear()} <span className="font-medium text-gray-800">Lautaro Entreprize</span> y <span className="font-medium text-gray-800">Lucielita</span>
                </p>
            </div>
        </footer>
    );
}

export default Footer;