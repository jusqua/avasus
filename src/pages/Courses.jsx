import {
  Clock,
  GridFour,
  SortAscending,
  SortDescending,
  Users,
  Funnel,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Main from '@components/Main';
import Breadcrumbs from '@components/Breadcrumbs';
import Pagination from '@components/Pagination';
import Rating from '@components/Rating';
import instance from '@utils/api';

function Courses() {
  const [categorieType, setCategorieType] = useState('');
  const [orderType, setOrderType] = useState('desc');
  const [filterType, setFilterType] = useState('matriculados');

  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [limit, setLimit] = useState(0);
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [multiplier] = useState(6);

  function handleOption(setState) {
    return (e) => {
      setIndex(0);
      setLoaded(false);
      setLength(0);
      setLimit(0);
      setState(e.target.value);
    };
  }

  useEffect(() => {
    if (categories.length !== 0) {
      instance
        .get(
          `/cursos?cateroria=${categorieType}&_sort=${filterType}&_order=${orderType}&_start=${index}&_limit=${multiplier}`,
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
      <nav className="flex flex-wrap gap-2 my-2">
        <div className="dropdown">
          <div
            tabIndex="0"
            role="button"
            className="btn btn-sm focus-within:btn-active overflow-hidden"
          >
            <GridFour
              weight="fill"
              size="20"
              className="fill-primary pointer-events-none"
            />
            <span className="flex items-center relative min-w-12 h-full">
              {categorieType || (
                <div className="absolute inset-0 w-24 skeleton rounded-none"></div>
              )}
            </span>
          </div>
          <ul
            tabIndex="0"
            className="menu dropdown-content z-[1] bg-base-200 shadow"
          >
            {categories.map((e, i) => (
              <li key={i}>
                <label>
                  <input
                    type="radio"
                    name="categories"
                    value={e}
                    className="hidden"
                    onChange={handleOption(setCategorieType)}
                    checked={e === categorieType}
                  />
                  <p>{e}</p>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="dropdown">
          <div
            tabIndex="0"
            role="button"
            className="btn btn-sm focus-within:btn-active"
          >
            {orderType === 'asc' ? (
              <SortAscending
                weight="fill"
                size="20"
                className="fill-primary pointer-events-none"
              />
            ) : (
              <SortDescending
                weight="fill"
                size="20"
                className="fill-primary pointer-events-none"
              />
            )}
            {orderType === 'asc' ? 'Crescente' : 'Decrescente'}
          </div>
          <ul
            tabIndex="0"
            className="menu dropdown-content z-[1] bg-base-200 rounded-lg shadow"
          >
            {[
              { title: 'Crescente', value: 'asc' },
              { title: 'Decrescente', value: 'desc' },
            ].map(({ title, value }) => (
              <li key={value}>
                <label>
                  <input
                    type="radio"
                    name="orders"
                    value={value}
                    className="hidden"
                    checked={value === orderType}
                    onChange={handleOption(setOrderType)}
                  />
                  <p>{title}</p>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="dropdown">
          <div
            tabIndex="0"
            role="button"
            className="btn btn-sm focus-within:btn-active"
          >
            <Funnel
              weight="fill"
              size="20"
              className="fill-primary pointer-events-none"
            />
            {
              {
                matriculados: 'Popularidade',
                avaliacao: 'Avaliação',
                criado_em: 'Data',
              }[filterType]
            }
          </div>
          <ul
            tabIndex="0"
            className="menu dropdown-content z-[1] bg-base-200 rounded-lg shadow"
          >
            {[
              { title: 'Popularidade', value: 'matriculados' },
              { title: 'Avaliação', value: 'avaliacao' },
              { title: 'Data', value: 'criado_em' },
            ].map(({ title, value }) => (
              <li key={value}>
                <label>
                  <input
                    type="radio"
                    name="filters"
                    value={value}
                    className="hidden"
                    checked={value === filterType}
                    onChange={handleOption(setFilterType)}
                  />
                  <p>{title}</p>
                </label>
              </li>
            ))}
          </ul>
        </div>
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
          {!loaded
            ? Array.from({ length: multiplier }).map((_, i) => (
              <div key={i} className="flex flex-col min-h-30 gap-4">
                <div className="h-32 w-full rounded-2xl skeleton overflow-hidden"></div>
                <div className="flex flex-col gap-1">
                  <div className="h-6 w-48 skeleton"></div>
                  <div className="h-5 w-32 skeleton"></div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <div className="flex items-center w-16 h-4 justify-center gap-1 skeleton"></div>
                    <div className="flex items-center w-16 h-4 justify-center gap-1 skeleton"></div>
                  </div>
                  <div className="flex items-center w-32 h-4 justify-center gap-1 skeleton"></div>
                </div>
                <div className="flex flex-col w-full gap-1">
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-24"></div>
                </div>
                <div className="self-end skeleton h-4 w-16"></div>
              </div>
            ))
            : data.map(
              (
                {
                  id,
                  capa,
                  titulo,
                  parceiros,
                  sobre,
                  duracao,
                  matriculados,
                  avaliacao,
                },
                i,
              ) => (
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
                      <Rating
                        rating={Number.parseFloat(avaliacao)}
                        size="16"
                      />
                      <span className="text-sm">{avaliacao}</span>
                    </div>
                  </div>
                  <p className="text-sm text-ellipsis overflow-hidden line-clamp-3 opacity-90">
                    {sobre}
                  </p>
                  <Link
                    className="self-end link link-hover text-sm opacity-80"
                    to={`/courses/${id}`}
                    state={data[i]}
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
