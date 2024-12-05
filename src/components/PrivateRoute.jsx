import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Componente para proteger las rutas
export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Si no está logueado, redirige al login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si está logueado, muestra el contenido de la ruta
  return children;
};