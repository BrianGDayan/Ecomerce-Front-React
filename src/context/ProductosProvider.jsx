import { useEffect, useState } from 'react';
import { ProductosContext } from './ProductosContext';

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  const obtenerToken = () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
          throw new Error("Token no disponible. Inicia sesión nuevamente.");
      }
      return token;
  };

  const obtenerHeaders = (metodo) => {
      try {
          const token = obtenerToken();
          return {
              method: metodo,
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              },
          };
      } catch (error) {
          alert(error.message);
          throw error;
      }
  };

  // Función para cargar los productos desde la base de datos
  const fetchProductos = async () => {
      try {
          const response = await fetch('https://database-fk.alwaysdata.net/productos');
          const data = await response.json();
          setProductos(data);
      } catch (error) {
          console.error('Error al cargar productos:', error);
      }
  };

  useEffect(() => {
      fetchProductos();
  }, []);

  // Función para agregar un nuevo producto a la base de datos
  const agregarProducto = async (nuevoProducto) => {
      try {
          const response = await fetch('https://database-fk.alwaysdata.net/productos/create', {
              ...obtenerHeaders('POST'),
              body: JSON.stringify(nuevoProducto),
          });
          const data = await response.json();
          if (data.id) {
              setProductos((prevProductos) => [...prevProductos, { ...nuevoProducto, id: data.id }]);
              alert("Producto agregado con éxito");
          } else {
              alert("Error al agregar el producto");
          }
      } catch (error) {
          console.error("Error al agregar producto:", error);
      }
  };

  // Función para editar un producto en la base de datos
  const editarProducto = async (productoEditado) => {
    try {
      const response = await fetch(`https://database-fk.alwaysdata.net/productos/update/${productoEditado.id}`, {
        ...obtenerHeaders('PUT'),
        body: JSON.stringify(productoEditado),
      });
    const data = await response.json();
    if (data) {
        setProductos((prevProductos) =>
            prevProductos.map((prod) => (prod.id === productoEditado.id ? productoEditado : prod))
        );
            alert("Producto actualizado");
        } else {
            alert("Error al actualizar el producto");
        }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };
  
  // Función para eliminar un producto de la base de datos
  const eliminarProducto = async (idProducto) => {
      try {
          const response = await fetch(`https://database-fk.alwaysdata.net/productos/delete/${idProducto}`, {
              ...obtenerHeaders('DELETE'),
          });
          const data = await response.json();
          if (data.message) {
              setProductos((prevProductos) =>
                  prevProductos.filter((prod) => prod.id !== idProducto)
              );
              alert("Producto eliminado");
          } else {
              alert("Error al eliminar el producto");
          }
      } catch (error) {
          console.error("Error al eliminar producto:", error);
      }
  };

  return (
      <ProductosContext.Provider value={{ productos, agregarProducto, editarProducto, eliminarProducto, fetchProductos }}>
          {children}
      </ProductosContext.Provider>
  );
};