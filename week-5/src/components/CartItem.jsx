export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <article className="cart-item">
      <img src={item.image} alt={item.title} className="cart-item-image" />

      <div className="cart-item-details">
        <div className="cart-item-top">
          <div>
            <h3>{item.title}</h3>
            <p>{item.category}</p>
          </div>
          <strong>${(item.price * item.quantity).toFixed(2)}</strong>
        </div>

        <div className="cart-item-controls">
          <div className="quantity-controls">
            <button type="button" onClick={() => onDecrease(item.id)} aria-label={`Decrease ${item.title}`}>
              -
            </button>
            <span>{item.quantity}</span>
            <button type="button" onClick={() => onIncrease(item.id)} aria-label={`Increase ${item.title}`}>
              +
            </button>
          </div>

          <button type="button" className="text-button" onClick={() => onRemove(item.id)}>
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}