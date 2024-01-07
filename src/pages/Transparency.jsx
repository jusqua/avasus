import { useEffect, useState } from 'react';
import { Chart } from 'chart.js';
import ChartJS from 'chart.js/auto';

import {
  IconContext,
  UsersFour,
  FileArrowUp,
  GraduationCap,
  Certificate,
  CurrencyDollar,
  User,
} from '@phosphor-icons/react';

import instance from '@utils/api';
import Breadcrumbs from '@components/Breadcrumbs';

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
      <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row-dense gap-6 *:rounded-2xl *:bg-base-200 *:shadow-md">
        <div className="flex md:col-span-2 min-h-64">
          <div className="flex flex-col flex-1 justify-evenly m-6 items-center">
            <h2 className="text-2xl text-primary p-2">Dados Gerais</h2>
            <div className="grid items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense gap-3 flex-1 w-full">
              <IconContext.Provider
                value={{
                  className: 'fill-primary stroke-primary',
                  size: '20',
                  weight: 'fill',
                }}
              >
                <GeneralDataItem
                  loaded={loaded}
                  title="Total de usuários registrados"
                  content={data.dados_gerais?.usuarios_registrados}
                  icon={<UsersFour />}
                />
                <GeneralDataItem
                  loaded={loaded}
                  title="Inscrições realizadas"
                  content={data.dados_gerais?.incricoes_realizadas}
                  icon={<FileArrowUp />}
                />
                <GeneralDataItem
                  loaded={loaded}
                  title="Cursos ativos"
                  content={data.dados_gerais?.cursos_ativos}
                  icon={<GraduationCap />}
                />
                <GeneralDataItem
                  loaded={loaded}
                  title="Direito à certificação"
                  content={data.dados_gerais?.direito_certificacao}
                  icon={<Certificate />}
                />
                <GeneralDataItem
                  loaded={loaded}
                  title="Investimento médio por curso"
                  content={data.dados_gerais?.investimento_medio_curso}
                  icon={
                    <div className="relative">
                      <GraduationCap />
                      <div className="absolute -top-2 -left-2">
                        <CurrencyDollar size="14" />
                      </div>
                    </div>
                  }
                />
                <GeneralDataItem
                  loaded={loaded}
                  title="Investimento médio por aluno"
                  content={data.dados_gerais?.investimento_medio_aluno}
                  icon={
                    <div className="relative">
                      <User />
                      <div className="absolute -top-2 -left-2">
                        <CurrencyDollar size="14" />
                      </div>
                    </div>
                  }
                />
              </IconContext.Provider>
            </div>
          </div>
        </div>
        <div className="min-h-[36rem]">
          <div className="flex flex-col flex-1 justify-evenly m-6 items-center">
            <h2 className="text-xl text-primary p-2">Usuários por curso</h2>
            <UsersPerCourseChart usersData={data?.usuarios_por_curso} />
          </div>
        </div>
        <div className="min-h-[36rem]">
          <div className="flex flex-col flex-1 justify-evenly m-6 items-center">
            <h2 className="text-xl text-primary p-2">Usuários por estado</h2>
          </div>
        </div>
      </div>
    </>
  );
}

function GeneralDataItem({ loaded, title, content, icon }) {
  return (
    <div className="flex flex-col gap-1 justify-center text-center">
      <span className="flex gap-1 items-center justify-center">
        {icon}
        <p className="text-sm">{title}</p>
      </span>
      {!loaded ? (
        <div className="skeleton h-8 w-full"></div>
      ) : (
        <p className="text-2xl text-primary">{content}</p>
      )}
    </div>
  );
}

function UsersPerCourseChart({ usersData }) {
  useEffect(() => {
    if (!usersData) return;

    const canvas = document.getElementById('users-per-course-chart');
    if (!canvas) return;

    const chart = Chart.getChart('users-per-course-chart');
    if (chart != undefined) chart.destroy();

    new Chart(canvas, {
      type: 'pie',
      data: {
        labels: usersData.map(({ curso }) => curso),
        datasets: [
          {
            label: 'Usuários',
            data: usersData.map(({ usuarios }) => usuarios),
            backgroundColor: ['#FFFFFF', '#D2202C', '#707070', '#2F2E41'],
            hoverOffset: 16,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 20,
              boxHeight: 20,
            },
          },
        },
      },
    });

    return () => { };
  }, [usersData]);

  return <canvas id="users-per-course-chart"></canvas>;
}

export default Transparency;
