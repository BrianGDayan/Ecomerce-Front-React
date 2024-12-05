import { useContext, useState } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import '../styles/Product.css';

export const Product = ({ product, handleAgregar, handleQuitar }) => {
  const { agregarCompra, eliminarCompra } = useContext(CarritoContext);
  const [added, setAdded] = useState(false)

  const clickAgregar = () => {
    handleAgregar()
    setAdded(true)
  }
  const clickQuitar = () => {
      handleQuitar()
      setAdded(false)
  }

  return (
    <div className="product-card">
      <img
        src={product.imagen_url}
        alt={product.nombre}
        className="product-image"
      />
      <h3 className="product-name">{product.nombre}</h3>
      <p className="product-price">Precio: ${product.precio}</p>
      <p className="product-stock">Stock: {product.stock}</p>

      {added ? (
        <button
          className="product-remove-button"
          onClick={clickQuitar}
        >
          Quitar del carrito
        </button>
      ) : (
        <button className="product-buy-button" 
        onClick={clickAgregar}>
          Añadir al carrito
        </button>
      )}
    </div>
  );
};
