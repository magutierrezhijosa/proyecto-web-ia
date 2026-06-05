import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './ProductCard.css'

const CATEGORY_ICONS = {
  'Slopers': '🌀',
  'Regletas': '📏',
  'Jugs': '🫴',
  'Pinzas': '🤏',
  'Agujeros': '🕳️',
  'Volúmenes': '🔷',
}

function getCategoryIcon(category) {
  return CATEGORY_ICONS[category] || '🧗'
}

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [imgError, setImgError] = useState(false)

  return (
    <article className="product-card fade-in">
      <Link to={`/producto/${product.id}`} className="product-card__image-wrap">
        <div className="product-card__image">
          {product.image_url && !imgError ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="product-card__img"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="product-card__image-icon">{getCategoryIcon(product.category)}</span>
          )}
        </div>
        {product.featured && <span className="product-card__badge">Destacado</span>}
      </Link>

      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>

        <Link to={`/producto/${product.id}`} className="product-card__name">
          {product.name}
        </Link>

        <p className="product-card__description">{product.description}</p>

        <div className="product-card__footer">
          <span className="product-card__price">
            ${product.price.toFixed(2)}
          </span>

          <button
            className="btn btn-primary product-card__add"
            onClick={() => addToCart(product)}
          >
            + Agregar
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
