import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Navbar.css'

function Navbar() {
  const { totalItems } = useCart()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`)
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">🧗</span>
          <span className="navbar__logo-text">Presa<span className="navbar__logo-accent">Climb</span></span>
        </Link>

        <form className="navbar__search" onSubmit={handleSearch}>
          <input
            type="text"
            className="navbar__search-input"
            placeholder="Buscá presas, categorías..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="navbar__search-btn">
            🔍
          </button>
        </form>

        <div className="navbar__actions">
          <Link to="/" className="navbar__link">
            <span className="navbar__link-icon">🏠</span>
            <span className="navbar__link-text">Inicio</span>
          </Link>

          <Link to="/carrito" className="navbar__cart">
            <span className="navbar__cart-icon">🛒</span>
            {totalItems > 0 && (
              <span className="navbar__cart-badge">{totalItems}</span>
            )}
            <span className="navbar__link-text">Carrito</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
