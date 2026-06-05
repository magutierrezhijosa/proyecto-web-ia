const API_BASE = '/api'

async function fetchJSON(url, options = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'Error de conexión' }))
    throw new Error(error.detail || `Error ${res.status}`)
  }

  if (res.status === 204) return null
  return res.json()
}

export const api = {
  /** Obtener todos los productos (con filtros opcionales) */
  getProducts(category, search) {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (search) params.set('search', search)
    const qs = params.toString()
    return fetchJSON(`/products/${qs ? `?${qs}` : ''}`)
  },

  /** Obtener un producto por ID */
  getProduct(id) {
    return fetchJSON(`/products/${id}`)
  },
}
