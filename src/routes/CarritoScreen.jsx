import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import "../styles/CarritoScreen.css";

export const CarritoScreen = () => {
  const { listaCompras, aumentarCantidad, disminuirCantidad, eliminarCompra, vaciarCarrito } = useContext(CarritoContext);

  // Función para calcular el total del carrito
  const calcularTotal = () =>
    listaCompras.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

  // Función para realizar la compra
  const realizarCompra = () => {
    const total = calcularTotal();
    alert(
      `Compra confirmada, usted debe pagar $${total} por los productos. Le enviaremos un email con los detalles a seguir, gracias por su compra.`
    );
    vaciarCarrito(); // Vaciar el carrito tras la compra
  };

  return (
    <div className="carrito-screen">
      <h2>Carrito de Compras</h2>
      {listaCompras.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          {listaCompras.map((producto) => (
            <div key={producto.id} className="carrito-item">
              <img src={producto.imagen_url} alt={producto.nombre} className="producto-img" />
              <div className="producto-details">
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <p>Precio: ${producto.precio}</p>
                <div className="cantidad-controls">
                  <button onClick={() => disminuirCantidad(producto.id)}>-</button>
                  <span>{producto.cantidad}</span>
                  <button onClick={() => aumentarCantidad(producto.id)}>+</button>
                </div>
                <p>Subtotal: ${producto.precio * producto.cantidad}</p>
                <button onClick={() => eliminarCompra(producto.id)}>Eliminar</button>
              </div>
            </div>
          ))}
          <div className="carrito-total">
            <h3>Total: ${calcularTotal()}</h3>
          </div>
          <div className="carrito-actions">
            <button
              onClick={realizarCompra}
              disabled={listaCompras.length === 0}
              className="btn-realizar-compra"
            >
              Realizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
