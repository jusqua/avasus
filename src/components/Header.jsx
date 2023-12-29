import LogoColour from '@assets/logo-colour.svg';

export function Header({ routes } ) {
  return (
    <header className="flex justify-center shadow">
      <div className="navbar p-4 xl:w-[1280px]">
        <a className="flex-none" href="/">
          <img src={LogoColour} className="h-10" alt="AVASUS"/>
        </a>
        <div className="flex-1 mx-2 gap-2">
          {routes.map(e => <a className="btn btn-sm btn-ghost" href={e[1]}>{e[0]}</a>)}
        </div>
        <div className="flex-none gap-2">
          <a className="btn btn-sm btn-outline rounded-full px-6" href="#">Entrar</a>
          <a className="btn btn-sm btn-neutral rounded-full px-6" href="#">Cadastrar</a>
        </div>
      </div>
    </header>
  );
}
