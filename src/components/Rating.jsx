import { Star, StarHalf } from '@phosphor-icons/react';

function Rating({ rating, size = '20' }) {
  const full = Number.parseInt(rating);
  const half = +(rating - full >= 0.5);
  const empty = 5 - half - full;

  return (
    <div className="flex gap-1">
      {[...Array(full).keys()].map((e) => (
        <Star size={size} weight="fill" className="fill-primary" key={e} />
      ))}
      {!half ? null : (
        <StarHalf size={size} weight="fill" className="fill-primary" />
      )}
      {[...Array(empty).keys()].map((e) => (
        <Star size={size} key={e} />
      ))}
    </div>
  );
}

export default Rating;
