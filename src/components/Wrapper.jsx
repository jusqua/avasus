import LogoColour from '@assets/logo-colour.svg';

export function Wrapper({ routes, children }) {
  return (
    <div className="drawer drawer-end">
      <input id="navbar-drawer" type="checkbox" className="drawer-toggle"/>
      <div className="drawer-content">
        <header className="flex justify-center shadow">
          <div className="navbar p-4 xl:w-[1280px]">
            <a className="flex-none" href="/">
              <img src={LogoColour} className="h-10" alt="AVASUS"/>
            </a>
            <div className="flex-1 mx-2 gap-2 hidden lg:flex">
              {routes.map(e => <a className="btn btn-sm btn-ghost" href={e[1]}>{e[0]}</a>)}
            </div>
            <div className="flex-none hidden gap-2 lg:flex">
              <a className="btn btn-sm btn-outline rounded-full px-6" href="#">Entrar</a>
              <a className="btn btn-sm btn-neutral rounded-full px-6" href="#">Cadastrar</a>
            </div>
            <div className="flex flex-1 justify-end lg:hidden">
              <label htmlFor="navbar-drawer" aria-label="Abrir menu lateral" className="btn btn-square btn-ghost">Menu</label>
            </div>
          </div>
        </header>
        <main>
          { children }
        </main>
        <footer>
          Footer
        </footer>
      </div>
      <div className="drawer-side">
        <label htmlFor="navbar-drawer" aria-label="Fechar barra lateral" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-72 min-h-full bg-base-200">
          {routes.map(e => <li><a href={e[1]}>{e[0]}</a></li>)}
        </ul>
      </div>
    </div>
  );
}
