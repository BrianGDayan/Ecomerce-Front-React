import { useEffect, useState } from 'react'
import { ProductosContext } from './ProductosContext'

export const ProductosProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);

    const fetchProductos = async () => {
        try {
            const response = await fetch('http://localhost:3001/productos'); // Cambia según tu endpoint
            const data = await response.json();
            setProductos(data);
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    return (
        <ProductosContext.Provider value={{ productos }}>
            {children}
        </ProductosContext.Provider>
    );
};
