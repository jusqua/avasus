import { useLocation, useMatches, Link } from 'react-router-dom';

function Breadcrumbs({ title, loaded = true }) {
  const location = useLocation();
  const matches = useMatches();
  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb());

  if (title) crumbs.push(<Link to={location.pathname}>{title}</Link>);

  if (!loaded) return <div className="max-w-xs h-4 my-2 skeleton"></div>;

  return (
    <div className="max-w-full text-sm breadcrumbs my-2 scrollbar-none">
      <ul>
        {crumbs.map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>
    </div>
  );
}

export default Breadcrumbs;
