import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { CalendarCheck, Clock, Users } from '@phosphor-icons/react';

import Main from '@components/Main';
import Breadcrumbs from '@components/Breadcrumbs';
import Rating from '@components/Rating';
import instance from '@utils/api';

function Module() {
  const { id } = useParams();
  const { state } = useLocation();
  const [data, setData] = useState(state || {});

  useEffect(() => {
    if (state === null) {
      instance
        .get(`/cursos/${id}`)
        .then((response) => setData(response.data))
        .catch(() => { });
    }
  }, [data, state, id]);

  if (!Object.keys(data).length) return null;

  return (
    <div className="flex flex-1 flex-col w-full items-center">
      <div className="relative flex w-full flex-1 justify-center min-h-64 bg-base-content">
        <img
          src={data?.capa}
          className="absolute top-0 left-0 h-full w-full object-cover brightness-50"
        />
        <div className="w-full lg:w-[1024px] p-4 flex flex-col *:text-white justify-between z-[1]">
          <Breadcrumbs title={data?.titulo} loaded={Boolean(data?.titulo)} />
          <h1 className="text-2xl lg:text-4xl">{data?.titulo}</h1>
          <p className="text-md lg:text-xl">{data?.parceiros}</p>
        </div>
      </div>
      <Main>
        <h2 className="text-center text-3xl text-primary">
          Informações Gerais do Curso
        </h2>
        <div className="flex flex-wrap my-6 gap-2 justify-evenly text-xl">
          <div className="flex items-center justify-center gap-1">
            <Clock size="24" weight="fill" className="fill-primary" />
            <span>{data.duracao?.trim()}</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <CalendarCheck size="24" weight="fill" className="fill-primary" />
            <span>Desde {data?.criado_em}</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <Users size="24" weight="fill" className="fill-primary" />
            <span>
              {data.matriculados?.toLocaleString('pt-BR')} alunos matriculados
            </span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <Rating rating={Number.parseFloat(data?.avaliacao)} size="24" />
            <span>
              {data?.avaliacao} (
              {data.numero_avaliacoes?.toLocaleString('pt-BR')})
            </span>
          </div>
        </div>
        <h3 className="text-center text-xl text-primary my-4">Sobre o curso</h3>
        <p className="text-justify">{data?.sobre}</p>
        <h3 className="text-center text-xl text-primary my-4">Objetivos</h3>
        <h4 className="text-lg text-black mb-2">Objetivos Gerais</h4>
        <p className="text-justify my-1">{data?.objetivo_geral}</p>
        <h4 className="text-lg text-black mb-2">Objetivos Específicos</h4>
        <p className="text-justify my-1">{data?.objetivo_especifico}</p>
        <h3 className="text-center text-xl text-primary my-4">Conteúdo</h3>
        <ul className="list-disc flex flex-col gap-1 pl-4">
          {data.conteudo?.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
        <h3 className="text-center text-xl text-primary my-4">
          Recursos educacionais
        </h3>
        <p className="text-center">
          Serão utilizados textos no formato de PDF, vídeos, ilustrações,
          infográficos, dentre outros recursos.
        </p>
        <h3 className="text-center text-xl text-primary my-4">Créditos</h3>
        <div className="flex flex-wrap justify-evenly items-center">
          {data.creditos?.map(({ capa, titulo }) => (
            <img
              key={capa}
              src={capa}
              alt={titulo}
              className="w-56 object-contain"
            />
          ))}
        </div>
      </Main>
    </div>
  );
}

export default Module;
