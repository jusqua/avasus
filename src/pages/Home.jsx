import SlideImg from '@assets/slide-img.png';
import Carousel from '@components/Carousel';

function Home() {
  return (
    <div>
      <Carousel slideshow={[SlideImg, SlideImg, SlideImg]} />
    </div>
  );
}

export default Home;
