import React from 'react'
import { Card } from 'react-bootstrap'
import '../pages/CampPage.scss'
import '../../src/global.d.ts'
import iconPaper from '../assets/doc.png'
import { Campaign } from '../api/Campaing.ts'

// Definir los props que el componente recibirá
interface CampPageProps {
    campaign: Campaign; // CampPage recibe un objeto de tipo Campaign
  }

const CampPage: React.FC<CampPageProps> = ({ campaign }) =>{
  return (
<div>
<div className="card">
      <div className="icon-container">
        <img src={iconPaper} alt="icono" className="icon" />
      </div>
      <h2 className="card-title">
        {campaign.title}
      </h2>
      <p className="card-text">
        {campaign.description}
        {campaign.isEnabled.valueOf() ? "Habilitada" : "Deshabilitada"}
      </p>
    </div>
</div>
  )
}

export default CampPage
