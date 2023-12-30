import LogoColour from '@assets/logo-colour.svg';
import { Search, Menu, X } from 'lucide-react';

export function Wrapper({ routes, children }) {
  return (
    <div className="drawer drawer-end">
      <input id="navbar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <header className="drawer-content flex justify-center shadow">
          <div className="navbar p-4 xl:w-[1280px] gap-2">
            <a href="/">
              <img src={LogoColour} className="sm:h-8 h-6" alt="AVASUS" />
            </a>
            <div className="hidden lg:flex">
              {routes.map(e => <a className="btn btn-sm btn-ghost" href={e[1]}>{e[0]}</a>)}
            </div>
            <div className="flex-1 justify-end">
              <label htmlFor="query" className="relative">
                <Search className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 stroke-gray-600" />
                <input
                  id="query"
                  name="query"
                  className="input input-bordered input-sm w-full rounded-full pl-10"
                  type="text"
                  placeholder="Buscar"
                />
              </label>
            </div>
            <div className="flex-none hidden gap-2 lg:flex">
              <a className="btn btn-sm btn-outline rounded-full px-6" href="#">Entrar</a>
              <a className="btn btn-sm btn-neutral rounded-full px-6" href="#">Cadastrar</a>
            </div>
            <div className="flex justify-end lg:hidden">
              <label htmlFor="navbar-drawer" aria-label="Abrir menu lateral" className="btn btn-square btn-ghost">
                <Menu className="stroke-gray-500" />
              </label>
            </div>
          </div>
        </header>
        <main>
          {children}
        </main>
        <footer>
          Footer
        </footer>
      </div >
      <div className="drawer-side">
        <div className="p-4 w-full sm:w-72 min-h-full bg-base-200">
          <div className="flex flex-row-reverse items-center justify-between">
            <label htmlFor="navbar-drawer" aria-label="Fechar barra lateral" className="btn btn-square btn-ghost self-end">
              <X className="stroke-gray-600" />
            </label>
            <img src={LogoColour} className="h-6 sm:hidden" alt="AVASUS" />
          </div>
          <ul className="menu items-center sm:items-end">
            {routes.map(e => <li><a href={e[1]}>{e[0]}</a></li>)}
          </ul>
        </div>
      </div>
    </div >
  );
}
