import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { BsCart4 } from "react-icons/bs";
import "../styles/Header.css";

export const Header = () => {
  const { listaCompras } = useContext(CarritoContext);

  return (
    <header className="header">
      <div className="header-title">CILSA SPORTS SHOP</div>
      <nav className="nav">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/productos" className="nav-link">
          Products
        </NavLink>
        <NavLink to="/login" className="nav-link">
          Log in
        </NavLink>
        <NavLink to="/registro" className="nav-link">
          Sign up
        </NavLink>
        <NavLink to="/carrito" className="nav-link icon cart-icon-wrapper">
          <BsCart4 size={24} />
        </NavLink>
      </nav>
    </header>
  );
};
