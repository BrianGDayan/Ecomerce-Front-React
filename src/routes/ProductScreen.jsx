import { useState, useEffect } from "react";
import { Product } from "../components/Product";
import "../styles/ProductScreen.css";

export const ProductScreen = () => {
  // Estado para almacenar los productos
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar la carga de productos
  const [searchTerm, setSearchTerm] = useState(""); // Para buscar por nombre
  const [selectedCategory, setSelectedCategory] = useState(""); // Para filtrar por categoría

  // Hacer fetch a la API para obtener los productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/productos");
        const data = await response.json();
        setProducts(data); // Guarda los productos en el estado
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false); // Indica que la carga ha terminado
      }
    };

    fetchProducts();
  }, []); // El array vacío significa que solo se ejecutará una vez al montar el componente

  // Filtrar productos
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.nombre?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || product.id_categoria === parseInt(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container-all">
      <div className="container-filters">
        <p className="p-filters">Buscar Producto</p>

        {/* Campo para buscar por nombre */}
        <label htmlFor="product-search" className="label-filters">
          Por nombre:
        </label>
        <input
          type="text"
          id="product-search"
          placeholder="Nombre del producto"
          className="input-search"
          value={searchTerm} // Conecta el estado con el input
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado
        />

        {/* Selección de categoría */}
        <label htmlFor="category-select" className="label-filters">
          Por categoría:
        </label>
        <select
          id="category-select"
          className="select-category"
          value={selectedCategory} // Conecta el estado con el select
          onChange={(e) => setSelectedCategory(e.target.value)} // Actualiza el estado
        >
          <option value="">Todas las categorías</option>
          <option value="1">Ropa</option>
          <option value="2">Calzado</option>
          <option value="3">Accesorios</option>
          <option value="4">Tecnología</option>
          <option value="5">Suplementos</option>
        </select>
      </div>

      <div className="container-products">
        {/* Mostrar mensajes o productos filtrados */}
        {loading ? (
          <p>Cargando productos...</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
};
