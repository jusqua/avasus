import { useLocation } from 'react-router-dom';

import routes from '@utils/routes';

function Breadcrumbs() {
  const location = useLocation();

  return (
    <div className="max-w-xs text-sm breadcrumbs my-2">
      <ul>
        <li>Início</li>
      </ul>
    </div>
  );
}

export default Breadcrumbs;
