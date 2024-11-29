import { Link, NavLink } from "react-router-dom"
import { BsCart4 } from "react-icons/bs";
import '../styles/Header.css'


export const Header = () => {
  return (
    <header className="header">
      <div className="header-title">CILSA SPORTS SHOP</div>
      <nav className="nav">
        <NavLink to='/' className="nav-link" >Home</NavLink>
        <NavLink to='/productos' className="nav-link" >Products</NavLink>
        <NavLink to='/login' className="nav-link">Log in</NavLink>
        <NavLink to='/registro' className="nav-link">Sign up</NavLink>
        <NavLink to="/carrito" className="nav-link icon">
          <BsCart4 />
        </NavLink>
      </nav>
    </header>
  )
}
