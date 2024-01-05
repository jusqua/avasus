import { Link } from 'react-router-dom';

import Home from '@pages/Home';
import About from '@pages/About';
import Courses from '@pages/Courses';
import Partners from '@pages/Partners';
import Transparency from '@pages/Transparency';
import Contact from '@pages/Contact';

import Body from '@components/Body';

function createRoute(title, path, element, children) {
  return {
    title,
    path,
    element,
    children,
    handle: { crumb: () => <Link to={path}>{title}</Link> },
  };
}

const routes = [
  createRoute('Início', '/', <Body />, [
    createRoute('Início', '/', <Home />),
    createRoute('Sobre Nós', '/about', <About />),
    createRoute('Cursos', '/courses', <Courses />),
    createRoute('Parceiros', '/partners', <Partners />),
    createRoute('Transparência', '/transparency', <Transparency />),
    createRoute('Contato', '/contact', <Contact />),
  ]),
];

export default routes;
