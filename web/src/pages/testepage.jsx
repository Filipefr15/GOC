// import React, { useEffect, useState } from 'react';
// import { Bar, CategoryScale } from 'react-chartjs-2';

// import { Chart } from 'chart.js';
// Chart.register(CategoryScale);

// // Registrar a escala 'category'
// CategoryScale.id = 'category';
// CategoryScale.defaults = {};




// const OcorrenciaChart = () => {
//   const [data, setData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: 'Número de Ocorrências',
//         data: [],
//         backgroundColor: 'rgba(75, 192, 192, 0.2)', // Cor das barras
//         borderColor: 'rgba(75, 192, 192, 1)', // Cor da borda das barras
//         borderWidth: 1,
//       },
//     ],
//   });

//   useEffect(() => {
//     // Simule uma chamada à sua API para obter os dados
//     // Substitua isso com a chamada real à sua API
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:8080');
//         const jsonData = await response.json();

//         // Processar os dados para contar as ocorrências de cada tipo
//         const tipoOcorrenciaCounts = {};
//         jsonData.forEach((ocorrencia) => {
//           const tipoOcorrencia = ocorrencia.tipoOcorrencia;
//           if (tipoOcorrencia in tipoOcorrenciaCounts) {
//             tipoOcorrenciaCounts[tipoOcorrencia] += 1;
//           } else {
//             tipoOcorrenciaCounts[tipoOcorrencia] = 1;
//           }
//         });

//         // Separar os tipos e contagens para atualizar o estado do gráfico
//         const tipos = Object.keys(tipoOcorrenciaCounts);
//         const contagens = Object.values(tipoOcorrenciaCounts);
//         setData({
//           labels: tipos,
//           datasets: [
//             {
//               label: 'Número de Ocorrências',
//               data: contagens,
//               backgroundColor: 'rgba(75, 192, 192, 0.2)',
//               borderColor: 'rgba(75, 192, 192, 1)',
//               borderWidth: 1,
//             },
//           ],
//         });
//       } catch (error) {
//         console.error('Erro ao buscar dados da API:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const options = {
//     scales: {
//       x: {
//         type: 'category', // Usar a escala 'category' para o eixo x
//         title: {
//           display: true,
//           text: 'Tipo de Ocorrência',
//         },
//       },
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: 'Número de Ocorrências',
//         },
//       },
//     },
//   };

//   return (
//     <div>
//       <h2>Gráfico de Tipos de Ocorrência</h2>
//       <div>
//         <Bar data={data} />
//       </div>
//     </div>
//   );
// };

// export default OcorrenciaChart;
