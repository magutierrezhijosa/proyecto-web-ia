import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)

    try {
      await register({
        username: form.username,
        email: form.email,
        password: form.password,
        full_name: form.full_name,
        phone: form.phone,
      })
      navigate('/perfil')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--wide">
        <div className="auth-header">
          <span className="auth-icon">🧗</span>
          <h1>Crear cuenta</h1>
          <p>Registrate para comprar y gestionar tu perfil</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}

          <div className="auth-row">
            <div className="auth-field">
              <label htmlFor="username">Usuario *</label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="tu_usuario"
                value={form.username}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div className="auth-field">
              <label htmlFor="full_name">Nombre completo</label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                placeholder="Tu nombre"
                value={form.full_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="phone">Teléfono</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+54 11 1234-5678"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="auth-row">
            <div className="auth-field">
              <label htmlFor="password">Contraseña *</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>
            <div className="auth-field">
              <label htmlFor="confirmPassword">Confirmar *</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Repetir contraseña"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
