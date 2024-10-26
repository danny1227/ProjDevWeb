import React from 'react'
import { useAuth } from "../hooks/UseAuth.tsx";
import { Navbar, Container, Nav} from "react-bootstrap";
import "../pages/NavPage.scss"; // Importar archivo de estilos

export const NavPage = () => {
    const { user } = useAuth();

  return (
        <Nav className="me-nav">
            {
                user && 
                <>  
                <Nav.Link href="/home">Campañas</Nav.Link>
                <Nav.Link href="/secret">Cerrar Sesión</Nav.Link>
                </>
            }
        </Nav>
  )
}
