import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../components/AuthContext';
import '../styles/Data.css';
import img1 from '../assets/img/logo.png';

export const LoginScreen = () => {
  const url = 'https://database-fk.alwaysdata.net/auth/login';
  const { login } = useAuth(); // Accedemos al contexto de autenticación
  const navigate = useNavigate(); // Inicializamos el hook useNavigate

  const [formData, setFormData] = useState({
    correo_electronico: '',
    contrasena: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        login(data.token, data.tipo_usuario);
        if (data.tipo_usuario === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        alert('Error al iniciar sesión: ' + data.error);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className='page d-flex flex-column align-items-center justify-content-center bg-secondary'>
      <p className="loginSign m-0 p-2 bg-primary text-light text-center">INICIAR SESIÓN</p>
      <div className="dataSection m-0 p-2 d-flex flex-column align-items-center justify-content-center bg-light">
        <img src={img1} className="pageLogo" alt="Logo" />
        <form className="form-group" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="correo_electronico">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="correo_electronico"
              placeholder="Ingresá tu correo"
              name="correo_electronico"
              value={formData.correo_electronico}
              onChange={handleChange}
            />
            <small id="emailHelp" className="form-text text-muted">
            Tu correo electrónico nunca será compartido con terceros.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="contrasena"
              placeholder="Ingresá tu contraseña"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <small className="d-inline">
              ¿No tenés una cuenta aún?{' '}
              <NavLink to='/registro' className="nav-link text-primary d-inline">
                Registrate ahora
              </NavLink>
            </small>
          </div>
          <button type="submit" className="btn btn-primary w-100">Ingresar</button>
        </form>
      </div>
    </div>
  );
};
