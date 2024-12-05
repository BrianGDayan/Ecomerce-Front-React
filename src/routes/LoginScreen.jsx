import React from 'react'
import { Link, NavLink } from "react-router-dom"
import { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import '../styles/Data.css'
import img1 from '../assets/img/logo.png'

export const LoginScreen = () => {

  // Guardar los valores para el login
  const [formData, setFormData] = useState({
    correo_electronico: '',
    contrasena: ''
  });

  // consumir datos input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const { login } = useAuth;

  // Intentar login
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/usuarios', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        alert('Ingreso éxitoso');
      } else {
        alert('Error al iniciar sesion: ' + data.error);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  }

  return (
    <div className='page d-flex flex-column align-items-center justify-content-center bg-secondary'>
      <p className="loginSign m-0 p-2 bg-primary text-light text-center">LOG IN</p>
      <div className="dataSection m-0 p-2 d-flex flex-column align-items-center justify-content-center bg-light">
        <img src={img1} className="pageLogo" />
        <form className="form-group" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="correo_electronico">Email address</label>
            <input type="email" className="form-control" id="correo_electronico" aria-describedby="correo_electronico" placeholder="Enter email" name="correo_electronico" value={formData.correo_electronico} onChange={handleChange}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="contrasena">Password</label>
            <input type="password" className="form-control" id="contrasena" placeholder="Password" name="contrasena" value={formData.contrasena} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label className="d-inline">No account? <NavLink to='/registro' className="nav-link text-primary d-inline" >Click here</NavLink></label>
          </div>
          
          <button type="submit" className="btn btn-primary w-100">LOG IN</button>
        </form>
      </div>
    </div>
  )
}