import { useState } from "react";
import { useContext } from "react";
import { Product } from "../components/Product";
import { ProductosContext } from "../context/ProductosContext";
import { CarritoContext } from "../context/CarritoContext";
import "../styles/ProductScreen.css";

export const ProductScreen = () => {
  const { productos } = useContext(ProductosContext);
  const { agregarCompra, eliminarCompra } = useContext(CarritoContext);
  const [searchTerm, setSearchTerm] = useState(""); // Para buscar por nombre
  const [selectedCategory, setSelectedCategory] = useState(""); // Para filtrar por categoría

  const handleAgregar = (compra) => {
    agregarCompra(compra);
  };

  const handleQuitar = (id) => {
    eliminarCompra(id);
  };

  // Filtrar productos
  const filteredProducts = productos.filter((product) => {
    const matchesSearch = product.nombre?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || product.id_categoria === parseInt(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container-all">
      <div className="container-filters">
        <p className="p-filters">Buscar Producto</p>

        <label htmlFor="product-search" className="label-filters">
          Por nombre:
        </label>
        <input
          type="text"
          id="product-search"
          placeholder="Nombre del producto"
          className="input-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <label htmlFor="category-select" className="label-filters">
          Por categoría:
        </label>
        <select
          id="category-select"
          className="select-category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
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
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product
              key={product.id}
              product={product}
              handleAgregar={() => handleAgregar(product)}
              handleQuitar={() => handleQuitar(product.id)}
            />
          ))
        ) : (
          <div className="no-products">
            <p>No se encontraron productos.</p>
          </div>
        )}
      </div>
    </div>
  );
};
