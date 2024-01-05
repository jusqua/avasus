import SlideImg from '@assets/slide-img.png';
import Body from '@components/Body';
import Carousel from '@components/Carousel';

function Home() {
  return (
    <Body>
      <Carousel slideshow={[SlideImg, SlideImg, SlideImg]} />
    </Body>
  );
}

export default Home;
