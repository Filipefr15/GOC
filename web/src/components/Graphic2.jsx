import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

import { getBoletimOCorrencia } from "../services/boletim-ocorrencia-service";

export function Graphic2() {
  const [examData, setExamData] = useState([]);

  useEffect(() => {
    async function fetchExams() {
      try {
        const result = await getBoletimOCorrencia();
        const rawData = result.data;

        // Trate os dados para contar a quantidade de cada tipo de exame
        const examCount = {};
        rawData.forEach((exam) => {
          const { tipoOcorrencia } = exam;
          examCount[tipoOcorrencia] = (examCount[tipoOcorrencia] || 0) + 1;
        });

        // Transforme os dados em um formato adequado para o gráfico de pizza do Google Charts
        const chartData = [['Tipo de Exame', 'Quantidade']];
        Object.keys(examCount).forEach((tipoOcorrencia) => {
          chartData.push([tipoOcorrencia, examCount[tipoOcorrencia]]);
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
          title: 'Porcentagem de tipos de Ocorrências',
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