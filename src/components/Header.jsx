import { Link, NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";  // Contexto de autenticación
import { BsCart4 } from "react-icons/bs";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import '../styles/Header.css';

import img1 from '../assets/img/logo.png';
import img2 from '../assets/img/running-man.png';

export const Header = () => {

  const { isAuthenticated, logout, isUser } = useAuth(); // Acceder al estado de autenticación y usuario
  const { listaCompras } = useContext(CarritoContext);

  return (
    <>
      <header className="container-fluid bg-primary d-flex align-items-center justify-content-space-between">
        <a><img className="w-25 " src={img1} alt="logo" /></a>
        <div className="gap-3 d-flex align-items-center">
          {isAuthenticated ? (
            <p className="text-white">Bienvenido, {isUser?.displayName || 'User'}!</p>
          ) : (
            <p className="text-white">Bienvenido, invitado</p>
          )}
          <img src={img2} alt="imagen" className="header-img img-fluid" />

        </div>
      </header>
      <nav className="navbar navbar-expand-lg navbar-light p-2">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>


          <div className="collapse navbar-collapse justify-content-evenly" id="navbarNav">
            <ul className="navbar-nav">
              {/* Mostrar opciones solo si el usuario no está logueado */}

              {!isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <NavLink to='/login' className="nav-link">Iniciar sesión</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to='/registro' className="nav-link">Registrarse</NavLink>
                  </li>
                </>
              ) : (
                <>
                  {/* Opciones visibles solo para administradores */}
                  {isUser.tipo_usuario === 'admin' ? (
                    <li className="nav-item">
                      <NavLink to='/admin' className="nav-link">Admin</NavLink>
                    </li>
                  ) : (
                    <>
                      <li className="nav-item">
                        <NavLink to='/' className="nav-link">Inicio</NavLink>  
                      </li>
                      <li className="nav-item">
                        <NavLink to='/productos' className="nav-link">Nuestros productos</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/carrito" className="nav-link icon cart-icon-wrapper">
                          <BsCart4 size={24} />
                        </NavLink>
                      </li>
                    </>
                  )}
                  <li className="nav-item">
                    <button onClick={logout} className="nav-link">Cerrar sesión</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
 
