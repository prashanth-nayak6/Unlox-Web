import { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { categories, products } from '../data/products';
import { useCart } from '../context/CartContext';
import '../styles/products.css';

export default function Products() {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 500);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(
    () =>
      selectedCategory === 'All'
        ? products
        : products.filter((product) => product.category === selectedCategory),
    [selectedCategory]
  );

  return (
    <div className="page-shell container products-page">
      <section className="section-heading">
        <div>
          <span className="eyebrow">Catalog</span>
          <h1>Product listing</h1>
          <p>Explore the full collection and open any product for a dynamic detail route.</p>
        </div>
      </section>

      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={selectedCategory === category ? 'filter-pill active' : 'filter-pill'}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-state">Loading products...</div>
      ) : filteredProducts.length ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      ) : (
        <div className="empty-state">No products found for this category.</div>
      )}
    </div>
  );
}