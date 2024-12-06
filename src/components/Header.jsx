import { Link, NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";  // Contexto de autenticación
import { BsCart4 } from "react-icons/bs";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import '../styles/Header.css';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import img1 from '../assets/img/logo.png';
import img2 from '../assets/img/running-man.png';

export const Header = () => {

  const { isAuthenticated, logout, tipo_usuario } = useAuth(); // Obtener el estado de autenticación y tipo de usuario
  const { listaCompras } = useContext(CarritoContext);

  return (
    <>
      <header className="container-fluid bg-primary p-2 px-5 d-flex align-items-center justify-content-space-between">
        <a href="index.html"><img className="w-25 " src={img1} /></a>
        <img src={img2} alt="imagen" className="header-img img-fluid" />
      </header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
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
                    <NavLink to='/login' className="nav-link">Log in</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to='/registro' className="nav-link">Sign up</NavLink>
                  </li>
                </>
              ) : (
                <>
                  {/* Opciones visibles solo para administradores */}
                  {tipo_usuario === 'admin' ? (
                    <li className="nav-item">
                      <NavLink to='/admin' className="nav-link">Admin</NavLink>
                    </li>
                  ) : (
                    <>
                      <li className="nav-item">
                        <NavLink to='/' className="nav-link">Home</NavLink>  
                      </li>
                      <li className="nav-item">
                        <NavLink to='/productos' className="nav-link">Products</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/carrito" className="nav-link icon cart-icon-wrapper">
                          <BsCart4 size={24} />
                        </NavLink>
                      </li>
                    </>
                  )}
                  <li className="nav-item">
                    <button onClick={logout} className="nav-link">Logout</button>
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
