import { useState, useEffect, useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { ProductosContext } from "../context/ProductosContext";
import { useAuth } from "../components/AuthContext";
import "../styles/CarritoScreen.css";

export const CarritoScreen = () => {
  const { listaCompras, aumentarCantidad, disminuirCantidad, eliminarCompra, vaciarCarrito } = useContext(CarritoContext);
  const { productos } = useContext(ProductosContext);
  const { isUser } = useAuth();

  // Calcular el total del carrito
  const calcularTotal = () =>
    listaCompras.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

  // Realizar la compra
  const realizarCompra = async () => {
    const total = calcularTotal();
    const token = sessionStorage.getItem("token");
    let errorEncontrado = false;

    // Validar el carrito antes de proceder con la compra
    for (const prod of listaCompras) {
      const storedProduct = productos.find((p) => p.id === prod.id);

      if (!storedProduct) {
        alert(`El producto con ID ${prod.id} ya no está disponible.`);
        errorEncontrado = true;
        break;
      }

      if (storedProduct.stock < prod.cantidad) {
        alert(`El producto "${storedProduct.nombre}" tiene stock insuficiente.`);
        errorEncontrado = true;
        break;
      }
    }

    if (errorEncontrado) {
      alert("No se pudo completar la compra debido a problemas con los productos seleccionados.");
      return; // Cancelar el proceso de compra
    }

    try {
      const result = await guardarCompra(token, total);

      if (result && result.compraId) {
        alert(
          `Compra confirmada, usted debe pagar $${total}. Gracias por su compra.`
        );
        vaciarCarrito(); // Vaciar el carrito tras la compra
      } else {
        throw new Error('Error al procesar la compra.');
      }
    } catch (error) {
      console.error('Error al realizar la compra:', error);
      alert('Ocurrió un problema al procesar la compra. Inténtalo nuevamente.');
    }
  };

  const guardarCompra = async (token, total) => {
    const newCompra = {
      id_usuario: isUser.id,
      monto_total: total,
      productos: listaCompras.map((producto) => ({
        id_producto: producto.id,
        cantidad: producto.cantidad,
      })),
    };

    try {
      const response = await fetch("https://database-fk.alwaysdata.net/compra", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCompra),
      });

      if (!response.ok) {
        throw new Error("Error al guardar la compra.");
      }

      const result = await response.json();
      console.log("Compra registrada con éxito:", result);
      return result; // Devuelve el resultado de la compra
    } catch (error) {
      console.log("Error al guardar la compra:", error);
      alert("Ocurrió un problema al realizar la compra. Inténtalo nuevamente.");
      return null;
    }
  };

  const handleAumentar = (producto) => {
    const storedProduct = productos.find((prod) => prod.id === producto.id);
    if (producto.cantidad >= storedProduct.stock) {
      alert("No puedes agregar más unidades. Stock insuficiente.");
      return;
    }
    aumentarCantidad(producto.id);
  };

  return (
    <div className="carrito-screen">
      <h2>Carrito de Compras</h2>
      {listaCompras.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="d-flex flex-column gap-3">
          {listaCompras.map((producto) => (
            <div key={producto.id} className="carrito-item">
              <img
                src={producto.imagen_url}
                alt={producto.nombre}
                className="producto-img"
              />
              <div className="producto-details">
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <p>Precio: ${producto.precio}</p>
                <div className="cantidad-controls">
                  {producto.cantidad > 1 ? (
                    <button onClick={() => disminuirCantidad(producto.id)}>
                      -
                    </button>
                  ) : null}
                  <span>{producto.cantidad}</span>
                  <button onClick={() => handleAumentar(producto)}>+</button>
                </div>
                <p>Subtotal: ${producto.precio * producto.cantidad}</p>
                <button onClick={() => eliminarCompra(producto.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className="carrito-foot">
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
        </div>
      )}
    </div>
  );
};
