import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

function PieChart() {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const accessToken = sessionStorage.getItem('token');
    // Substitua 'SeuTokenAqui' pelo seu token de acesso real

    // Configurar os headers da solicitação
    const headers = new Headers({
        'Authorization': `Bearer ${JSON.parse(accessToken)}`

    });

    // Configurar as opções da solicitação
    const requestOptions = {
      method: 'GET', // Use 'GET' para solicitações GET ou 'POST' para solicitações POST, etc.
      headers: headers,
    };

    // Faça a solicitação ao backend para obter os dados
    fetch('http://localhost:8080/achar/boletimOcorrencia', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na solicitação');
        }
        return response.json();
      })
      .then(dados => {
        // Formate os dados conforme necessário para o gráfico de pizza
        const formattedData = {
          labels: dados.map(item => item.label),
          datasets: [
            {
              data: dados.map(item => item.value),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
          ],
        };

        setData(formattedData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Gráfico de Pizza</h2>
      <Pie data={data} />
    </div>
  );
}

export default PieChart;
