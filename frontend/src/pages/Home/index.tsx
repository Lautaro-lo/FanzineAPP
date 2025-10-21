import PDFFlipbook from "./components/Flipbook";
import type React from "react";

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="bg-blue-500">prueba</h1>
            <PDFFlipbook 
                url="/files/DL_32_Karakilinc.pdf" 
                width={1200} 
                height={900} 
                backgroundColor="#222"
                boxColor="#111"
            />
        </div> 
    );
}

export default Home;