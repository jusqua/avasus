import { MagnifyingGlass, List, X } from '@phosphor-icons/react';
import { NavLink } from 'react-router-dom';
import { useRef } from 'react';

import LogoColour from '@assets/logo-colour.svg';
import routes from '@utils/routes';

function NavBar({ children }) {
  const navbarDrawerRef = useRef(null);
  const navbarRoutes = routes[0].children
    .filter((match) => Boolean(match.handle?.title))
    .map((match) => ({ path: match.path, title: match.handle.title }));

  return (
    <div className="drawer drawer-end min-h-screen">
      <input
        ref={navbarDrawerRef}
        id="navbar-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content flex flex-col">
        <nav className="flex justify-center shadow sticky top-0 z-10 bg-base-100">
          <header className="navbar p-4 xl:w-[1280px] gap-2">
            <NavLink to="/">
              <img src={LogoColour} className="sm:h-8 h-6" alt="AVASUS" />
            </NavLink>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {navbarRoutes.map(({ path, title }, i) => (
                  <li key={i}>
                    <NavLink className="btn btn-sm btn-ghost" to={path}>
                      {title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 justify-end">
              <label htmlFor="query" className="relative">
                <MagnifyingGlass
                  size="24"
                  className="absolute top-1/2 transform -translate-y-1/2 left-3 stroke-neutral"
                />
                <input
                  id="query"
                  name="query"
                  className="input input-bordered input-neutral input-sm w-full rounded-full pl-10 bg-opacity-40"
                  type="text"
                  placeholder="Buscar"
                />
              </label>
            </div>
            <div className="flex-none hidden gap-2 lg:flex">
              <a
                className="btn btn-sm btn-outline border-neutral hover:bg-neutral hover:border-neutral rounded-full px-6"
                href="#"
              >
                Entrar
              </a>
              <a className="btn btn-sm btn-neutral rounded-full px-6" href="#">
                Cadastrar
              </a>
            </div>
            <div className="flex justify-end lg:hidden">
              <label
                htmlFor="navbar-drawer"
                aria-label="Abrir menu lateral"
                className="btn btn-square btn-ghost"
              >
                <List size="24" className="stroke-neutral" />
              </label>
            </div>
          </header>
        </nav>
        {children}
      </div>
      <div className="drawer-side z-20 lg:hidden">
        <label
          htmlFor="navbar-drawer"
          aria-label="Fecha barra lateral"
          className="drawer-overlay"
        ></label>
        <nav className="p-4 w-full sm:w-96 min-h-full bg-base-200">
          <header className="flex flex-row-reverse items-center justify-between">
            <label
              htmlFor="navbar-drawer"
              aria-label="Fechar barra lateral"
              className="btn btn-square btn-ghost self-end"
            >
              <X size="24" className="stroke-neutral" />
            </label>
            <img src={LogoColour} className="h-6 sm:hidden" alt="AVASUS" />
          </header>
          <ul className="menu">
            {navbarRoutes.map(({ path, title }, i) => (
              <li key={i}>
                <NavLink
                  to={path}
                  onClick={() => {
                    navbarDrawerRef.current.checked = false;
                  }}
                >
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
