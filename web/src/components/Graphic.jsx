import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import '../styles/graph-container.css'

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
          title: 'Quantidade de Crimes por Tipo',
        }}
        width="100%"
        height="400px"
      />
    </div>
  );
}