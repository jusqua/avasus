import { useMatches } from 'react-router-dom';

function Breadcrumbs() {
  const matches = useMatches();
  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb(match.data));

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
