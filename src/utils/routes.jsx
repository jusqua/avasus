import Home from '@pages/Home';
import About from '@pages/About';
import Courses from '@pages/Courses';
import Partners from '@pages/Partners';
import Transparency from '@pages/Transparency';
import Contact from '@pages/Contact';

function createRoute(title, path, element) {
  return { title, path, element };
}

const routes = [
  createRoute('Início', '/', <Home />),
  createRoute('Sobre Nós', '/about', <About />),
  createRoute('Cursos', '/courses', <Courses />),
  createRoute('Parceiros', '/partners', <Partners />),
  createRoute('Transparência', '/transparency', <Transparency />),
  createRoute('Contato', '/contact', <Contact />),
];

export default routes;
