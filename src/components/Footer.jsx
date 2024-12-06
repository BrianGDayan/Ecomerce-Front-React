import '../styles/Footer.css'

export const Footer = () => {
  return (
    <footer className="footer bg-primary text-light text-center">
      <div className="footer-container d-flex flex-wrap justify-content-space-between align-items-flex-start">
        <div className="footer-about">
          <h4>About Us</h4>
          <p>
            CILSA SHOP is your one-stop destination for the best products at affordable prices. 
            Quality and customer satisfaction are our priorities.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-socials">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#a" aria-label="Facebook" className="social-icon">🔵</a>
            <a href="#b" aria-label="Twitter" className="social-icon">🐦</a>
            <a href="#c" aria-label="Instagram" className="social-icon">📸</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 CILSA SHOP | All rights reserved.
      </div>
    </footer>
  )
}
