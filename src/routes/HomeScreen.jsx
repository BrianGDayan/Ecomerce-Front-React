import img1 from '../assets/img/carrousel-img1.jpg';
import img2 from '../assets/img/carrousel-img2.jpg';
import img3 from '../assets/img/carrousel-img3.jpg';
import '../styles/HomeScreen.css';

export const HomeScreen = () => {
  return (
    <div id="carouselExampleCaptions" className="carousel slide div-imgs">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={img1} className="d-block w-100 h-100" alt="..."/>
          <div className="carousel-caption">
            <h5 className="fs-1 fw-bold">Más que una tienda, un incentivo</h5>
            <p className="fs-4">Buscamos inspirar a las personas a adoptar un estilo de vida saludable y compartir nuestro entusiasmo por el deporte en todas sus disciplinas.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={img2} className="d-block w-100 h-100" alt="..."/>
          <div className="carousel-caption">
            <h5 className="fs-1 fw-bold">Accesorios infaltables</h5>
            <p className="fs-4">Poseemos una amplia variedad de calzados ideales y pensados para personas que desean superar sus limites.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={img3} className="d-block w-100 h-100" alt="..."/>
          <div className="carousel-caption">
            <h5 className="fs-1 fw-bold">Equipate para salir a la pista</h5>
            <p className="fs-4">"Indumentaria y calzado de primera calidad, al mejor precio."</p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}
