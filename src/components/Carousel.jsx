import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

function Carousel({ slideshow }) {
  function handleArrowState(currentSlide) {
    const rightArrow = document.getElementById('slideshow-right-arrow');
    const leftArrow = document.getElementById('slideshow-left-arrow');

    if (currentSlide == slideshow.length - 1)
      rightArrow.setAttribute('disabled', true)
    else
      rightArrow.removeAttribute('disabled')

    if (currentSlide == 0)
      leftArrow.setAttribute('disabled', true)
    else
      leftArrow.removeAttribute('disabled')
  }

  function handleSlideshowButton(index) {
    return () => {
      const currentSlide = window.innerWidth * index;
      document.getElementById('carousel').scrollTo(currentSlide, 0);
      handleArrowState(currentSlide);
    }
  };

  function handleSlideshowArrow(side) {
    return () => {
      const carousel = document.getElementById('carousel');
      const scrollBy = window.innerWidth * side;
      carousel.scrollBy(scrollBy, 0);
      handleArrowState((carousel.scrollLeft + scrollBy) / window.innerWidth);
    };
  }

  useEffect(() => {
    const carousel = document.getElementById('carousel');
    document.getElementById('radio-slide-0').checked = true;
    document.getElementById('slideshow-left-arrow').setAttribute('disabled', true)

    carousel.addEventListener('scroll', () => {
      if (carousel.scrollLeft % window.innerWidth == 0) {
        const currentSlide = carousel.scrollLeft / window.innerWidth;
        document.getElementById(`radio-slide-${currentSlide}`).checked = true;
        handleArrowState(currentSlide);
      }
    });
  }, []);

  return (
    <div className="relative">
      <div id="carousel" className="carousel w-full">
        {slideshow.map((e, i) => <div key={`slide-${i}`} className="carousel-item w-full"><img src={e} /></div>)}
      </div>
      <div className="absolute flex gap-2 bottom-4 sm:bottom-12 right-1/2 transform translate-x-1/2">
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
            <div className="link rounded-full border border-white h-4 w-4 transition-all hover:bg-white peer-checked:bg-white peer-checked:w-12 focus:bg-white focus:w-12"></div>
          </label>
        ))}
      </div>
      <div className="absolute flex gap-2 bottom-1/2 left-4 transform -translate-y-1/2">
        <button
          id="slideshow-left-arrow"
          onClick={handleSlideshowArrow(-1)}
          className="btn btn-circle opacity-60 hover:opacity-100"
        >
          <ArrowLeft />
        </button>
      </div>
      <div className="absolute flex gap-2 bottom-1/2 right-4 transform -translate-y-1/2">
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
