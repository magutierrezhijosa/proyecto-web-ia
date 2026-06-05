import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

function Navbar() {
  const { totalItems } = useCart()
  const { isAuthenticated, user, logout } = useAuth()
  const [search, setSearch] = useState('')
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }
    if (showMenu) {
      document.addEventListener('mousedown', handleClick)
    }
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showMenu])

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setShowMenu(false)
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
          <button type="submit" className="navbar__search-btn">🔍</button>
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

          {isAuthenticated ? (
            <div className="navbar__user-menu" ref={menuRef}>
              <button
                className="navbar__user-btn"
                onClick={() => setShowMenu(!showMenu)}
              >
                <span className="navbar__user-avatar">🧗</span>
                <span className="navbar__link-text">{user?.username}</span>
              </button>

              {showMenu && (
                <div className="navbar__dropdown">
                  <Link to="/perfil" className="navbar__dropdown-item" onClick={() => setShowMenu(false)}>
                    👤 Mi perfil
                  </Link>
                  <button className="navbar__dropdown-item" onClick={handleLogout}>
                    🚪 Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="navbar__link">
                <span className="navbar__link-icon">🔑</span>
                <span className="navbar__link-text">Ingresar</span>
              </Link>
              <Link to="/registro" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                Crear cuenta
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
