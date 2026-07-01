import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAddToCart, showDescription = true }) {
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-link">
        <img src={product.image} alt={product.title} className="product-image" />
      </Link>

      <div className="product-card-body">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <span className="product-rating">{product.rating} / 5</span>
        </div>

        <h3 className="product-title">{product.title}</h3>
        {showDescription ? <p className="product-description">{product.description}</p> : null}

        <div className="product-card-footer">
          <strong className="product-price">${product.price.toFixed(2)}</strong>
          <div className="product-actions">
            <Link to={`/products/${product.id}`} className="secondary-button">
              Details
            </Link>
            <button type="button" className="primary-button" onClick={() => onAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}