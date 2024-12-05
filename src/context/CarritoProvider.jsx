import { CarritoContext } from './CarritoContext';
import { createContext, useReducer } from "react";

const initialState = [];

export const CarritoProvider = ({ children }) => {
  const comprasReducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case '[CARRITO] Agregar Compra':
        return [...state, action.payload];
      case '[CARRITO] Aumentar Cantidad Compra':
        return state.map(item => {
          const cant = item.cantidad + 1;
          if (item.id === action.payload) return { ...item, cantidad: cant };
          return item;
        });
      case '[CARRITO] Disminuir Cantidad Compra':
        return state.map(item => {
          const cant = item.cantidad - 1;
          if (item.id === action.payload && item.cantidad > 1) return { ...item, cantidad: cant };
          return item;
        });
      case '[CARRITO] Eliminar Compra':
        return state.filter(compra => compra.id !== action.payload);
      case '[CARRITO] Vaciar Carrito': // Nueva acción para vaciar el carrito
        return [];
      default:
        return state;
    }
  };

  const [listaCompras, dispatch] = useReducer(comprasReducer, initialState);

  const agregarCompra = async (producto) => {
    const productoExistente = listaCompras.find(item => item.id === producto.id);

    if (!productoExistente) {
      const productoCompleto = {
        ...producto,
        cantidad: 1
      };
      dispatch({
        type: '[CARRITO] Agregar Compra',
        payload: productoCompleto
      });
    } else {
      aumentarCantidad(producto.id);
    }
  };

  const aumentarCantidad = (id) => {
    dispatch({ type: '[CARRITO] Aumentar Cantidad Compra', payload: id });
  };

  const disminuirCantidad = (id) => {
    dispatch({ type: '[CARRITO] Disminuir Cantidad Compra', payload: id });
  };

  const eliminarCompra = (id) => {
    dispatch({ type: '[CARRITO] Eliminar Compra', payload: id });
  };

  const vaciarCarrito = () => {
    dispatch({ type: '[CARRITO] Vaciar Carrito' });
  };

  return (
    <CarritoContext.Provider value={{
      listaCompras,
      agregarCompra,
      aumentarCantidad,
      disminuirCantidad,
      eliminarCompra,
      vaciarCarrito
    }}>
      {children}
    </CarritoContext.Provider>
  );
};
