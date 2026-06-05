import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

function loadCart() {
  try {
    const saved = localStorage.getItem('carrito')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(item => item.id === action.product.id)
      if (existing) {
        return state.map(item =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...state, { ...action.product, quantity: 1 }]
    }

    case 'REMOVE':
      return state.filter(item => item.id !== action.id)

    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.id
          ? { ...item, quantity: Math.max(1, action.quantity) }
          : item
      )

    case 'CLEAR':
      return []

    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, null, loadCart)

  // Persistir carrito en localStorage
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => dispatch({ type: 'ADD', product })
  const removeFromCart = (id) => dispatch({ type: 'REMOVE', id })
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', id, quantity })
  const clearCart = () => dispatch({ type: 'CLEAR' })

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider')
  }
  return context
}
