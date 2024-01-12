import { DotsThree, CaretLeft, CaretRight } from '@phosphor-icons/react';

const maxPaginationItems = 5;
const firstCountLimit = Math.round(maxPaginationItems / 2);

function getPaginationList(index, length) {
  const after = [];
  const before = [];

  let remains = maxPaginationItems - 1;
  remains += (index >= length - firstCountLimit - 1) * 2;
  remains += (index < firstCountLimit + 1) * 2;

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

function Pagination({
  index,
  setIndex,
  length,
  multiplier,
  limit,
  loaded = true,
  children,
}) {
  function handleClick(index) {
    return () => setIndex(index);
  }

  function PaginationItem() {
    return (
      <div className="join my-2">
        <button
          className="join-item btn btn-sm btn-square"
          disabled={index === 0}
          onClick={handleClick(Math.max(0, index - 1))}
        >
          <CaretLeft weight="bold" />
        </button>
        <input
          className="join-item btn btn-sm btn-square"
          type="radio"
          value={0}
          aria-label={1}
          onChange={handleClick(0)}
          checked={index === 0}
        />
        {index < firstCountLimit + 1 ? null : (
          <button className="join-item btn btn-sm btn-square" disabled>
            <DotsThree weight="bold" />
          </button>
        )}
        {getPaginationList(index, length).map((e) => (
          <input
            key={e}
            className="join-item btn btn-sm btn-square"
            type="radio"
            value={e}
            aria-label={e + 1}
            onChange={handleClick(e)}
            checked={index === e}
          />
        ))}
        {index >= length - firstCountLimit - 1 ? null : (
          <button className="join-item btn btn-sm btn-square" disabled>
            <DotsThree weight="bold" />
          </button>
        )}
        <input
          className="join-item btn btn-sm btn-square"
          type="radio"
          value={length - 1}
          aria-label={length}
          onChange={handleClick(length - 1)}
          checked={index === length - 1}
        />
        <button
          className="join-item btn btn-sm btn-square"
          disabled={index === length - 1}
          onClick={handleClick(Math.min(index + 1, length - 1))}
        >
          <CaretRight weight="bold" />
        </button>
      </div>
    );
  }

  if (!loaded)
    return (
      <div className="flex flex-col gap-1">
        <div className="skeleton h-4 w-64"></div>
        <div className="self-center md:hidden skeleton w-72 h-8"></div>
        <div className="flex-grow-1">{children}</div>
        <div className="self-center skeleton w-72 h-8"></div>
      </div>
    );

  return (
    <div className="flex flex-col">
      <i className="text-gray-500 font-normal">
        {Math.min((index + 1) * multiplier, limit)} de {limit} resultados
      </i>
      <div className="self-center md:hidden">
        <PaginationItem />
      </div>
      <div className="flex-grow-1">{children}</div>
      <div className="self-center">
        <PaginationItem />
      </div>
    </div>
  );
}

export default Pagination;
