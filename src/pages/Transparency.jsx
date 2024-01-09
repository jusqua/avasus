import { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

import {
  UsersFour,
  FileArrowUp,
  GraduationCap,
  Certificate,
  CurrencyDollar,
  User,
} from '@phosphor-icons/react';

import instance from '@utils/api';
import iso from '@utils/iso';
import Breadcrumbs from '@components/Breadcrumbs';
import Main from '@components/Main';

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
    <Main>
      <Breadcrumbs />
      <h1 className="text-4xl text-primary text-center my-4">Transparência</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row-dense gap-6 *:rounded-2xl *:bg-base-200 *:shadow-md">
        <div className="flex md:col-span-2 min-h-64">
          <div className="flex flex-col flex-1 justify-evenly m-6 items-center">
            <h2 className="text-2xl text-primary p-2">Dados Gerais</h2>
            <div className="grid items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense gap-3 flex-1 w-full">
              {[
                [
                  'Total de usuários registrados',
                  data.dados_gerais?.incricoes_realizadas,
                  UsersFour,
                ],
                [
                  'Inscrições Realizadas',
                  data.dados_gerais?.incricoes_realizadas,
                  FileArrowUp,
                ],
                [
                  'Cursos Ativos',
                  data.dados_gerais?.cursos_ativos,
                  GraduationCap,
                ],
                [
                  'Direito à Certificação',
                  data.dados_gerais?.direito_certificacao,
                  Certificate,
                ],
                [
                  'Investimento médio por curso',
                  data.dados_gerais?.investimento_medio_curso,
                  GraduationCap,
                  CurrencyDollar,
                ],
                [
                  'Total de usuários registrados',
                  data.dados_gerais?.incricoes_realizadas,
                  User,
                  CurrencyDollar,
                ],
              ].map((e, i) => {
                const [title, content, Icon, TopIcon] = e;
                return (
                  <div
                    key={i}
                    className="flex flex-col gap-1 justify-center text-center"
                  >
                    <span className="flex gap-1 items-center justify-center">
                      <div className="relative">
                        <Icon
                          size="20"
                          className="fill-primary stroke-primary"
                          weight="fill"
                        />
                        {TopIcon === undefined ? null : (
                          <div className="absolute -top-2 -left-2">
                            <TopIcon
                              size="14"
                              className="fill-primary stroke-primary"
                              weight="fill"
                            />
                          </div>
                        )}
                      </div>
                      <p className="text-sm">{title}</p>
                    </span>
                    {!content ? (
                      <div className="skeleton h-8 w-full"></div>
                    ) : (
                      <p className="text-2xl text-primary">
                        {content.toLocaleString('pt-BR')}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="h-[28rem] overflow-hidden">
          <div className="flex flex-col flex-1 justify-evenly m-6 items-center">
            <h2 className="text-xl text-primary p-2">Usuários por curso</h2>
            {!loaded ? (
              <div className="skeleton h-80 w-80 rounded-full scale-80"></div>
            ) : (
              <Chart
                chartType="PieChart"
                height="24rem"
                data={[
                  ['Curso', 'Usuários'],
                  ...data.usuarios_por_curso.map(({ curso, usuarios }) => [
                    curso,
                    usuarios,
                  ]),
                ]}
                options={{
                  backgroundColor: 'transparent',
                  colors: ['#FFFFFF', '#D2202C', '#707070', '#2F2E41'],
                  chartArea: { height: '80%', width: '80%' },
                  legend: 'none',
                }}
                formatters={[
                  {
                    type: 'NumberFormat',
                    column: 1,
                    options: {
                      decimalSymbol: ',',
                      groupingSymbol: '.',
                      fractionDigits: 0,
                    },
                  },
                ]}
              />
            )}
          </div>
        </div>
        <div className="h-[28rem] overflow-hidden">
          <div className="flex flex-col flex-1 justify-evenly m-6 items-center">
            <h2 className="text-xl text-primary p-2">Usuários por estado</h2>
            {!loaded ? (
              <div className="skeleton h-80 w-80 scale-80"></div>
            ) : (
              <Chart
                className="relative left-5"
                chartType="GeoChart"
                data={[
                  ['Estado', 'Usuários', 'Certificados'],
                  ...data.usuarios_por_estado.map(
                    ({ estados, usuarios_totais, direito_certificacao }) => [
                      iso[estados],
                      usuarios_totais,
                      direito_certificacao,
                    ],
                  ),
                ]}
                options={{
                  region: 'BR',
                  displayMode: 'regions',
                  resolution: 'provinces',
                  backgroundColor: 'transparent',
                  colorAxis: {
                    colors: ['#FFFFFF', '#D2202C', '#707070', '#2F2E41'],
                  },
                  datalessRegionColor: 'transparent',
                  defaultColor: '#f5f5f5',
                  legend: 'none',
                  keepAspectRatio: false,
                }}
                formatters={[1, 2].map((e) => ({
                  type: 'NumberFormat',
                  column: e,
                  options: {
                    decimalSymbol: ',',
                    groupingSymbol: '.',
                    fractionDigits: 0,
                  },
                }))}
              />
            )}
          </div>
        </div>
      </div>
    </Main>
  );
}

export default Transparency;
