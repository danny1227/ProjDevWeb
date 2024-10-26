import React, { useEffect, useState } from 'react'
import CampPage from '../pages/CampPage.tsx';
import CampNew from '../pages/CampNew.tsx';
import { Campaign, Candidate } from '../api/Campaing.ts';
import CampPageDetail from './CampPageDetail.tsx';

export const HomePage = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]); // Estado para las campañas
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null); // Estado para la campaña seleccionada
  const [loading, setLoading] = useState(true);   // Estado para controlar el estado de carga
  const [error, setError] = useState(null);       // Estado para manejar errores

  useEffect(() => {
    // Función asíncrona para obtener las campañas
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/campaigns/campaigns'); // Cambia la URL según tu configuración
        if (!response.ok) {
          throw new Error('Error al obtener campañas');
        }
        const data = await response.json(); // Parsear la respuesta como JSON
        setCampaigns(data.campaigns);       // Guardar campañas en el estado
        setLoading(false);                  // Cambiar el estado de carga
      } catch (err) {
        setError(err.message);              // Guardar el mensaje de error
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []); // El arreglo vacío asegura que se ejecute solo una vez al cargar


  // Función para agregar una nueva campaña
  const addCampaign = (newCampaign: Campaign) => {
    setCampaigns((prevCampaigns) => [...prevCampaigns, newCampaign]); // Actualiza el estado con la nueva campaña
  };

  // Inicializar algunas campañas
  const initializeCampaigns = () => {
    const campaign1 = new Campaign(
      1,
      "Elecciones Junta Directiva 2024 - Ingeniería Civil",
      "Elección para la nueva Junta Directiva de la Facultad de Ingeniería Civil para el período 2024-2026.",
      true,
      [
        new Candidate(1, "Juan Pérez", "Candidato con 10 años de experiencia en la industria de la construcción.", "Ingeniería Civil", 1, 120),
        new Candidate(2, "María González", "Experta en infraestructura y ex presidenta de la comisión de proyectos.", "Ingeniería Civil", 1, 135)
      ]
    );

    const campaign2 = new Campaign(
      2,
      "Elecciones Junta Directiva 2024 - Ingeniería Electrónica",
      "Elección para la Junta Directiva de la Facultad de Ingeniería Electrónica para el período 2024-2026.",
      false,
      [
        new Candidate(3, "Carlos Méndez", "Investigador en sistemas embebidos y docente por más de 15 años.", "Ingeniería Electrónica", 2, 90),
        new Candidate(4, "Lucía Ramírez", "Especialista en telecomunicaciones y ganadora de varios premios de innovación.", "Ingeniería Electrónica", 2, 110)
      ]
    );

    setCampaigns([campaign1, campaign2]);
  };
  
  // Función para manejar el clic en una campaña
  const handleCampaignClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign); // Actualiza la campaña seleccionada
  };


  React.useEffect(() => {
    initializeCampaigns(); // Inicializa las campañas al montar el componente
  }, []);

  return (
    <div className='container'>
      {selectedCampaign ? (
        <CampPageDetail campaign={selectedCampaign} />
      ) : campaigns.map((campaign) => (
            <div  key={campaign.id}  onClick={() => handleCampaignClick(campaign)}>
            <CampPage
            campaign={campaign} >
            </CampPage>
            </div>
            
          ))
      }
      <CampNew addCampaign={addCampaign} ></CampNew>
    </div>
  )
}
