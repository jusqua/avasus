import { Clock, Users } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Main from '@components/Main';
import Breadcrumbs from '@components/Breadcrumbs';
import Pagination from '@components/Pagination';
import Rating from '@components/Rating';
import instance from '@utils/api';

function Courses() {
  const [categorieType, setCategorieType] = useState('');
  const [orderType, setOrder] = useState('desc');
  const [filterType, setFilter] = useState('avaliacao');

  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [limit, setLimit] = useState(0);
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [multiplier] = useState(6);

  useEffect(() => {
    if (categories.length !== 0) {
      instance
        .get(
          `/cursos?cateroria=${categorieType}&_sort${filterType}&_order=${orderType}&_start=${index}&_limit=${multiplier}`,
        )
        .then((response) => {
          setData(response.data);
          setLimit(response.headers['x-total-count']);
          setLength(Math.round(response.headers['x-total-count'] / multiplier));
          setLoaded(true);
        })
        .catch(() => { });
    } else {
      instance
        .get(`/cursos`)
        .then((response) => {
          const possibleCategories = [
            ...new Set(response.data.map(({ cateroria }) => cateroria)),
          ];
          possibleCategories.sort();
          setCategories(possibleCategories);
          setCategorieType(possibleCategories[0]);
        })
        .catch(() => { });
    }
  }, [
    index,
    limit,
    length,
    multiplier,
    categories,
    categorieType,
    orderType,
    filterType,
  ]);

  return (
    <Main>
      <Breadcrumbs />
      <h1 className="text-4xl text-primary text-center my-4">
        Módulos Educacionais
      </h1>
      <nav className="flex gap-2 my-2">
        <label>
          <input
            type="radio"
            name="modules"
            value="matriculados"
            className="peer hidden"
            defaultChecked
          />
          <p className="btn btn-sm btn-ghost peer-checked:btn-active">
            Mais populares
          </p>
        </label>
        <label>
          <input
            type="radio"
            name="modules"
            value="avalicao"
            className="peer hidden"
          />
          <p className="btn btn-sm btn-ghost peer-checked:btn-active">
            Mais bem avaliados
          </p>
        </label>
        <label>
          <input
            type="radio"
            name="modules"
            value="criado_em"
            className="peer hidden"
          />
          <p className="btn btn-sm btn-ghost peer-checked:btn-active">
            Mais recentes
          </p>
        </label>
      </nav>
      <Pagination
        index={index}
        setIndex={setIndex}
        length={length}
        multiplier={multiplier}
        limit={limit}
        loaded={loaded}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense gap-8 py-4">
          {data.map(
            ({
              id,
              capa,
              titulo,
              parceiros,
              sobre,
              duracao,
              matriculados,
              avaliacao,
            }) => (
              <div
                key={id}
                className="flex flex-col min-h-30 gap-4 rounded-2xl"
              >
                <div className="h-32 w-full rounded-2xl skeleton overflow-hidden">
                  <img
                    src={capa}
                    key={capa}
                    className="object-fill w-full h-full"
                  />
                </div>
                <div className="flex flex-col flex-1 gap-1">
                  <h2 className="text-md">{titulo}</h2>
                  <h3 className="text-sm text-primary">{parceiros}</h3>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <div className="flex items-center justify-center gap-1">
                      <Users
                        size="16"
                        weight="fill"
                        className="fill-primary stroke-primary"
                      />
                      <span className="text-sm">
                        {matriculados.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Clock
                        size="16"
                        weight="fill"
                        className="fill-primary stroke-primary"
                      />
                      <span className="text-sm">{duracao.trim()}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Rating rating={Number.parseFloat(avaliacao)} size="16" />
                    <span className="text-sm">{avaliacao}</span>
                  </div>
                </div>
                <p className="text-sm text-ellipsis overflow-hidden line-clamp-3 opacity-90">
                  {sobre}
                </p>
                <Link
                  className="self-end link link-hover text-sm opacity-80"
                  to={`/courses/${id}`}
                >
                  Ver curso
                </Link>
              </div>
            ),
          )}
        </div>
      </Pagination>
    </Main>
  );
}

export default Courses;
