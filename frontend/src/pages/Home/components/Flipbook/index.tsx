import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip'; // Importa el componente
import { Document, Page, pdfjs } from 'react-pdf';
import './index.css';

// Configuración del worker de PDF.js para Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

// --- INICIO CAMBIOS TYPESCRIPT ---

// 1. Tipos para las props del componente de Página
interface PaginaProps {
  pageNumber: number;
  width: number;
}

// 2. Tipos para las props del Flipbook principal
interface MiFlipbookPDFProps {
  urlArchivoPDF: string;
}

// 3. Tipar el 'ref' con React.forwardRef
//    Le decimos que el 'ref' será sobre un elemento HTMLDivElement
const Pagina = React.forwardRef<HTMLDivElement, PaginaProps>(
  (props, ref) => {
    return (
      <div className="pagina-flipbook" ref={ref}>
        <Page 
          pageNumber={props.pageNumber} 
          width={props.width} 
        />
      </div>
    );
  }
);

// --- FIN CAMBIOS TYPESCRIPT ---

function MiFlipbookPDF({ urlArchivoPDF }: MiFlipbookPDFProps) {
  // 4. Tipar el estado
  const [numPages, setNumPages] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const flipbookWidth = 500; 
  const flipbookHeight = 700; 

  // 5. Tipar el parámetro del callback
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setError(null);
    setLoading(false);
    console.log(`PDF cargado exitosamente. Páginas: ${numPages}`);
  }

  function onDocumentLoadError(error: Error): void {
    setError(error.message);
    setLoading(false);
    console.error('Error al cargar el PDF:', error);
  }

 /*  if (loading) {
    return <div className="loading">Cargando PDF...</div>;
  } */

  if (error) {
    return (
      <div className="error">
        <h3>Error al cargar el PDF:</h3>
        <p>{error}</p>
        <p>Verifica que el archivo existe en: {urlArchivoPDF}</p>
      </div>
    );
  }

  return (
    <div>
      <Document
        file={urlArchivoPDF}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        className="documento-oculto"
        options={{
          cMapUrl: 'cmaps/',
          cMapPacked: true,
          standardFontDataUrl: 'standard_fonts/',
          disableAutoFetch: false,
          disableStream: false,
          disableRange: false
        }}
      >
        {numPages && (
          <HTMLFlipBook 
            width={flipbookWidth} 
            height={flipbookHeight} 
            showCover={true}
            className="flipbook"
            style={{}}
            startPage={0}
            size="stretch"
            minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1533}
            drawShadow={true}
            flippingTime={1000}
            usePortrait={true}
            startZIndex={0}
            autoSize={true}
            maxShadowOpacity={0.5}
            mobileScrollSupport={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Pagina 
                key={`page_${index + 1}`} 
                pageNumber={index + 1} 
                width={flipbookWidth} 
              />
            ))}
          </HTMLFlipBook>
        )}
      </Document>
    </div>
  );
}

export default MiFlipbookPDF;


