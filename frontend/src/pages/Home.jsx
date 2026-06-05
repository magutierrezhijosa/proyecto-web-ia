import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { api } from '../services/api'
import './Home.css'

const CATEGORIES = [
  'Todas',
  'Slopers',
  'Regletas',
  'Jugs',
  'Pinzas',
  'Agujeros',
  'Volúmenes',
]

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  const activeCategory = searchParams.get('categoria') || 'Todas'
  const searchQuery = searchParams.get('search') || ''

  useEffect(() => {
    setLoading(true)
    const category = activeCategory === 'Todas' ? null : activeCategory
    const search = searchQuery || null

    api.getProducts(category, search)
      .then(setProducts)
      .catch((err) => {
        console.error('Error al cargar productos:', err)
        setProducts([])
      })
      .finally(() => setLoading(false))
  }, [activeCategory, searchQuery])

  const handleCategory = (cat) => {
    const params = new URLSearchParams(searchParams)
    if (cat === 'Todas') {
      params.delete('categoria')
    } else {
      params.set('categoria', cat)
    }
    params.delete('search') // limpiar búsqueda al cambiar categoría
    setSearchParams(params)
  }

  return (
    <div className="home">
      {/* Hero section */}
      <section className="hero">
        <div className="container hero__content">
          <h1 className="hero__title">
            Presas de Escalada<br />
            <span className="hero__accent">para escalar más alto</span>
          </h1>
          <p className="hero__subtitle">
            Explorá nuestra colección de presas diseñadas para rocódromos, entrenamiento en casa y paredes profesionales.
            Calidad y durabilidad en cada agarre.
          </p>
          <div className="hero__actions">
            <a href="#productos" className="btn btn-primary hero__btn">Ver productos</a>
            <a href="#categorias" className="btn btn-outline hero__btn">Categorías</a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categorias" className="categories container">
        <h2 className="section-title">Categorías</h2>
        <div className="categories__grid">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`categories__chip ${activeCategory === cat ? 'categories__chip--active' : ''}`}
              onClick={() => handleCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="productos" className="products container">
        <div className="products__header">
          <h2 className="section-title">
            {searchQuery
              ? `Resultados para "${searchQuery}"`
              : activeCategory === 'Todas'
                ? 'Todos los productos'
                : activeCategory}
          </h2>
          {!loading && (
            <span className="products__count">{products.length} producto{products.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {loading ? (
          <div className="products__grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="product-card">
                <div className="skeleton" style={{ aspectRatio: '1' }} />
                <div style={{ padding: 16 }}>
                  <div className="skeleton" style={{ height: 14, width: '40%', marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 18, width: '80%', marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 12, width: '100%', marginBottom: 12 }} />
                  <div className="skeleton" style={{ height: 36, width: '100%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="products__grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="products__empty">
            <span className="products__empty-icon">🔍</span>
            <p>No encontramos productos que coincidan con tu búsqueda.</p>
            <button
              className="btn btn-primary"
              onClick={() => setSearchParams({})}
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
