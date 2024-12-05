import { Link, NavLink } from "react-router-dom"
import { useAuth } from "./AuthContext";
import { BsCart4 } from "react-icons/bs";
import '../styles/Header.css'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

import img1 from '../assets/img/logo.png';
import img2 from '../assets/img/running-man.png'

export const Header = () => {

  const { isAuthenticated, logout } = useAuth(); // Acceder al estado de autenticación

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
              <li className="nav-item">
                <NavLink to='/' className="nav-link" >Home</NavLink>  
              </li>
              <li className="nav-item">
                <NavLink to='/productos' className="nav-link" >Products</NavLink>
              </li>

              {/* Mostrar opciones solo si el usuario no está logueado */}
              { !isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <NavLink to='/login' className="nav-link">Log in</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to='/registro' className="nav-link">Sign up</NavLink>
                  </li>
                </>
                ) : (
                  <li className="nav-item">
                    <button onClick={logout} className="nav-link">Logout</button>
                  </li>
                )
                }
              <li className="nav-item">
                <NavLink to="/carrito" className="nav-link icon">
                  <BsCart4 />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
