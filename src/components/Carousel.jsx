import { ArrowRight, ArrowLeft } from '@phosphor-icons/react';
import { useState, useEffect, useRef } from 'react';

function Carousel({ slideshow }) {
  const carouselRef = useRef(null);
  const [index, setIndex] = useState(0);

  function handleSlideshow(index) {
    return () => setIndex(index);
  }

  useEffect(() => {
    const element = carouselRef.current;
    element.addEventListener('scroll', () => {
      const index = element.scrollLeft / element.offsetWidth;
      if (Number.isInteger(index)) setIndex(index);
    });
  }, [slideshow]);

  useEffect(() => {
    const element = carouselRef.current;
    element.scrollTo(element.offsetWidth * index, 0);
  }, [index, slideshow]);

  if (!slideshow) return;

  return (
    <div className="relative">
      <div ref={carouselRef} id="carousel" className="carousel w-full">
        {slideshow.map((e, i) => (
          <div key={i} className="carousel-item w-full">
            <img src={e} />
          </div>
        ))}
      </div>
      <div className="absolute flex gap-2 bottom-[10%] right-1/2 transform translate-x-1/2">
        {slideshow.map((_, i) => (
          <label key={i}>
            <input
              type="radio"
              name="carousel"
              value={i}
              onChange={handleSlideshow(i)}
              checked={i === index}
              className="peer hidden"
            />
            <div className="link rounded-full border border-white h-3 w-3 sm:h-4 sm:w-4 transition-all hover:bg-white peer-checked:bg-white peer-checked:w-10 sm:peer-checked:w-12"></div>
          </label>
        ))}
      </div>
      <div className="absolute gap-2 bottom-1/2 left-4 transform translate-y-1/2 hidden sm:flex">
        <button
          onClick={handleSlideshow(Math.max(0, index - 1))}
          className="btn btn-circle opacity-60 hover:opacity-100"
          disabled={index === 0}
        >
          <ArrowLeft size={24} />
        </button>
      </div>
      <div className="absolute gap-2 bottom-1/2 right-4 transform translate-y-1/2 hidden sm:flex">
        <button
          onClick={handleSlideshow(Math.min(index + 1, slideshow.length - 1))}
          className="btn btn-circle opacity-60 hover:opacity-100"
          disabled={index === slideshow.length - 1}
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
