import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { api } from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // Al montar, recuperar token del localStorage y validarlo
  useEffect(() => {
    const saved = localStorage.getItem('token')
    if (saved) {
      setToken(saved)
      api.getMe()
        .then(setUser)
        .catch(() => {
          // Token inválido — limpiar
          localStorage.removeItem('token')
          setToken(null)
          setUser(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (email, password) => {
    const data = await api.login(email, password)
    localStorage.setItem('token', data.access_token)
    setToken(data.access_token)
    const userData = await api.getMe()
    setUser(userData)
    return userData
  }, [])

  const register = useCallback(async (data) => {
    const result = await api.register(data)
    localStorage.setItem('token', result.access_token)
    setToken(result.access_token)
    const userData = await api.getMe()
    setUser(userData)
    return userData
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }, [])

  const updateUser = useCallback((data) => {
    setUser(prev => ({ ...prev, ...data }))
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}
