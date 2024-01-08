import { SmileyXEyes } from '@phosphor-icons/react';
import { useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Error() {
  const error = useRouteError();

  return (
    <div className="flex flex-col my-16 gap-4 justify-center items-center">
      <SmileyXEyes size="256" />
      <h1 className="text-2xl md:text-8xl text-center">
        Desculpe-nos<i>!</i>
      </h1>
      <p className="text-sm md:text-2xl text-center">Algo deu errado</p>
      <p className="text-sm md:text-2xl text-center bg-base-200 p-4 rounded-xl">
        {error.statusText || error.message}
      </p>
      <Link className="btn btn-md btn-warning" to="/">
        Me tire daqui
      </Link>
    </div>
  );
}

export default Error;
