import '../styles/Product.css'

export const Product = ({ product }) => {
  return (
    <div className="product-card">
      <img
        src={product.imagen_url}
        alt={product.nombre}
        className="product-image"
      />
      <h3 className="product-name">{product.nombre}</h3>
      <p className="product-price">Price: ${product.precio}</p>
      <p className="product-stock">Stock: {product.stock}</p>
      <button className="product-buy-button">Buy Now</button>
    </div>
  )
}
