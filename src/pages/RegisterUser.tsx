import React, { useState } from "react";
import { useAuth } from "../hooks/UseAuth.tsx";
import { useNavigate } from 'react-router-dom';
import '../../src/global.d.ts'
import icon from '../assets/flecha-curva.png'; // Importa la imagen PNG

export const RegisterUser = () => {
  
  const [username, setUsername] = useState("");
  const [rol, setRol] = useState("");
  const [password, setPassword] = useState("");
  const [member, setMember] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [dpi, setDpi] = useState("");
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate(); // Hook para navegar

  const handleLogin = async (e) => {
    e.preventDefault();
    // Here you would usually send a request to your backend to authenticate the user
    // For the sake of this example, we're using a mock authentication
    console.log(username, password, dpi, email);

    setRol("user");
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ member, username, dpi, email, birthdate, password, rol }),
        
      });

        console.log(response.status);
        const data = await response.json();
        console.log(data);
        if (response.status === 201) {
          navigate('/login'); // Redirigir a la ruta /register
          // Replace with actual authentication logic
        } else {
          console.log(response.ok);
          alert("Datos invalidos");
        }
      
  } catch (error) {
    console.error("Error:", error); // Manejo de errores
    alert("Ha ocurrido un error al registrarse.");
  }

  };

  // Función que maneja el clic en el enlace y redirige a /register
  const loginU = (event) => {
    event.preventDefault(); // Evitar comportamiento por defecto del enlace
    console.log('Redirigiendo a la página de registro...');
    navigate('/login'); // Redirigir a la ruta /register
  };

  return (
    <div className="form">
      <div className="titulo register">
        <h2 className="text_ti_3">Crear una cuenta nueva</h2>
      </div>
      <form onSubmit={handleLogin} >
      <div className="titulo">
        <h5 className="text_ti_3">¿Ya tienes una cuenta? 
          <div className="forget">
            <p>
              <a type="submit" href="/" onClick={loginU}> Login </a>
            </p>
          </div>
        </h5>
      </div>
        <div className="input-group">
          <h5 className="text_ti">NÚMERO DE COLEGIADO</h5>
          <input id="member" name="member" placeholder="" type="text" value={member} onChange={(e) => setMember(e.target.value)} required />
        </div>
        <div className="input-group">
          <h5 className="text_ti">DPI</h5>
          <input id="dpi" name="dpi" placeholder="" type="text" value={dpi} onChange={(e) => setDpi(e.target.value)} required />
        </div>
        <div className="input-group">
          <h5 className="text_ti">NOMBRE</h5>
          <input id="username" name="username" placeholder="" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="input-group">
          <h5 className="text_ti">CORREO ELECTRÓNICO</h5>
          <input id="email" name="email" placeholder="" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div className="input-group">
          <h5 className="text_ti">CLAVE</h5>
          <input id="password" name="password" placeholder="" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <div className="input-group">
          <h5 className="text_ti">FECHA DE NACIMIENTO</h5>
          <input id="birthDate" name="birthDate" placeholder="" type="date" value={birthdate} onChange={(e) => setBirthDate(e.target.value)} required/>
        </div>
        <div className="input-group">
          <button type="submit">Registrarse</button>
        </div>

      </form>
    </div>
  );
};
