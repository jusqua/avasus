import { useState, useEffect } from 'react';
import { Clock, Users } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import SlideImg from '@assets/slide-img.png';
import LogoColour from '@assets/logo-colour.svg';
import Carousel from '@components/Carousel';
import Main from '@components/Main';
import Rating from '@components/Rating';
import instance from '@utils/api';

function Home() {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState('matriculados');

  function handleSortBy(e) {
    setSortBy(e.target.value);
  }

  useEffect(() => {
    instance
      .get('/cursos', {
        params: { _sort: sortBy, _order: 'desc', _page: 1, _limit: 3 },
      })
      .then((response) => setData(response.data))
      .catch(() => { });
  }, [data, sortBy]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <Carousel slideshow={[SlideImg, SlideImg, SlideImg]} />
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-2 h-full w-full pointer-events-none opacity-90">
          <img
            src={LogoColour}
            alt="AVASUS"
            className="brightness-0 invert w-1/3 drop-shadow-lg"
          />
          <div className="rounded w-1/6 border sm:border-2"></div>
          <p className="text-white text-center text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-6xl drop-shadow-lg">
            Conhecimento Aberto em Saúde
          </p>
        </div>
      </div>
      <Main>
        <h1 className="text-2xl text-primary text-center my-8">
          Módulos Educacionais
        </h1>
        <div className="flex flex-col gap-4">
          <nav className="flex gap-2">
            <label>
              <input
                type="radio"
                name="modules"
                value="matriculados"
                className="peer hidden"
                onChange={handleSortBy}
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
                onChange={handleSortBy}
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
                onChange={handleSortBy}
              />
              <p className="btn btn-sm btn-ghost peer-checked:btn-active">
                Mais recentes
              </p>
            </label>
          </nav>
          {data.length === 0
            ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-30 w-full bg-base-200 rounded-2xl skeleton p-12"
              ></div>
            ))
            : data.map(
              (
                {
                  id,
                  capa,
                  titulo,
                  parceiros,
                  matriculados,
                  duracao,
                  avaliacao,
                },
                i,
              ) => (
                <div
                  key={id}
                  className="flex flex-col md:flex-row h-30 bg-base-200 gap-4 p-4 rounded-2xl"
                >
                  <div className="flex gap-4 flex-1 items-center">
                    <div className="h-20 w-20 rounded-2xl skeleton overflow-hidden">
                      <img
                        src={capa}
                        key={capa}
                        className="object-fit w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col flex-1 justify-evenly w-32">
                      <Link
                        to={`/courses/${id}`}
                        state={data[i]}
                        className="text-md lg:text-xl link link-hover"
                      >
                        {titulo}
                      </Link>
                      <h3 className="text-sm lg:text-md text-primary">
                        {parceiros}
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 self-center">
                    <div className="flex flex-col md:flex-row gap-2 sm:gap-4">
                      <div className="flex gap-4">
                        <div className="flex items-center justify-center gap-2">
                          <Users
                            size="20"
                            weight="fill"
                            className="fill-primary stroke-primary"
                          />
                          <span>{matriculados.toLocaleString('pt-BR')}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <Clock
                            size="20"
                            weight="fill"
                            className="fill-primary stroke-primary"
                          />
                          <span>{duracao.trim()}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Rating rating={Number.parseFloat(avaliacao)} />
                        <span>{avaliacao}</span>
                      </div>
                    </div>
                    <Link
                      className="self-center btn btn-sm btn-neutral rounded-full"
                      to={`/courses/${id}`}
                      state={data[i]}
                    >
                      Ver módulo
                    </Link>
                  </div>
                </div>
              ),
            )}
          <Link
            className="self-center btn btn-sm btn-wide btn-neutral rounded-full"
            to="/courses"
          >
            Ver mais
          </Link>
        </div>
        <div className="mt-16 flex flex-col items-center gap-8">
          <h1 className="text-2xl text-primary text-center">Parceiros</h1>
          <div className="flex flex-col md:flex-row bg-base-200 p-4 rounded-2xl">
            <div className="text-center">
              <h2 className="text-lg">Governo RN</h2>
              <p className="opacity-80">
                Governo do Estado do Rio Grande do Norte
              </p>
            </div>
            <div className="divider md:divider-horizontal"></div>
            <div className="text-center">
              <h2 className="text-lg text-black">SESAP</h2>
              <p className="opacity-80">
                Secretaria de Saúde Pública do Estado do Rio Grande do Norte.
              </p>
            </div>
            <div className="divider md:divider-horizontal"></div>
            <div className="text-center">
              <h2 className="text-lg text-black">UFRN</h2>
              <p className="opacity-80">
                Universidade Federal do Rio Grande do Norte.
              </p>
            </div>
            <div className="divider md:divider-horizontal"></div>
            <div className="text-center">
              <h2 className="text-lg text-black">HUOL</h2>
              <p className="opacity-80">
                Hospital Onofre Lopes: Hospital Universitário da UFRN
                (Universidade Federal do Rio Grande do Norte).
              </p>
            </div>
          </div>
          <Link
            className="self-center btn btn-sm btn-wide btn-neutral rounded-full"
            to="/partners"
          >
            Ver mais
          </Link>
        </div>
      </Main>
    </div>
  );
}

export default Home;
