import React, { createContext, useState, useContext, useEffect } from 'react';

// Creamos un contexto para la autenticación
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tipo_usuario, setTipoUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token, tipoUsuario) => {
    alert('Usuario logeado con éxito');
    setIsAuthenticated(true);
    setTipoUsuario(tipoUsuario);  // Actualizamos el tipo de usuario
    sessionStorage.setItem('token', token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setTipoUsuario(null);  // Limpiamos el tipo de usuario al hacer logout
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, tipo_usuario }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext);
