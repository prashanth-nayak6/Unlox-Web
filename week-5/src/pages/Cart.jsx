import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';
import '../styles/cart.css';

export default function Cart() {
  const {
    cartItems,
    totalItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  return (
    <div className="page-shell container cart-page">
      <section className="section-heading">
        <div>
          <span className="eyebrow">Your selection</span>
          <h1>Cart summary</h1>
          <p>{totalItems} item(s) in your cart.</p>
        </div>
        {cartItems.length ? (
          <button type="button" className="secondary-button" onClick={clearCart}>
            Clear Cart
          </button>
        ) : null}
      </section>

      {cartItems.length ? (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Order summary</h2>
            <div className="summary-row">
              <span>Total items</span>
              <strong>{totalItems}</strong>
            </div>
            <div className="summary-row">
              <span>Total price</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>
            <button type="button" className="primary-button full-width-button">
              Proceed to Checkout
            </button>
          </aside>
        </div>
      ) : (
        <div className="empty-cart-state">
          <h2>Your cart is empty</h2>
          <p>Add products from the home page or product listing page to see them here.</p>
          <Link to="/products" className="primary-button">
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}