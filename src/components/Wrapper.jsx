import LogoColour from '@assets/logo-colour.svg';
import LaisLogo from '@assets/lais-logo.svg';
import UfrnLogo from '@assets/ufrn-logo.svg';
import { Search, Menu, X, Facebook, Twitter, Instagram } from 'lucide-react';
import { NavLink } from 'react-router-dom';

function Wrapper({ routes, children }) {
  return (
    <div className="drawer drawer-end min-h-screen">
      <input id="navbar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <nav className="flex justify-center shadow">
          <header className="navbar p-4 xl:w-[1280px] gap-2">
            <img src={LogoColour} className="sm:h-8 h-6" alt="AVASUS" />
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {routes.map(({ path, title }) => (
                  <li>
                    <NavLink
                      key={`navbar-[${title}]`}
                      className="btn btn-sm btn-ghost"
                      to={path}
                    >
                      {title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 justify-end">
              <label htmlFor="query" className="relative">
                <Search className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 stroke-neutral" />
                <input
                  id="query"
                  name="query"
                  className="input input-bordered input-neutral input-sm w-full rounded-full pl-10"
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
                <Menu className="stroke-neutral" />
              </label>
            </div>
          </header>
        </nav>
        <main className="flex-1">{children}</main>
        <footer className="flex flex-col w-full text-white">
          <div className="bg-primary flex flex-col gap-4 sm:gap-8 p-8">
            <p className="text-center">Realização</p>
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-24 justify-center">
              <img
                src={LaisLogo}
                alt="Logo da LAIS"
                className="h-12 sm:h-auto"
              />
              <img
                src={UfrnLogo}
                alt="Logo da UFRN"
                className="h-12 sm:h-auto"
              />
            </div>
          </div>
          <div className="footer bg-[#323237] p-6 justify-evenly">
            <aside>
              <img src={LaisLogo} alt="Logo da LAIS" className="h-8 sm:h-12" />
              <p className="opacity-60">
                Laboratório de Inovação <br /> Tecnológica em Saúde.
              </p>
            </aside>
            <nav>
              <header className="text-lg footer-title opacity-100">
                Links úteis
              </header>
              {routes.map(({ path, title }) => (
                <NavLink
                  key={`footer-[${title}]`}
                  className="link link-hover opacity-60"
                  to={path}
                >
                  {title}
                </NavLink>
              ))}
            </nav>
            <nav>
              <header className="text-lg footer-title opacity-100">
                Redes Sociais
              </header>
              <div className="flex gap-8">
                <a href="#" className="link">
                  <Facebook
                    strokeWidth={0.5}
                    className="stroke-white fill-white"
                  />
                </a>
                <a href="#" className="link">
                  <Twitter
                    strokeWidth={0.5}
                    className="stroke-white fill-white"
                  />
                </a>
                <a href="#" className="link">
                  <Instagram strokeWidth={2} className="stroke-white" />
                </a>
              </div>
            </nav>
          </div>
          <p className="bg-[#424146] text-white text-center p-4">
            {new Date().getFullYear()} © LAIS (HUOL). Todos os direitos
            reservados
          </p>
        </footer>
      </div>
      <div className="drawer-side lg:hidden">
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
              <X className="stroke-neutral" />
            </label>
            <img src={LogoColour} className="h-6 sm:hidden" alt="AVASUS" />
          </header>
          <ul className="menu">
            {routes.map(({ path, title }) => (
              <li>
                <NavLink key={`sidebar-[${title}]`} to={path}>
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

export default Wrapper;
