import { Link } from 'react-router-dom';

import Home from '@pages/Home';
import Courses from '@pages/Courses';
import Partners from '@pages/Partners';
import Transparency from '@pages/Transparency';

import Body from '@components/Body';
import WorkInProgress from '@components/WorkInProgress';
import Error from '@components/Error';

function createRoute(title, path, element, children, errorElement) {
  return {
    title,
    path,
    element,
    children,
    handle: { crumb: () => <Link to={path}>{title}</Link> },
    errorElement,
  };
}

const routes = [
  createRoute(
    'Início',
    '/',
    <Body />,
    [
      createRoute('Início', '/', <Home />),
      createRoute('Sobre Nós', '/about', <WorkInProgress />),
      createRoute('Cursos', '/courses', <Courses />),
      createRoute('Parceiros', '/partners', <Partners />),
      createRoute('Transparência', '/transparency', <Transparency />),
      createRoute('Contato', '/contact', <WorkInProgress />),
    ],
    <Error />,
  ),
];

export default routes;
