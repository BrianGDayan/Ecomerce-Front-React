import '../styles/Footer.css'

export const Footer = () => {
  return (
    <footer className="footer bg-primary text-light text-center">
      <div className="footer-container d-flex flex-wrap justify-content-space-between align-items-flex-start">
        <div className="footer-about">
          <h4>Sobre nosotros</h4>
          <p>
            CILSA SHOP es el lugar ideal para encontrar los mejores productos a precios accesibles. 
            Nuestra prioridad es ofrecer calidad y garantizar la satisfacción de nuestros clientes.
          </p>
        </div>

        <div className="footer-links">
          <h4>Enlaces de interés</h4>
          <ul>
            <li><a href="#home">Inicio</a></li>
            <li><a href="#products">Productos</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </div>

        <div className="footer-socials">
          <h4>Seguinos en nuestras redes</h4>
          <div className="social-icons">
            <a href="#a" aria-label="Facebook" className="social-icon">🔵</a>
            <a href="#b" aria-label="Twitter" className="social-icon">🐦</a>
            <a href="#c" aria-label="Instagram" className="social-icon">📸</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 CILSA SHOP | Todos los derechos reservados.
      </div>
    </footer>
  )
}
