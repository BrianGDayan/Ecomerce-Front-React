import { useContext, useState } from "react";
import { ProductosContext } from "../context/ProductosContext";
import "../styles/AdminScreen.css";

export const AdminScreen = () => {
  const { productos, agregarProducto, editarProducto, eliminarProducto } = useContext(ProductosContext);
  const [modoEdicion, setModoEdicion] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen_url: "",
    id_categoria: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const abrirModalAgregar = () => {
    setModoEdicion(null);
    setFormData({
      id: "",
      nombre: "",
      descripcion: "",
      precio: "",
      stock: "",
      imagen_url: "",
      id_categoria: "",
    });
    const modal = new window.bootstrap.Modal(document.getElementById("productModal"));
    modal.show();
  };

  const abrirModalEditar = (producto) => {
    setModoEdicion(producto.id);
    setFormData({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      imagen_url: producto.imagen_url,
      id_categoria: producto.id_categoria,
    });
    const modal = new window.bootstrap.Modal(document.getElementById("productModal"));
    modal.show();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modoEdicion) {
      editarProducto(formData);
    } else {
      agregarProducto({ ...formData, id: Date.now() });
    }
    const modal = window.bootstrap.Modal.getInstance(document.getElementById("productModal"));
    modal.hide();
  };

  return (
    <div className="admin-screen">
      <h1>Gestión de Productos</h1>
      <button onClick={abrirModalAgregar} className="btn btn-primary mb-3">
        Agregar Producto
      </button>

      <div className="lista-productos">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-item">
            <img src={producto.imagen_url} alt={producto.nombre} className="producto-imagen" />
            <div className="producto-detalles">
              <h3>{producto.nombre}</h3>
              <p className="producto-descripcion">{producto.descripcion}</p>
              <p>Precio: ${producto.precio}</p>
              <p>Stock: {producto.stock}</p>
              <p>Categoría: {producto.id_categoria}</p> {/* Mostrar la categoría */}
            </div>
            <div className="producto-acciones">
              <button onClick={() => abrirModalEditar(producto)} className="btn btn-warning me-2">
                Editar
              </button>
              <button onClick={() => eliminarProducto(producto.id)} className="btn btn-danger">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Bootstrap */}
      <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="productModalLabel">
                {modoEdicion ? "Editar Producto" : "Agregar Producto"}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">
                    Descripción
                  </label>
                  <textarea
                    className="form-control"
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="precio" className="form-label">
                    Precio
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="precio"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="stock" className="form-label">
                    Stock
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="imagen_url" className="form-label">
                    URL de la Imagen
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="imagen_url"
                    name="imagen_url"
                    value={formData.imagen_url}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="id_categoria" className="form-label">
                    Categoría del Producto (1-5)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="id_categoria"
                    name="id_categoria"
                    value={formData.id_categoria}
                    onChange={handleChange}
                    min="1"
                    max="5"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  {modoEdicion ? "Guardar Cambios" : "Agregar Producto"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
