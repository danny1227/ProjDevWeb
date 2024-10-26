import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Campaign, Candidate } from '../api/Campaing.ts'
import '../pages/CampPageDetail.scss'
import CandidatesChart from './CandidatesChart.tsx';

interface CampPageDetailProps {
  campaign: Campaign; // Define el tipo de la propiedad que recibe
}

const CampPageDetail: React.FC<CampPageDetailProps> = ({ campaign }) => {
  // Usar el estado para manejar los votos de los candidatos
   // Usar el estado para manejar los votos de los candidatos
   const [candidates, setCandidates] = useState<Candidate[]>([]);

   // Usar useEffect para inicializar el estado de candidates desde campaign
   useEffect(() => {
    setCandidates(campaign.candidates); // Inicializa los candidatos
  }, [campaign]);;

   const handleVote = async (candidateId: number) =>  {
    console.log("Votando por el candidato con ID:", candidateId);
    
    try {
      // Realizar la solicitud POST al backend para registrar el voto
      const response = await fetch(`http://localhost:5000/api/campaigns/campaigns/${campaign.id}/candidates/${candidateId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Verificar si la solicitud fue exitosa
      if (!response.ok) {
        throw new Error('Error al registrar el voto');
      }

      const data = await response.json();
      console.log(data.message); // Mensaje de éxito

      // Actualizar el estado localmente para reflejar el nuevo conteo de votos
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate.id === candidateId
            ? { ...candidate, votes: candidate.votes + 1 }
            : candidate
        )
      );
    } catch (error) {
      console.error('Error en handleVote:', error);
    } 
  };

  return (
<div className='container'>
<div className="camp-page-detail">
      <div className="card-header">
      <h2>{campaign.title}</h2>
      </div>
      <h3>{campaign.description}</h3>
      <h4 style={{ color: campaign.isEnabled ? 'green' : 'red' }}>{campaign.isEnabled ? 'Votación Activa' : 'Votación Inactiva'}</h4>
      <CandidatesChart candidates={candidates} />
      <div className="card-body">
        
        {/* Renderizar el gráfico con los candidatos y sus votos */}
        <div className="voters">
            {candidates.map((candidate) => (  // Cambié campaign.candidates a candidates
              <div 
                key={candidate.id} 
                className={`voter-card ${campaign.isEnabled ? 'hover-active' : ''}`}
                onClick={campaign.isEnabled ? () => handleVote(candidate.id) : undefined}  // Maneja el clic para votar
                style={{ cursor: campaign.isEnabled ? 'pointer' : 'default' }} // Cambia el cursor al pasar sobre el votante
              >
                <h5>{candidate.name}</h5>
                <p>{campaign.isEnabled ? 'Votos activos: ' : 'Votación cerrada: '} {candidate.votes}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
</div>
  )
}

export default CampPageDetail
