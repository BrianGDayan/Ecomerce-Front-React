import { useState, useEffect } from "react"
import { Product } from "./Product";
import '../styles/ProductList.css'

export const ProductList = () => {
   // Estado para almacenar los productos
   const [products, setProducts] = useState([]);

   // Hacer fetch a la API para obtener los productos
   useEffect(() => {
     const fetchProducts = async () => {
       try {
         const response = await fetch('http://localhost:3000/productos');
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
         <p className='p-filters'>Search by Filters</p>
         <input type='text' placeholder='Search...' />
         <button>Search</button>
         <select>
           <option value=''>Filter by price</option>
           <option value=''>Price: Low to High</option>
           <option value=''>Price: High to Low</option>
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

