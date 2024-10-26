import React, { useState, useEffect } from 'react'
import '../pages/CampNew.scss'
import iconSum from '../assets/sum.png'
import ModalDev from '../pages/modals/ModalDev.tsx';
import { Campaign } from '../api/Campaing.ts';

interface CampNewProps {
  addCampaign: (newCampaign: Campaign) => void; // Prop para recibir la función del padre
}


const CampNew: React.FC<CampNewProps> = ({ addCampaign }) =>  {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const [campaigns, setCampaigns] = useState<Campaign[]>([]); // Especifica el tipo de estado

  const handleCloseModal = () => {
    console.log('Modal cerrado');

    setIsModalOpen(false);
    console.log('isModalOpen:', isModalOpen); // Verifica el valor del estado

  };

  // Esta función será llamada desde ModalDev
  const handleAddCampaign = (newCampaign: Campaign) => {
    addCampaign(newCampaign); // Llama a la función addCampaign del padre
    handleCloseModal(); // Cierra el modal después de agregar la campaña
  };

  useEffect(() => {
    console.log('isModalOpen:', isModalOpen); // Este log se ejecuta cada vez que cambia el estado
  }, [isModalOpen]);

  return (
    <div >
      <div  className="card_2" onClick={handleOpenModal}>
        <img src={iconSum}   alt="icono" className="icon" />
      </div>
      <ModalDev isOpen={isModalOpen} onClose={handleCloseModal} addCampaign={handleAddCampaign}   />
    </div>
  )
}

export default CampNew
