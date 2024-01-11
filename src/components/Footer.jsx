import {
  FacebookLogo,
  TwitterLogo,
  InstagramLogo,
} from '@phosphor-icons/react';
import { NavLink } from 'react-router-dom';

import LaisLogo from '@assets/lais-logo.svg';
import UfrnLogo from '@assets/ufrn-logo.svg';
import routes from '@utils/routes';

function Footer() {
  const navbarRoutes = routes[0].children
    .filter((match) => Boolean(match.handle?.title))
    .map((match) => ({ path: match.path, title: match.handle.title }));

  return (
    <footer className="flex flex-col w-full mt-16 text-white">
      <div className="bg-primary flex flex-col gap-4 sm:gap-8 p-8">
        <p className="text-center">Realização</p>
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-24 justify-center">
          <img src={LaisLogo} alt="Logo da LAIS" className="h-12 sm:h-auto" />
          <img src={UfrnLogo} alt="Logo da UFRN" className="h-12 sm:h-auto" />
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
          {navbarRoutes.map(({ path, title }, i) => (
            <NavLink key={i} className="link link-hover opacity-60" to={path}>
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
              <FacebookLogo size="24" weight="fill" color="white" />
            </a>
            <a href="#" className="link">
              <TwitterLogo size="24" weight="fill" color="white" />
            </a>
            <a href="#" className="link">
              <InstagramLogo size="24" weight="bold" color="white" />
            </a>
          </div>
        </nav>
      </div>
      <p className="bg-[#424146] text-white text-center p-4">
        {new Date().getFullYear()} © LAIS (HUOL). Todos os direitos reservados
      </p>
    </footer>
  );
}

export default Footer;
