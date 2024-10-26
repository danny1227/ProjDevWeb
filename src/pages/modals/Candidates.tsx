import React, { useState } from 'react';
import { Candidate } from '../../api/Campaing.ts';
import "../../pages/modals/Candidates.scss";
import { Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface CandidatesProps {
  candidates: Candidate[];
  addCandidate: (name: string, description: string, faculty: string) => void;
  removeCandidate: (id: number) => void;
}

export const Candidates: React.FC<CandidatesProps> = ({ candidates, addCandidate, removeCandidate }) => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [faculty, setFaculty] = useState('');

  const handleAddCandidate = () => {
    addCandidate(name, description, faculty);
    setName("");
    setDescription("");
    setFaculty("");
  };

    // Validación para habilitar o deshabilitar el botón
    const isFormComplete = name && description && faculty;

  return (
    <div className='candidatoDiv'>
        <h3 className="title">Añadir Candidatos</h3>
        <Row className="align-items-start"> 
          <Col  xs={12} sm={12} md={6}>
          <form>
          <div className="form-group candidatos">
            <label htmlFor="candidateName">Nombre</label>
            <input
              type="text"
              id="candidateName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del candidato"
            />
          </div>
          <div className="form-group">
            <label htmlFor="candidateDescription">Descripción</label>
            <input
              type="text"
              id="candidateDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción del candidato"
            />
          </div>
          <div className="form-group">
            <label htmlFor="candidateFaculty">Facultad</label>
            <input
              type="text"
              id="candidateFaculty"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              placeholder="Facultad del candidato"
            />
          </div>
          <button
                type="button" 
                onClick={handleAddCandidate}
                className={`plus-button butto-${isFormComplete ? "enabled" : "disabled"}`}
                disabled={!isFormComplete} 
                >
            +
          </button>
        </form>

          </Col>
          <Col xs={12} sm={12} md={7} style={{ width: '284px' }}>
                  {/* Lista de candidatos agregados */}
        <div className="candidate-list">
          <h4>Lista de Candidatos</h4>
          {candidates.length === 0 ? (
            <p>No hay candidatos añadidos aún.</p>
          ) : (
            <ul>
              {candidates.map((candidate) => (
                <li key={candidate.id}>
                  <strong>{candidate.name}</strong> - {candidate.description} ({candidate.faculty})
                  <button 
                      onClick={() => removeCandidate(candidate.id)}
                      className="delete-button"
                      style={{ marginLeft: '10px'}}
                    >
                      -
                    </button>
                </li>
              ))}
            </ul>
          )}
        </div>
          </Col>
        </Row>
        

    </div>
  );
};

export default Candidates;
