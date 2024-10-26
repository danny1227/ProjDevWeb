import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Candidate } from '../api/Campaing.ts';

// Registrar las escalas y otros componentes necesarios
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface CandidatesChartProps {
  candidates: Candidate[];
}

const CandidatesChart: React.FC<CandidatesChartProps> = ({ candidates }) => {
  // Configurar los datos para el gráfico de barras
  const data = {
    labels: candidates.map(candidate => candidate.name), // Nombres de los candidatos
    datasets: [
      {
        label: 'Votos',
        data: candidates.map(candidate => candidate.votes), // Número de votos
        backgroundColor: 'rgba(221, 141, 14, 0.81)', // Color de las barras
        borderColor: 'rgba(148, 91, 0, 0.77)', // Color del borde de las barras
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default CandidatesChart;
