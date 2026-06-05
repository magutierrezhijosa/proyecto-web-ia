const API_BASE = '/api'

function getToken() {
  try {
    return localStorage.getItem('token')
  } catch {
    return null
  }
}

async function fetchJSON(url, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers }

  const token = getToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE}${url}`, { headers, ...options })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'Error de conexión' }))
    throw new Error(error.detail || `Error ${res.status}`)
  }

  if (res.status === 204) return null
  return res.json()
}

export const api = {
  // === Productos ===
  getProducts(category, search) {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (search) params.set('search', search)
    const qs = params.toString()
    return fetchJSON(`/products/${qs ? `?${qs}` : ''}`)
  },

  getProduct(id) {
    return fetchJSON(`/products/${id}`)
  },

  // === Auth ===
  register(data) {
    return fetchJSON('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  login(email, password) {
    // OAuth2PasswordRequestForm expects form data
    const formData = new URLSearchParams()
    formData.append('username', email)
    formData.append('password', password)

    return fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    }).then(async (res) => {
      if (!res.ok) {
        const error = await res.json().catch(() => ({ detail: 'Error de conexión' }))
        throw new Error(error.detail || `Error ${res.status}`)
      }
      return res.json()
    })
  },

  getMe() {
    return fetchJSON('/auth/me')
  },

  updateProfile(data) {
    return fetchJSON('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  // === Órdenes ===
  getOrders() {
    return fetchJSON('/orders/')
  },

  createOrder(items, total) {
    return fetchJSON('/orders/', {
      method: 'POST',
      body: JSON.stringify({ items, total }),
    })
  },
}
