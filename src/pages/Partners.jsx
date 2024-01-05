import { useState, useEffect } from 'react';

import instance from '@utils/api';
import Body from '@components/Body';
import Pagination from '@components/Pagination';
import Breadcrumbs from '@components/Breadcrumbs';

function Partners() {
  const [partners, setPartners] = useState([]);

  const [loaded, setLoaded] = useState(false);
  const [limit, setLimit] = useState(0);
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [multiplier] = useState(6);

  useEffect(() => {
    instance
      .get(`/parceiros?_start=${index}&_limit=${multiplier}`)
      .then((response) => {
        setPartners(response.data);
        if (!loaded) {
          setLimit(response.headers['x-total-count']);
          setLength(Math.round(response.headers['x-total-count'] / multiplier));
          setLoaded(true);
        }
      });
    return () => { };
  }, [index, length, multiplier, limit, loaded]);

  return (
    <Body>
      <Breadcrumbs />
      <h1 className="text-2xl text-primary my-4">Nosso Parceiros</h1>
      <Pagination
        index={index}
        setIndex={setIndex}
        length={length}
        multiplier={multiplier}
        limit={limit}
        loaded={loaded}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense gap-8 py-4">
          {!loaded
            ? [...Array(multiplier).keys()].map((e) => (
              <div className="flex flex-col gap-1" key={e}>
                <div className="skeleton h-48"></div>
                <p className="skeleton py-2"></p>
              </div>
            ))
            : partners.map(({ id, capa, titulo }) => (
              <div key={id}>
                <div className="flex justify-center h-48">
                  <img className="object-contain" src={capa} />
                </div>
                <p className="py-2 text-center border-t border-primary h-24">
                  {titulo}
                </p>
              </div>
            ))}
        </div>
      </Pagination>
    </Body>
  );
}

export default Partners;
