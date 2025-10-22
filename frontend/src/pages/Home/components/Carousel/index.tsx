import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const Carousel: React.FC = () => {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    loop: true,
    dragFree: true, // permite arrastrar libremente
  });

  const slides = [
    '/images/slide1.jpg',
    '/images/slide2.jpg',
    '/images/slide3.jpg',
    '/images/slide4.jpg',
    '/images/slide5.jpg',
  ];

  return (
    <div className="overflow-hidden max-w-6xl mx-auto" ref={emblaRef}>
      <div className="flex gap-4">
        {slides.map((src, i) => (
          <div
            key={i}
            className="flex-[0_0_calc(33.333%-1rem)] relative rounded-xl overflow-hidden shadow-md"
          >
            <img
              src={src}
              alt={`Slide ${i}`}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
