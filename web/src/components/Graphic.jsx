import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

import { getBoletimOCorrencia } from "../services/boletim-ocorrencia-service";

export function Graphic() {
  const [examData, setExamData] = useState([]);

  useEffect(() => {
    async function fetchExams() {
      try {
        const result = await getBoletimOCorrencia();
        const rawData = result.data;

        // Trate os dados para contar a quantidade de cada tipo de exame
        const examCount = {};
        rawData.forEach((exam) => {
          const { bairroOcorrencia } = exam;
          examCount[bairroOcorrencia] = (examCount[bairroOcorrencia] || 0) + 1;
        });

        // Transforme os dados em um formato adequado para o gráfico de pizza do Google Charts
        const chartData = [['Tipo de Exame', 'Quantidade']];
        Object.keys(examCount).forEach((bairroOcorrencia) => {
          chartData.push([bairroOcorrencia, examCount[bairroOcorrencia]]);
        });

        setExamData(chartData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchExams();
  }, []);

  return (
    <div className='graph-container'>
      <Chart
        chartType="PieChart"
        data={examData}
        options={{
          title: 'Porcentagem de Crimes por Bairro',
          backgroundColor: 'transparent',
          titleTextStyle: {
            color: 'white',
            fontSize: 18,
          },
          legendTextStyle: {
            color: 'white',
            fontSize: 14,
          },
        }}
        width="100%"
        height="400px"
      />
    </div>
  );
}