import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { api } from '../services/api'
import './ProductDetail.css'

const CATEGORY_ICONS = {
  'Slopers': '🌀',
  'Regletas': '📏',
  'Jugs': '🫴',
  'Pinzas': '🤏',
  'Agujeros': '🕳️',
  'Volúmenes': '🔷',
}

function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    setLoading(true)
    api.getProduct(id)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [id])

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="container detail">
        <div className="detail__skeleton">
          <div className="skeleton" style={{ aspectRatio: '1', maxWidth: 500, borderRadius: 16 }} />
          <div>
            <div className="skeleton" style={{ height: 14, width: '30%', marginBottom: 12 }} />
            <div className="skeleton" style={{ height: 28, width: '80%', marginBottom: 12 }} />
            <div className="skeleton" style={{ height: 80, width: '100%', marginBottom: 20 }} />
            <div className="skeleton" style={{ height: 48, width: 200 }} />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container detail__not-found">
        <span style={{ fontSize: '3rem' }}>🔍</span>
        <h2>Producto no encontrado</h2>
        <p>El producto que buscás no existe o fue eliminado.</p>
        <Link to="/" className="btn btn-primary">Volver a la tienda</Link>
      </div>
    )
  }

  return (
    <div className="container detail fade-in">
      <nav className="detail__breadcrumb">
        <Link to="/">Inicio</Link>
        <span>/</span>
        <Link to={`/?categoria=${product.category}`}>{product.category}</Link>
        <span>/</span>
        <span className="detail__breadcrumb-current">{product.name}</span>
      </nav>

      <div className="detail__grid">
        <div className="detail__image">
          <span className="detail__image-icon">{CATEGORY_ICONS[product.category] || '🧗'}</span>
        </div>

        <div className="detail__info">
          <span className="detail__category">{product.category}</span>
          <h1 className="detail__name">{product.name}</h1>

          <div className="detail__rating">
            {'★'.repeat(4)}{'☆'.repeat(1)}
            <span className="detail__rating-text">4.0 (12 opiniones)</span>
          </div>

          <p className="detail__price">${product.price.toFixed(2)}</p>

          <p className="detail__description">{product.description}</p>

          <div className="detail__meta">
            <div className="detail__meta-item">
              <strong>Stock:</strong> {product.stock > 0
                ? <span className="detail__in-stock">✓ {product.stock} unidades</span>
                : <span className="detail__out-of-stock">✗ Agotado</span>
              }
            </div>
            {product.featured && (
              <div className="detail__meta-item">
                <strong>🏷️ Producto destacado</strong>
              </div>
            )}
          </div>

          <button
            className={`btn btn-primary detail__add-btn ${added ? 'detail__add-btn--added' : ''}`}
            onClick={handleAdd}
            disabled={product.stock === 0}
          >
            {added ? '✓ Agregado al carrito' : 'Agregar al carrito'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
