import React from 'react';
import { useAuth } from "./UseAuth.tsx";

export const Secret = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Presione el siguiente boton para cerrar sesión</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};