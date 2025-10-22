import React, { useEffect, useRef, useState } from "react";
import { init as flipbook } from "flipbook-viewer";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

(pdfjsLib as any).GlobalWorkerOptions.workerSrc = pdfWorker;

interface PDFFlipbookProps {
  url: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  boxColor?: string;
}

const PDFFlipbook: React.FC<PDFFlipbookProps> = ({
  url,
  width,
  height,
  backgroundColor = "#353535",
  boxColor = "#353535",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const cache: Record<number, any> = {};

    const initBook = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(url).promise;
        setTotalPages(pdf.numPages);

        const getPage = (n: number, cb: (err: any, page?: any) => void) => {
          if (!n || n > pdf.numPages) return cb(null);
          if (cache[n]) return cb(null, cache[n]);

          pdf
            .getPage(n)
            .then((page) => {
              const scale = 1.2;
              const viewport = page.getViewport({ scale });
              const outputScale = window.devicePixelRatio || 1;

              const canvas = document.createElement("canvas");
              canvas.width = Math.floor(viewport.width * outputScale);
              canvas.height = Math.floor(viewport.height * outputScale);
              canvas.style.width = `${Math.floor(viewport.width)}px`;
              canvas.style.height = `${Math.floor(viewport.height)}px`;

              const transform =
                outputScale !== 1
                  ? [outputScale, 0, 0, outputScale, 0, 0]
                  : null;

              const context = canvas.getContext("2d")!;
              const renderContext = {
                canvasContext: context,
                transform: transform || undefined,
                viewport,
              };

              page
                .render(renderContext)
                .promise.then(() => {
                  const img = new Image();
                  img.src = canvas.toDataURL();
                  img.onload = () => {
                    const pageData = {
                      img,
                      num: n,
                      width: img.width,
                      height: img.height,
                    };
                    cache[n] = pageData;
                    cb(null, pageData);
                  };
                })
                .catch((err) => cb(err));
            })
            .catch((err) => cb(err));
        };

        const book = {
          numPages: () => pdf.numPages,
          getPage,
        };

        const opts = { width, height, backgroundColor, boxColor };

        flipbook(book, containerRef.current!, opts, (err: any, viewer: any) => {
          if (err) return console.error(err);
          viewerRef.current = viewer;

          viewer.on("seen", (n: number) => setCurrentPage(n));
        });
      } catch (err) {
        console.error("Error al cargar el PDF:", err);
      }
    };

    initBook();
  }, [url, width, height, backgroundColor, boxColor]);

  const handleNext = () => viewerRef.current?.flip_forward();
  const handlePrev = () => viewerRef.current?.flip_back();
  const handleZoom = () => viewerRef.current?.zoom();

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={containerRef}
        style={{
          width,
          height,
          backgroundColor,
          borderRadius: "0.5rem",
          overflow: "hidden",
        }}
      />

      <div className="flex items-center justify-center mb-4 gap-4">
        <button
          onClick={handlePrev}
          className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
        >
          ← Anterior
        </button>

        <button
          onClick={handleZoom}
          className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center gap-2"
        >
          🔍 <span>Zoom</span>
        </button>

        <button
          onClick={handleNext}
          className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
        >
          Siguiente →
        </button>
      </div>

      <div className="text-sm text-gray-500 mt-2 font-medium tracking-wide">
        Página <span className="text-gray-800">{currentPage}</span> de{' '}
        {totalPages || '…'}
      </div>
    </div>
  );
};

export default PDFFlipbook;
