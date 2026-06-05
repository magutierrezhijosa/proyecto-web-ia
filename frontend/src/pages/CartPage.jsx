import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './CartPage.css'

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart()

  if (cart.length === 0) {
    return (
      <div className="container cart-page">
        <div className="cart-empty">
          <span className="cart-empty__icon">🛒</span>
          <h2>Tu carrito está vacío</h2>
          <p>Agregá productos desde la tienda para empezar a comprar.</p>
          <Link to="/" className="btn btn-primary">
            Ver productos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container cart-page fade-in">
      <div className="cart-page__header">
        <h1 className="section-title">Carrito de compras</h1>
        <span className="cart-page__count">{totalItems} {totalItems === 1 ? 'producto' : 'productos'}</span>
      </div>

      <div className="cart-page__layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item__image">
                <span>🧗</span>
              </div>

              <div className="cart-item__info">
                <Link to={`/producto/${item.id}`} className="cart-item__name">
                  {item.name}
                </Link>
                <span className="cart-item__category">{item.category}</span>
                <span className="cart-item__price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>

              <div className="cart-item__quantity">
                <button
                  className="cart-item__qty-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>
                <span className="cart-item__qty-value">{item.quantity}</span>
                <button
                  className="cart-item__qty-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <div className="cart-item__unit-price">
                ${item.price.toFixed(2)} c/u
              </div>

              <button
                className="cart-item__remove"
                onClick={() => removeFromCart(item.id)}
                title="Eliminar"
              >
                🗑️
              </button>
            </div>
          ))}

          <button className="btn btn-secondary cart-page__clear" onClick={clearCart}>
            Vaciar carrito
          </button>
        </div>

        <div className="cart-summary">
          <h3 className="cart-summary__title">Resumen</h3>

          <div className="cart-summary__rows">
            <div className="cart-summary__row">
              <span>Productos ({totalItems})</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="cart-summary__row">
              <span>Envío</span>
              <span className="cart-summary__free">Gratis</span>
            </div>
            <div className="cart-summary__divider" />
            <div className="cart-summary__row cart-summary__total">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button className="btn btn-primary cart-summary__checkout" onClick={() => alert('🚧 Checkout en construcción — pronto vas a poder finalizar la compra')}>
            Finalizar compra
          </button>
          <Link to="/" className="btn btn-outline cart-summary__continue">
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartPage
