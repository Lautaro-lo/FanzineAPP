import Carousel from "./components/Carousel";
import PDFFlipbook from "./components/Flipbook";
import type React from "react";

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 px-4 py-12">
            <div className="mb-16 w-full max-w-5xl">
                <Carousel />
            </div>
            
            <div className="mt-16 w-full flex justify-center">
                <PDFFlipbook
                    url="/files/DL_32_Karakilinc.pdf"
                    width={1300}
                    height={900}
                    backgroundColor="#222"
                    boxColor="#111"
                />
            </div>
        </div>
    );
}

export default Home;