import { useEffect, useState } from 'react';
import {
  UsersFour,
  FileArrowUp,
  GraduationCap,
  Certificate,
  IconContext,
  Person,
  Coins,
  User,
  Money,
} from '@phosphor-icons/react';

import instance from '@utils/api';
import Breadcrumbs from '@components/Breadcrumbs';

function GeneralDataItem({ icon, title, content }) {
  return (
    <div className="flex flex-col gap-1 justify-center text-center">
      <span className="flex gap-1 items-center justify-center">
        {icon}
        <p className="text-sm">{title}</p>
      </span>
      <p className="text-2xl text-primary">{content}</p>
    </div>
  );
}

function Transparency() {
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    instance
      .get('/transparecia')
      .then((response) => {
        if (!loaded) {
          setData(response.data);
          setLoaded(true);
        }
      })
      .catch(() => { });

    return () => { };
  }, [data, loaded]);

  return (
    <>
      <Breadcrumbs />
      <h1 className="text-4xl text-primary text-center my-4">Transparência</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 grid-flow-row-dense gap-6 *:rounded-2xl *:bg-base-200 *:shadow-md">
        <div className="flex col-span-2 h-64">
          {!loaded ? (
            <div className="skeleton w-full h-full"></div>
          ) : (
            <div className="flex flex-col flex-1 justify-evenly m-4 items-center">
              <h2 className="text-2xl text-primary p-2">Dados Gerais</h2>
              <div className="grid items-center grid-cols-3 grid-flow-row-dense gap-2 flex-1 w-full">
                <IconContext.Provider
                  value={{
                    className: 'fill-primary stroke-primary',
                    size: '20',
                    weight: 'fill',
                  }}
                >
                  <GeneralDataItem
                    icon={<UsersFour />}
                    title="Total de usuários registrados"
                    content={data['dados_gerais']['usuarios_registrados']}
                  />
                  <GeneralDataItem
                    icon={<FileArrowUp />}
                    title="Inscrições realizadas"
                    content={data['dados_gerais']['incricoes_realizadas']}
                  />
                  <GeneralDataItem
                    icon={<GraduationCap />}
                    title="Cursos ativos"
                    content={data['dados_gerais']['cursos_ativos']}
                  />
                  <GeneralDataItem
                    icon={<Certificate />}
                    title="Direito à certificação"
                    content={data['dados_gerais']['direito_certificacao']}
                  />
                  <GeneralDataItem
                    icon={
                      <div className="relative">
                        <GraduationCap />
                        <Coins
                          className="brightness-150 fill-primary stroke-primary absolute -bottom-1 -right-1"
                          size="12"
                        />
                      </div>
                    }
                    title="Investimento médio por curso"
                    content={data['dados_gerais']['investimento_medio_curso']}
                  />
                  <GeneralDataItem
                    icon={
                      <div className="relative">
                        <User />
                        <Coins
                          className="brightness-150 fill-primary stroke-primary absolute -bottom-1 -right-1"
                          size="12"
                        />
                      </div>
                    }
                    title="Investimento médio por aluno"
                    content={data['dados_gerais']['investimento_medio_aluno']}
                  />
                </IconContext.Provider>
              </div>
            </div>
          )}
        </div>
        <div className="h-[36rem]">
          {!loaded ? (
            <div className="skeleton w-full h-full"></div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="h-[36rem]">
          {!loaded ? (
            <div className="skeleton w-full h-full"></div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
}

export default Transparency;
