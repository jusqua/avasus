import { MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

const maxPaginationItems = 5;

function getPaginationList(index, length) {
  const firstCountLimit = Math.round(maxPaginationItems / 2);
  const after = [];
  const before = [];

  let remains = maxPaginationItems - 1;

  for (let i = 1; index - i > 0 && i < firstCountLimit; i++, remains--)
    after.push(index - i);

  if (index !== 0 && index !== length - 1) {
    remains--;
    before.push(index);
  }

  for (let i = 1; index + i < length - 1 && i < firstCountLimit; i++, remains--)
    before.push(index + i);

  for (
    let i = after[after.length - 1] - 1;
    i > 0 && remains > 0;
    i--, remains--
  )
    after.push(i);

  for (
    let i = before[before.length - 1] + 1;
    i < length - 1 && remains > 0;
    i++, remains--
  )
    before.push(i);

  return [...after.reverse(), ...before];
}

function Pagination({ index, setIndex, length, multiplier, limit, children }) {
  if (length < 1) return null;

  return (
    <div className="flex flex-col">
      <p className="text-gray-500 italic font-normal">
        {Math.min((index + 1) * multiplier, limit)} de {limit} resultados
      </p>
      {children}
      <div className="join self-center my-2">
        <button
          className="join-item btn btn-sm btn-square"
          disabled={index === 0}
          onClick={() => setIndex(Math.max(0, index - 1))}
        >
          <ChevronLeft size="16" />
        </button>
        <input
          className="join-item btn btn-sm btn-square"
          type="radio"
          name="pagination"
          value={0}
          aria-label={1}
          onChange={() => setIndex(0)}
          checked={index === 0}
        />
        {index < 5 ? null : (
          <button className="join-item btn btn-sm btn-square" disabled>
            <MoreHorizontal size="16" />
          </button>
        )}
        {getPaginationList(index, length).map((e) => (
          <input
            key={e}
            className="join-item btn btn-sm btn-square"
            type="radio"
            name="pagination"
            value={e}
            aria-label={e + 1}
            onChange={() => setIndex(e)}
            checked={index === e}
          />
        ))}
        {length - 5 < index ? null : (
          <button className="join-item btn btn-sm btn-square" disabled>
            <MoreHorizontal size="16" />
          </button>
        )}
        <input
          className="join-item btn btn-sm btn-square"
          type="radio"
          name="pagination"
          value={length - 1}
          aria-label={length}
          onChange={() => setIndex(length - 1)}
          checked={index === length - 1}
        />
        <button
          className="join-item btn btn-sm btn-square"
          disabled={index === length - 1}
          onClick={() => setIndex(Math.min(index + 1, length - 1))}
        >
          <ChevronRight size="16" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
