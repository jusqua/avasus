import { MoreHorizontal } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

import instance from '@utils/api';
import Body from '@components/Body';

function Partners() {
  const [partners, setPartners] = useState([]);
  const [partnersLimit, setPartnersLimit] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [multiplier] = useState(6);

  function getJoinItems(index) {
    const after = [];
    for (let i = 1; index - i > 0 && i < 3; i++) after.push(index - i);

    const before = [];
    if (index !== 0 && index !== end - 1) before.push(index);
    for (let i = 1; index + i < end && i < 3; i++) before.push(index + i);
    return [...after.reverse(), ...before];
  }

  function handleJoinButton(position) {
    return () => {
      document.getElementById(`join-item-${start + position}`).checked = true;
      setStart(start + position);
    };
  }

  function handleJoinRadio(index) {
    return () => {
      setStart(index);
    };
  }

  useEffect(() => {
    return () =>
      instance
        .get(`/parceiros?_start=${start}&_limit=${multiplier}`)
        .then((response) => {
          setPartners(response.data);
          setPartnersLimit(response.headers['x-total-count']);
          setEnd(Math.round(response.headers['x-total-count'] / multiplier));
        });
  }, [start, multiplier]);

  // useEffect(getPartners, []);

  return (
    <Body>
      <h1 className="text-2xl text-primary my-4">Nosso Parceiros</h1>
      <p className="text-gray-500 italic font-normal">
        {Math.min((start + 1) * multiplier, partnersLimit)} de {partnersLimit}{' '}
        resultados
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense gap-8 py-4">
        {partners.length === 0
          ? [...Array(6).keys()].map((e) => (
            <div className="flex flex-col gap-1" key={e}>
              <div className="skeleton h-48"></div>
              <p className="skeleton py-2"></p>
            </div>
          ))
          : partners.map(({ id, capa, titulo }) => (
            <div key={id}>
              <div className="flex justify-center h-48">
                <img className="self-center" src={capa} />
              </div>
              <p className="py-2 text-center border-t border-primary">
                {titulo}
              </p>
            </div>
          ))}
      </div>
      {!partnersLimit ? null : (
        <div className="join self-center my-2">
          <button
            className="join-item btn btn-sm btn-square"
            disabled={start === 0}
            onClick={handleJoinButton(-1)}
          >
            <ChevronLeft size="16" />
          </button>
          <input
            className="join-item btn btn-sm btn-square"
            type="radio"
            name="pagination"
            value={0}
            aria-label={1}
            id="join-item-0"
            onClick={handleJoinRadio(0)}
            checked
          />
          {start < 5 ? null : (
            <button className="join-item btn btn-sm btn-square" disabled>
              <MoreHorizontal size="16" />
            </button>
          )}
          {getJoinItems(start).map((e) => (
            <input
              key={e}
              className="join-item btn btn-sm btn-square"
              type="radio"
              name="pagination"
              value={e}
              aria-label={e + 1}
              id={`join-item-${e}`}
              onClick={handleJoinRadio(e)}
            />
          ))}
          {end - 5 < start ? null : (
            <button className="join-item btn btn-sm btn-square" disabled>
              <MoreHorizontal size="16" />
            </button>
          )}
          {start === end ? null : (
            <input
              className="join-item btn btn-sm btn-square"
              type="radio"
              name="pagination"
              value={end - 1}
              aria-label={end}
              id={`join-item-${end - 1}`}
              onClick={handleJoinRadio(end - 1)}
            />
          )}
          <button
            className="join-item btn btn-sm btn-square"
            disabled={(start + 1) * multiplier >= partnersLimit}
            onClick={handleJoinButton(1)}
          >
            <ChevronRight size="16" />
          </button>
        </div>
      )}
    </Body>
  );
}

export default Partners;
