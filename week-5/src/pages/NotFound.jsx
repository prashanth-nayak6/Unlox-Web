import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page-shell container not-found-page">
      <div className="not-found-card">
        <span className="eyebrow">404</span>
        <h1>Page not found</h1>
        <p>The page you requested does not exist. Return to the catalog or go back home.</p>
        <div className="hero-actions">
          <Link to="/" className="primary-button">
            Go Home
          </Link>
          <Link to="/products" className="secondary-button">
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
}