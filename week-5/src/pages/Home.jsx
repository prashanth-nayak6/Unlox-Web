import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { featuredProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import '../styles/home.css';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="page-shell home-page">
      <section className="hero-section container">
        <div className="hero-copy">
          <span className="eyebrow">Fresh picks for everyday shopping</span>
          <h1>Modern products, fast browsing, and a cart that just works.</h1>
          <p>
            Discover featured products, inspect details with dynamic routing, and manage your cart from a
            centralized state that persists across refreshes.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="primary-button large-button">
              Browse Products
            </Link>
            <Link to="/cart" className="secondary-button large-button">
              View Cart
            </Link>
          </div>
        </div>

        <div className="hero-stats">
          <div>
            <strong>12+</strong>
            <span>sample products</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>responsive layout</span>
          </div>
          <div>
            <strong>Local</strong>
            <span>cart persistence</span>
          </div>
        </div>
      </section>

      <section className="container featured-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Featured products</span>
            <h2>Hand-picked items with high ratings and strong visual appeal.</h2>
          </div>
          <Link to="/products" className="text-link">
            See all products
          </Link>
        </div>

        {loading ? (
          <div className="loading-state">Loading featured products...</div>
        ) : (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}