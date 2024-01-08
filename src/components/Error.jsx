import { SmileyXEyes } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <div className="flex flex-col my-16 gap-4 justify-center items-center">
      <SmileyXEyes size="256" />
      <h1 className="text-2xl md:text-8xl text-center">
        Desculpe-nos<i>!</i>
      </h1>
      <p className="text-sm md:text-2xl text-center">
        A página que está procurando não existe
      </p>
      <Link className="btn btn-lg btn-warning" to="/">
        Me tire daqui
      </Link>
    </div>
  );
}

export default Error;
