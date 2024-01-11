import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useMatches } from 'react-router-dom';

function Breadcrumbs({ title, loaded = true }) {
  const location = useLocation();
  const matches = useMatches();
  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb());

  if (title) crumbs.push(<Link to={location.pathname}>{title}</Link>);

  if (!loaded) return <div className="max-w-xs h-4 my-2 skeleton"></div>;

  return (
    <div className="max-w-xs text-sm breadcrumbs my-2">
      <ul>
        {crumbs.map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>
    </div>
  );
}

export default Breadcrumbs;
