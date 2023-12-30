import LogoColour from '@assets/logo-colour.svg';
import LaisLogo from '@assets/lais-logo.svg';
import UfrnLogo from '@assets/ufrn-logo.svg';
import { Search, Menu, X, Facebook, Twitter, Instagram } from 'lucide-react';

export function Wrapper({ routes, children }) {
  return (
    <div className="drawer drawer-end min-h-screen">
      <input id="navbar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <nav className="flex justify-center shadow">
          <header className="navbar p-4 xl:w-[1280px] gap-2">
            <a href="/">
              <img src={LogoColour} className="sm:h-8 h-6" alt="AVASUS" />
            </a>
            <div className="hidden lg:flex">
              {routes.map(e => <a className="btn btn-sm btn-ghost" href={e[1]}>{e[0]}</a>)}
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
              <a className="btn btn-sm btn-outline border-neutral hover:bg-neutral hover:border-neutral rounded-full px-6" href="#">Entrar</a>
              <a className="btn btn-sm btn-neutral rounded-full px-6" href="#">Cadastrar</a>
            </div>
            <div className="flex justify-end lg:hidden">
              <label htmlFor="navbar-drawer" aria-label="Abrir menu lateral" className="btn btn-square btn-ghost">
                <Menu className="stroke-neutral" />
              </label>
            </div>
          </header>
        </nav>
        <main className="flex-1">
          {children}
        </main>
        <footer className="flex flex-col w-full text-white">
          <div className="bg-primary flex flex-col gap-8 p-8">
            <p className="text-center">Realização</p>
            <div className="flex gap-24 justify-center">
              <img src={LaisLogo} alt="Logo da LAIS" />
              <img src={UfrnLogo} alt="Logo da UFRN" />
            </div>
          </div>
          <div className="footer bg-[#323237] p-6 justify-evenly">
            <aside>
              <img src={LaisLogo} alt="Logo da LAIS" className="h-12" />
              <p className="opacity-60">Laboratório de Inovação <br /> Tecnológica em Saúde.</p>
            </aside>
            <nav>
              <header className="text-lg footer-title opacity-100">Links úteis</header>
              {routes.map(e => <a className="link link-hover opacity-60" href={e[1]}>{e[0]}</a>)}
            </nav>
            <nav>
              <header className="text-lg footer-title opacity-100">Redes Sociais</header>
              <div className="flex gap-8">
                <a className="link">
                  <Facebook strokeWidth={.5} className="stroke-white fill-white" />
                </a>
                <a className="link">
                  <Twitter strokeWidth={.5} className="stroke-white fill-white" />
                </a>
                <a className="link">
                  <Instagram strokeWidth={2} className="stroke-white" />
                </a>
              </div>
            </nav>
          </div>
          <p className="bg-[#424146] text-white text-center p-4">
            {new Date().getFullYear()} © LAIS (HUOL). Todos os direitos reservados
          </p>
        </footer>
      </div >
      <div className="drawer-side">
        <nav className="p-4 w-full sm:w-72 min-h-full bg-base-200">
          <header className="flex flex-row-reverse items-center justify-between">
            <label htmlFor="navbar-drawer" aria-label="Fechar barra lateral" className="btn btn-square btn-ghost self-end">
              <X className="stroke-neutral" />
            </label>
            <img src={LogoColour} className="h-6 sm:hidden" alt="AVASUS" />
          </header>
          <ul className="menu items-center sm:items-end">
            {routes.map(e => <li><a href={e[1]}>{e[0]}</a></li>)}
          </ul>
        </nav>
      </div>
    </div>
  );
}
