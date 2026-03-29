import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../Context/CartContext'
import { formatPrice } from '../Utils/helpers'

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQty,
    clearCart,
    itemCount,
    subtotal,
    shipping,
    tax,
    total,
    toFreeShip
  } = useCart()

  const [confirmClear, setConfirmClear] = useState(false)

  // EMPTY STATE
  if (items.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
          <ShoppingBag size={32} className="text-gray-400" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-900">
          Your cart is empty
        </h2>

        <p className="text-gray-500 mt-2 mb-6">
          Looks like you haven't added anything yet.
        </p>

        <Link
          to="/shop"
          className="px-6 py-3 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-semibold text-gray-900">
          Shopping Cart{' '}
          <span className="text-gray-400 font-normal">
            ({itemCount} item{itemCount > 1 && 's'})
          </span>
        </h1>

        <button
          onClick={() => setConfirmClear(true)}
          className="text-sm text-gray-400 hover:text-red-500 flex items-center gap-1"
        >
          <Trash2 size={14} /> Clear cart
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
        {/* CART ITEMS */}
        <div>
          {items.map(({ product, qty }) => (
            <div
              key={product.id}
              className="flex justify-between items-start py-5 border-b border-gray-200"
            >
              {/* LEFT */}
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-contain p-2"
                    onError={(e) => {
                      e.target.src =
                        'https://placehold.co/80x80?text=No+Image'
                    }}
                  />
                </div>

                <div>
                  <p className="text-xs text-gray-400 capitalize mb-1">
                    {product.category}
                  </p>

                  <p className="text-sm font-medium text-gray-900">
                    {product.title}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Unit: {formatPrice(product.price)}
                  </p>

                  {/* QTY */}
                  <div className="flex items-center mt-3 border rounded-md w-fit">
                    <button
                      onClick={() => updateQty(product.id, qty - 1)}
                      className="px-2 py-1"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="px-3 text-sm">{qty}</span>

                    <button
                      onClick={() => updateQty(product.id, qty + 1)}
                      className="px-2 py-1"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-end">
                <p className="font-semibold text-gray-900">
                  {formatPrice(product.price * qty)}
                </p>

                <button
                  onClick={() => removeItem(product.id)}
                  className="text-sm text-gray-400 hover:text-red-500 mt-2 flex items-center gap-1"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        <div>
          <div className="bg-gray-50 rounded-xl p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-5 text-gray-900">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Subtotal ({itemCount} items)
                </span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>{formatPrice(shipping)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Tax (8%)</span>
                <span>{formatPrice(tax)}</span>
              </div>

              <div className="border-t pt-3 flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {/* FREE SHIPPING TEXT */}
            {toFreeShip > 0 && (
              <p className="text-xs text-orange-500 mt-3">
                Add {formatPrice(toFreeShip)} more for free shipping
              </p>
            )}

            {/* BUTTON */}
            <button className="mt-5 w-full py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition">
              Checkout
            </button>

            <Link
              to="/shop"
              className="block text-center text-sm text-gray-400 mt-3 hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* CLEAR CART MODAL */}
      {confirmClear && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-2">
              Clear your cart?
            </h3>

            <p className="text-sm text-gray-500 mb-5">
              This will remove all {itemCount} items.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setConfirmClear(false)}
                className="flex-1 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  clearCart()
                  setConfirmClear(false)
                }}
                className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}