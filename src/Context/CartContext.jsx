import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST, TAX_RATE } from '../Utils/constants'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addItem = useCallback((product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id
            ? { ...i, qty: Math.min(i.qty + qty, product.stock) }
            : i
        )
      }
      return [...prev, { product, qty: Math.min(qty, product.stock) }]
    })
  }, [])

  const removeItem = useCallback((productId) => {
    setItems(prev => prev.filter(i => i.product.id !== productId))
  }, [])

  const updateQty = useCallback((productId, qty) => {
    if (qty < 1) { removeItem(productId); return }
    setItems(prev =>
      prev.map(i =>
        i.product.id === productId
          ? { ...i, qty: Math.min(qty, i.product.stock) }
          : i
      )
    )
  }, [removeItem])

  const clearCart = useCallback(() => setItems([]), [])

  const itemCount   = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items])
  const subtotal    = useMemo(() => items.reduce((s, i) => s + i.product.price * i.qty, 0), [items])
  const shipping    = subtotal > 0 && subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : subtotal > 0 ? SHIPPING_COST : 0
  const tax         = subtotal * TAX_RATE
  const total       = subtotal + shipping + tax
  const toFreeShip  = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQty, clearCart,
      itemCount, subtotal, shipping, tax, total, toFreeShip,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
