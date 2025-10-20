import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configuración del worker de PDF.js para Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PDFDiagnosticProps {
  urlArchivoPDF: string;
}

function PDFDiagnostic({ urlArchivoPDF }: PDFDiagnosticProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingStatus, setLoadingStatus] = useState<string>('Iniciando...');

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    console.log('✅ PDF cargado exitosamente:', { 
      numPages, 
      url: urlArchivoPDF 
    });
    setNumPages(numPages);
    setError(null);
    setLoading(false);
    setLoadingStatus(`Éxito: ${numPages} páginas`);
  }

  function onDocumentLoadError(error: Error): void {
    console.error('❌ Error al cargar PDF:', { 
      error: error.message, 
      url: urlArchivoPDF,
      stack: error.stack 
    });
    setError(error.message);
    setLoading(false);
    setLoadingStatus('Error al cargar');
  }

  function onDocumentLoadProgress({ loaded, total }: { loaded: number; total: number }) {
    const percentage = total > 0 ? ((loaded / total) * 100).toFixed(2) : '0';
    setLoadingStatus(`Cargando: ${percentage}% (${loaded}/${total} bytes)`);
    console.log('📊 Progreso de carga:', { loaded, total, percentage: `${percentage}%` });
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', borderRadius: '5px' }}>
      <h3>Diagnóstico PDF: {urlArchivoPDF}</h3>
      <p><strong>Estado:</strong> {loadingStatus}</p>
      
      {loading && (
        <div style={{ color: 'blue' }}>
          🔄 Cargando PDF...
        </div>
      )}

      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          <h4>❌ Error detectado:</h4>
          <p>{error}</p>
          <details>
            <summary>Más información</summary>
            <ul>
              <li>URL: {urlArchivoPDF}</li>
              <li>Worker configurado: {pdfjs.GlobalWorkerOptions.workerSrc}</li>
              <li>Versión pdfjs: {pdfjs.version}</li>
            </ul>
          </details>
        </div>
      )}

      {numPages && (
        <div style={{ color: 'green', marginTop: '10px' }}>
          <h4>✅ PDF cargado correctamente:</h4>
          <p>Número de páginas: {numPages}</p>
          <div style={{ border: '1px solid #ddd', padding: '10px', marginTop: '10px' }}>
            <h5>Vista previa de la primera página:</h5>
            <Document
              file={urlArchivoPDF}
              onLoadSuccess={() => {}} // No necesitamos hacer nada aquí
              options={{
                cMapUrl: 'cmaps/',
                cMapPacked: true,
                standardFontDataUrl: 'standard_fonts/',
                disableAutoFetch: false,
                disableStream: false,
                disableRange: false
              }}
            >
              <Page 
                pageNumber={1} 
                width={200}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
        </div>
      )}

      <Document
        file={urlArchivoPDF}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        onLoadProgress={onDocumentLoadProgress}
        loading="Cargando documento PDF..."
        error="Error al cargar el documento PDF"
        options={{
          cMapUrl: 'cmaps/',
          cMapPacked: true,
          standardFontDataUrl: 'standard_fonts/',
          disableAutoFetch: false,
          disableStream: false,
          disableRange: false,
          verbosity: 1 // Más logging
        }}
      >
        {/* El documento se carga aquí, pero no renderizamos las páginas aquí */}
      </Document>
    </div>
  );
}

export default PDFDiagnostic;
