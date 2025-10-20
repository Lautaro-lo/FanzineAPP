import MiFlipbookPDF from "./components/Flipbook";
import type React from "react";

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <MiFlipbookPDF />
        </div> 
    );
}

export default Home;