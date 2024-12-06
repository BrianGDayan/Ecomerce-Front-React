import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import '../styles/Data.css';
import img1 from '../assets/img/logo.png';

// Datos para registrarse
export const RegisterScreen = () => {
  const url = 'http://localhost:3001/auth/register'; // Cambiar a la URL correcta

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo_electronico: '',
    contrasena: '',
    id_tipo_usuario: 2
  });

  // Consumir datos input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Prevenir el comportamiento predeterminado y enviar los datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar los datos del formulario
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      // Comprobar si la respuesta fue exitosa
      if (response.ok) {
        alert('Usuario creado con éxito');
      } else {
        alert('Error al crear el usuario: ' + data.error);
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Hubo un error al registrar el usuario');
    }
  };

  return (
    <div className='page d-flex flex-column align-items-center justify-content-center bg-secondary'>
      <p className="loginSign m-0 p-2 bg-primary text-light text-center">REGISTER</p>
      <div className="dataSection m-0 p-2 d-flex flex-column align-items-center justify-content-center bg-light">
        <img src={img1} className="pageLogo" />
        <form className="form-group" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">First Name</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Enter First Name"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="apellido"
              placeholder="Enter Last Name"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="correo_electronico">Email address</label>
            <input
              type="email"
              className="form-control"
              id="correo_electronico"
              placeholder="Enter email"
              name="correo_electronico"
              value={formData.correo_electronico}
              onChange={handleChange}
            />
            <small className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="contrasena">Password</label>
            <input
              type="password"
              className="form-control"
              id="contrasena"
              placeholder="Password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="d-inline">
              Already have an account? 
              <NavLink to='/login' className="nav-link text-primary d-inline">Click here</NavLink>
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100">JOIN US</button>
        </form>
      </div>
    </div>
  );
};
