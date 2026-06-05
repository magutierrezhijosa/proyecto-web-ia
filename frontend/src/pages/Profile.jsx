import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'
import { Link } from 'react-router-dom'
import './Profile.css'

function Profile() {
  const { user, logout, updateUser } = useAuth()
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    address: '',
  })
  const [saveMsg, setSaveMsg] = useState('')

  useEffect(() => {
    if (user) {
      setForm({
        full_name: user.full_name || '',
        phone: user.phone || '',
        address: user.address || '',
      })
    }
  }, [user])

  useEffect(() => {
    api.getOrders()
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setOrdersLoading(false))
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setSaveMsg('')
    try {
      const updated = await api.updateProfile(form)
      updateUser(updated)
      setSaveMsg('Datos guardados correctamente')
      setEditing(false)
    } catch (err) {
      setSaveMsg(`Error: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="profile container">
      <div className="profile__header">
        <div className="profile__user-info">
          <span className="profile__avatar">🧗</span>
          <div>
            <h1>{user?.full_name || user?.username}</h1>
            <span className="profile__email">{user?.email}</span>
          </div>
        </div>
        <button className="btn btn-secondary" onClick={logout}>
          Cerrar sesión
        </button>
      </div>

      <div className="profile__layout">
        {/* Datos personales */}
        <section className="profile__section">
          <div className="profile__section-header">
            <h2>Mis datos</h2>
            {!editing && (
              <button className="btn btn-outline" onClick={() => setEditing(true)}>
                Editar
              </button>
            )}
          </div>

          {saveMsg && (
            <div className={`profile__msg ${saveMsg.includes('Error') ? 'profile__msg--error' : ''}`}>
              {saveMsg}
            </div>
          )}

          {editing ? (
            <form className="profile__form" onSubmit={handleSave}>
              <div className="auth-field">
                <label>Nombre completo</label>
                <input
                  type="text"
                  value={form.full_name}
                  onChange={(e) => setForm((p) => ({ ...p, full_name: e.target.value }))}
                />
              </div>
              <div className="auth-field">
                <label>Teléfono</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                />
              </div>
              <div className="auth-field">
                <label>Dirección</label>
                <textarea
                  value={form.address}
                  onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                  placeholder="Calle, número, ciudad, código postal..."
                />
              </div>
              <div className="profile__form-actions">
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Guardando...' : 'Guardar cambios'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="profile__data">
              <div className="profile__data-row">
                <span className="profile__data-label">Usuario</span>
                <span>{user?.username}</span>
              </div>
              <div className="profile__data-row">
                <span className="profile__data-label">Email</span>
                <span>{user?.email}</span>
              </div>
              <div className="profile__data-row">
                <span className="profile__data-label">Teléfono</span>
                <span>{user?.phone || '—'}</span>
              </div>
              <div className="profile__data-row">
                <span className="profile__data-label">Dirección</span>
                <span>{user?.address || '—'}</span>
              </div>
              <div className="profile__data-row">
                <span className="profile__data-label">Miembro desde</span>
                <span>{user?.created_at ? formatDate(user.created_at) : '—'}</span>
              </div>
            </div>
          )}
        </section>

        {/* Historial de compras */}
        <section className="profile__section">
          <h2>Mis compras</h2>

          {ordersLoading ? (
            <div className="profile__skeleton">
              {[1, 2].map((i) => (
                <div key={i} className="skeleton" style={{ height: 80, marginBottom: 12, borderRadius: 8 }} />
              ))}
            </div>
          ) : orders.length > 0 ? (
            <div className="profile__orders">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-card__header">
                    <span className="order-card__id">Orden #{order.id}</span>
                    <span className="order-card__date">{formatDate(order.created_at)}</span>
                    <span className="order-card__status">{order.status}</span>
                    <span className="order-card__total">${order.total.toFixed(2)}</span>
                  </div>
                  <div className="order-card__items">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-card__item">
                        <div className="order-card__item-img">
                          {item.image_url ? (
                            <img src={item.image_url} alt={item.name} />
                          ) : (
                            <span>🧗</span>
                          )}
                        </div>
                        <div className="order-card__item-info">
                          <Link to={`/producto/${item.id}`}>{item.name}</Link>
                          <span>${item.price.toFixed(2)} x {item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="profile__empty">
              <span style={{ fontSize: '2.5rem' }}>🛒</span>
              <p>Todavía no hiciste ninguna compra.</p>
              <Link to="/" className="btn btn-primary">Ver productos</Link>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Profile
