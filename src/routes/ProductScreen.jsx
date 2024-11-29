import { useState, useEffect } from "react"
import { Product } from "../components/Product";
import '../styles/ProductScreen.css'

export const ProductScreen = () => {
  // Estado para almacenar los productos
  const [products, setProducts] = useState([]);

  // Hacer fetch a la API para obtener los productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/productos');
        const data = await response.json();
        setProducts(data); // Guardar los productos en el estado
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProducts();
  }, []); // El array vacío significa que solo se ejecutará una vez al montar el componente
  return (
    <div className='container-all'>
      <div className='container-filters'>
        <p className='p-filters'>Buscar Producto</p>
        
        {/* Campo para buscar por nombre */}
        <label htmlFor="product-search" className='label-filters'>Por nombre:</label>
        <input
          type='text'
          id="product-search"
          placeholder='Nombre del producto'
          className='input-search'
        />
        <button className='btn-search'>Buscar</button>
        
        {/* Selección de categoría */}
        <label htmlFor="category-select" className='label-filters'>Por categoría:</label>
        <select id="category-select" className='select-category'>
          <option value='' disabled selected>Seleccionar categoría</option>
          <option value='ropa'>Ropa</option>
          <option value='calzado'>Calzado</option>
          <option value='accesorios'>Accesorios</option>
          <option value='tecnologia'>Tecnología</option>
          <option value='suplementos'>Suplementos</option>
        </select>
      </div>
      <div className="container-products">
        {/* Mostrar los productos en el componente Product */}
        {products.length > 0 ? (
          products.map((product) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  )
}
