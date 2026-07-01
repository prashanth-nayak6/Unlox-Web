import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className="navbar-shell">
      <div className="navbar">
        <Link to="/" className="brand" onClick={handleLinkClick}>
          <span className="brand-mark">U</span>
          <span>Unlox Shop</span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((previousValue) => !previousValue)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/" onClick={handleLinkClick} end>
            Home
          </NavLink>
          <NavLink to="/products" onClick={handleLinkClick}>
            Products
          </NavLink>
          <NavLink to="/cart" onClick={handleLinkClick} className="cart-link">
            Cart
            <span className="cart-badge">{totalItems}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}