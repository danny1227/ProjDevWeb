import React from "react";
import { useState } from "react";
import { useAuth } from "../hooks/UseAuth.tsx";
import "./LoginPage.scss"; // Importar archivo de estilos
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [dpi, setDpi] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [member, setMember] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate(); // Hook para navegar

  const handleLogin = async (e) => {
    e.preventDefault();
    // Here you would usually send a request to your backend to authenticate the user
    // For the sake of this example, we're using a mock authentication
    try {
      const loginUser = async (member, dpi, birthdate, password) => {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({member, dpi, birthdate, password}),
        });
  
        const data = await response.json();
        console.log(member, dpi, birthdate, password);
        console.log(data);
        console.log(response.status);
        if (response.status === 200) {
          // Replace with actual authentication logic
          await login({ member, dpi, birthdate, password});
        } else {
          alert("Invalid username or password");
        }
      };
    
      await loginUser(member, dpi, birthdate, password ); // Llamar a la función de login
  } catch (error) {
    console.error("Error:", error); // Manejo de errores
    alert("An error occurred while logging in.");
  }

  };

  // Función que maneja el clic en el enlace y redirige a /register
  const registerU = (event) => {
    event.preventDefault(); // Evitar comportamiento por defecto del enlace
    console.log("Redirigiendo a la página de registro...");
    navigate("/register"); // Redirigir a la ruta /register
  };

  return (
  <div>
  <div className="titulo">
    <h2 className="text_ti_2">Acceder</h2>
    <h5 className="text_ti_2">Inicia sesión para continuar | 
      <div className="forget">
          <p>
            {" "}
            <a type="submit" href="/" onClick={registerU}>
              Registrarme
            </a>
          </p>
        </div>
    </h5>
  </div>
  <div className="form">
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <h5 className="text_ti">NÚMERO DE COLEGIADO</h5>
          <input id="member" name="member" placeholder="" type="text" value={member} onChange={(e) => setMember(e.target.value)} required/>
        </div>
        <div className="input-group">
          <h5 className="text_ti">DPI</h5>
          <input id="username" name="username" placeholder="" type="text" value={dpi} onChange={(e) => setDpi(e.target.value)} required/>
        </div>
        <div className="input-group">
          <h5 className="text_ti">FECHA DE NACIMIENTO</h5>
          <input id="birthDate" name="birthDate" placeholder="" type="date" value={birthdate} onChange={(e) => setBirthDate(e.target.value)} required/>
        </div>
        <div className="input-group">
          <h5 className="text_ti">CLAVE</h5>
          <input id="password" name="password" placeholder="" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <div className="input-group">
          <button type="submit">Ingresar</button>
        </div>
      </form>
    </div>
</div>
  );
};
