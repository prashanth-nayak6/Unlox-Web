import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import NotFound from './NotFound';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import '../styles/products.css';

export default function ProductDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 500);
    return () => window.clearTimeout(timer);
  }, [id]);

  const product = useMemo(() => products.find((item) => item.id === Number(id)), [id]);

  if (!loading && !product) {
    return <NotFound />;
  }

  if (loading) {
    return <div className="page-shell container loading-state">Loading product details...</div>;
  }

  const relatedProducts = products.filter(
    (item) => item.category === product.category && item.id !== product.id
  );

  return (
    <div className="page-shell container product-details-page">
      <Link to="/products" className="text-link back-link">
        Back to products
      </Link>

      <section className="product-details-card">
        <img src={product.image} alt={product.title} className="details-image" />

        <div className="details-content">
          <span className="product-category">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="details-rating">Rating: {product.rating} / 5</p>
          <p className="details-description">{product.description}</p>

          <div className="details-actions">
            <strong className="details-price">${product.price.toFixed(2)}</strong>
            <button type="button" className="primary-button" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {relatedProducts.length ? (
        <section className="related-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Related items</span>
              <h2>More in {product.category}</h2>
            </div>
          </div>
          <div className="product-grid related-grid">
            {relatedProducts.slice(0, 3).map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                onAddToCart={addToCart}
                showDescription={false}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}