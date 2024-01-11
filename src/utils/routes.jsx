import { Outlet, Link } from 'react-router-dom';

import Home from '@pages/Home';
import Courses from '@pages/Courses';
import Partners from '@pages/Partners';
import Transparency from '@pages/Transparency';
import Module from '@pages/Module';

import Body from '@components/Body';
import WorkInProgress from '@components/WorkInProgress';
import Error from '@components/Error';

function createRoute({
  title,
  path,
  element,
  errorElement,
  index = false,
  crumb = true,
  children,
}) {
  const handle = { title };

  if (!index && crumb && title)
    handle.crumb = () => <Link to={path}>{title}</Link>;

  if (!element) element = children ? <Outlet /> : <WorkInProgress />;

  return {
    path,
    element,
    errorElement,
    index,
    handle,
    children,
  };
}

const routes = [
  createRoute({
    title: 'Início',
    path: '/',
    element: <Body />,
    errorElement: <Error />,
    children: [
      createRoute({ index: true, element: <Home /> }),
      createRoute({ title: 'Sobre Nós', path: '/about' }),
      createRoute({
        title: 'Cursos',
        path: '/courses',
        children: [
          createRoute({ index: true, element: <Courses /> }),
          createRoute({ path: '/courses/:id', element: <Module /> }),
        ],
      }),
      createRoute({
        title: 'Parceiros',
        path: '/partners',
        element: <Partners />,
      }),
      createRoute({
        title: 'Transparência',
        path: '/transparency',
        element: <Transparency />,
      }),
      createRoute({ title: 'Contato', path: '/contact' }),
    ],
  }),
];

export default routes;
