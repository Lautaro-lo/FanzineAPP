import React, { useEffect } from 'react';
import { getPublications } from '../../../../services/fanzine.service';
import useEmblaCarousel from 'embla-carousel-react';

const Carousel: React.FC = () => {
  const [slides, setSlides] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
      getPublications().then((data) => {
        setSlides(data.slides);
        setLoading(false);
      });
  }, []);
  
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    loop: true,
    dragFree: true, // permite arrastrar libremente
  });


  return loading ? (
    <p>Loading...</p>
  ) : (
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
