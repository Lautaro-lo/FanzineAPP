import MiFlipbookPDF from "./components/Flipbook";
import PDFDiagnostic from "./components/PDFDiagnostic";
import type React from "react";

const Home: React.FC = () => {
    return (
        <div>
            <h1>Diagnóstico de PDFs</h1>
            
            {/* <PDFDiagnostic urlArchivoPDF="/files/test.pdf" />
            <PDFDiagnostic urlArchivoPDF="/files/ejemplo.pdf" /> */}
            
            <hr style={{ margin: '40px 0' }} />
            
            <h1>Flipbook con PDF Simple (Prueba)</h1>
            <MiFlipbookPDF urlArchivoPDF="/files/test.pdf" />
            
            <h1>Flipbook con PDF Original</h1>
            <MiFlipbookPDF urlArchivoPDF="/files/ejemplo.pdf" />
        </div> 
    );
}

export default Home;