import React, { createContext, useState, useContext, useEffect } from 'react';

// Creamos un contexto para la autenticación
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUser, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({
        id: payload.id,
        displayName: payload.nombre,
        email: payload.correo_electronico,
        tipo_usuario: payload.tipo_usuario
      });
    }
  }, []);

  const login = (token, tipoUsuario) => {
    alert('Usuario logeado con éxito');
    setIsAuthenticated(true);
    localStorage.setItem('token', token); // Guardar token en localStorage
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUser({
      id: payload.id,
      displayName: payload.nombre,
      email: payload.correo_electronico,
      tipo_usuario: payload.tipo_usuario
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext);
