// Modal.tsx
import React, { useState } from "react";
import "../../pages/modals/ModalDev.scss";
import iconPaper from "../../assets/doc.png";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Campaign, Candidate } from "../../api/Campaing.ts";
import Candidates from "../../pages/modals/Candidates.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  addCampaign: (campaign: Campaign) => void; // Agregamos `addCampaign` a las props
}

const ModalDev: React.FC<ModalProps> = ({ isOpen, onClose, addCampaign  }) => {

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [title, setTitle] = useState("");
  const [id, setId] = useState(0);
  const [description, setDescription] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  const handleClose = () => {
    console.log("Cerrar botón presionado"); // Para depurar
    onClose();
  };

  const addCandidate = (name: string, description: string, faculty: string) => {
    const newCandidate = new Candidate(
      candidates.length + 1,
      name,
      description,
      faculty,
      1, // ID de campaña
      0  // Votos iniciales
    );
    setCandidates([...candidates, newCandidate]);
  };

  const removeCandidate = (id: number) => {
    setCandidates(candidates.filter(candidate => candidate.id !== id));
  };

  const handleSendCampaign = async () => {
    setId(0);
    
    console.log('Candidatos:', candidates); 

    const newCampaign = {
      id,
      title,
      description,
      isEnabled,
      candidates,
    };

    try {
      const response = await fetch("http://localhost:5000/api/campaigns/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCampaign),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Campaña creada en el servidor:', result);
        addCampaign(result.campaign); // Añade la campaña creada al estado global o al listado
        // Limpiar el formulario
        setTitle("");
        setDescription("");
        setIsEnabled(false);
        setCandidates([]);
        onClose(); // Cierra el modal
      } else {
        console.error("Error al crear la campaña", response.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } 
  };

  if (!isOpen) return null; // No renderizar si no está abierto

  return (
    <div style={styles.overlay as React.CSSProperties}>
      <div className="modal-container custom-scroll">
        <Row className="align-items-start">
          <Col xs={12} sm={8} md={4}>
            <h2>
              <img src={iconPaper} alt="icono" className="icon" />
              Crear Campaña
            </h2>
            <form className="modal-form">
              <div className="form-group">
                <label htmlFor="title">Título</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ingresa el título"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <textarea
                  className="descip"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ingresa la descripción"
                />
              </div>
              <div className="form-group toggle-group">
                <label htmlFor="enabled">Habilitar</label>
                <input
                  type="checkbox"
                  id="enabled"
                  checked={isEnabled}
                  onChange={() => setIsEnabled(!isEnabled)}
                />
                <span
                  className={`slider ${isEnabled ? "enabled" : "disabled"}`}
                ></span>
              </div>
            </form>
          </Col>
          <Col xs={12} sm={8} md={7}>
            <form className="modal-form">
              <div className="form-group">
                <Candidates 
                  candidates={candidates}
                  addCandidate={addCandidate}
                  removeCandidate={removeCandidate}
                />
              </div>
            </form>
          </Col>
        </Row>
        <Row>
          <Col>
          <button className="send-campaign" onClick={handleSendCampaign}>Enviar Campaña</button>
          </Col>
          <Col>
          <button 
              className="close-campaign"
              style={{ marginLeft: '10px'}}
              onClick={handleClose} >
              Cerrar
        </button>
          </Col>
        </Row>

      </div>
    </div>
  );
};

// Estilos del modal
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
  },
};

export default ModalDev;
