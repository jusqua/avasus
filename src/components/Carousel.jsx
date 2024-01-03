import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

function Carousel({ slideshow }) {
  function handleSlideshowButton(index) {
    return () =>
      document
        .getElementById('carousel')
        .scrollTo(window.innerWidth * index, 0);
  }

  function handleSlideshowArrow(side) {
    return () =>
      document.getElementById('carousel').scrollBy(window.innerWidth * side, 0);
  }

  useEffect(() => {
    const carousel = document.getElementById('carousel');
    document.getElementById('radio-slide-0').checked = true;

    carousel.addEventListener('scroll', () => {
      if (carousel.scrollLeft % window.innerWidth == 0)
        document.getElementById(
          `radio-slide-${carousel.scrollLeft / window.innerWidth}`,
        ).checked = true;
    });
  }, []);

  return (
    <div className="relative">
      <div id="carousel" className="carousel w-full">
        {slideshow.map((e, i) => (
          <div key={`slide-${i}`} className="carousel-item w-full">
            <img src={e} />
          </div>
        ))}
      </div>
      <div className="absolute flex gap-2 bottom-[10%] right-1/2 transform translate-x-1/2">
        {slideshow.map((_, i) => (
          <label key={`radio-slide-${i}`}>
            <input
              id={`radio-slide-${i}`}
              type="radio"
              name="carousel"
              value={i}
              onClick={handleSlideshowButton(i)}
              className="peer hidden"
            />
            <div className="link rounded-full border border-white h-3 w-3 sm:h-4 sm:w-4 transition-all hover:bg-white peer-checked:bg-white peer-checked:w-10 sm:peer-checked:w-12"></div>
          </label>
        ))}
      </div>
      <div className="absolute gap-2 bottom-1/2 left-4 transform translate-y-1/2 hidden sm:flex">
        <button
          id="slideshow-left-arrow"
          onClick={handleSlideshowArrow(-1)}
          className="btn btn-circle opacity-60 hover:opacity-100"
        >
          <ArrowLeft />
        </button>
      </div>
      <div className="absolute gap-2 bottom-1/2 right-4 transform translate-y-1/2 hidden sm:flex">
        <button
          id="slideshow-right-arrow"
          onClick={handleSlideshowArrow(1)}
          className="btn btn-circle opacity-60 hover:opacity-100"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
