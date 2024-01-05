import { useLocation } from 'react-router-dom';

function Breadcrumbs() {
  const location = useLocation();

  if (location.pathname === '/') return null;

  return (
    <div className="max-w-xs text-sm breadcrumbs my-2">
      <ul>
        <li>Início</li>
      </ul>
    </div>
  );
}

export default Breadcrumbs;
