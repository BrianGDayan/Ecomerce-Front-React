import { useContext, useState, useEffect } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import '../styles/Product.css';

export const Product = ({ product }) => {
  const { listaCompras, agregarCompra, eliminarCompra } = useContext(CarritoContext);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const isInCart = listaCompras.some(item => item.id === product.id);
    setAdded(isInCart);
  }, [listaCompras, product.id]);

  const handleAgregar = () => {
    agregarCompra(product);
    setAdded(true);
  };

  const handleQuitar = () => {
    eliminarCompra(product.id);
    setAdded(false);
  };

  return (
    <div className="product-card">
      <img
        src={product.imagen_url}
        alt={product.nombre}
        className="product-image"
      />
      <h3 className="product-name">{product.nombre}</h3>
      <p className="product-price">Precio: ${product.precio}</p>
      {added ? (<p className='add-more'>Agrega más en seccion carrito.</p>) : null
      }
      {added ? (
        <button
          className="product-remove-button"
          onClick={handleQuitar}
        >
          Quitar del carrito
        </button>
      ) : (
        <button
          className="product-buy-button"
          onClick={handleAgregar}
        >
          Añadir al carrito
        </button>
      )}
    </div>
  );
};
