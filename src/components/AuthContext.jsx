import React, { createContext, useState, useContext, useEffect } from 'react';

// Creamos un contexto para la autenticación
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica si el usuario está autenticado al cargar la página (puedes usar un token de localStorage o cualquier otra forma)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);  // Si existe un token, el usuario está autenticado
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('token', 'your-auth-token'); // Guardar un token en localStorage
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token'); // Eliminar el token al cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext);