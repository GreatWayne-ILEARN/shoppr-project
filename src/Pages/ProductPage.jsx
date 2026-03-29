import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShoppingBag, ArrowLeft, Minus, Plus, Truck, RefreshCw, ShieldCheck } from 'lucide-react'
import { useFetch } from '../Hooks/useFetch'
import { API_BASE } from '../Utils/constants'
import { useCart } from '../Context/CartContext'
import { formatPrice } from '../Utils/helpers'
import Stars from '../Components/Stars'
import ProductCard from '../Components/ProductCard'
import { ProductDetailSkeleton } from '../Components/Skeletons'
import { ErrorMessage } from '../Components/States'

const TRUST = [
  { Icon: Truck,       text: 'Free shipping on orders over $75' },
  { Icon: RefreshCw,   text: '30-day hassle-free returns'       },
  { Icon: ShieldCheck, text: 'Secure, encrypted checkout'       },
]

export default function ProductPage() {
  const { id }       = useParams()
  const navigate     = useNavigate()
  const { addItem }  = useCart()

  const [qty, setQty]             = useState(1)
  const [added, setAdded]         = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [tab, setTab]             = useState('description')

  const { data: product, loading, error } = useFetch(`${API_BASE}/products/${id}`)
  const { data: allData } = useFetch(product ? `${API_BASE}/products?limit=100` : null)

  const related = useMemo(() => {
    if (!product || !allData?.products) return []
    return allData.products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4)
  }, [product, allData])

  function handleAdd() {
    if (!product) return
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return <ProductDetailSkeleton />
  if (error)   return <div className="max-w-6xl mx-auto px-6 py-10"><ErrorMessage message={error} /></div>
  if (!product) return null

  const images  = [product.thumbnail, ...(product.images ?? [])].filter(Boolean)
  const inStock = (product.stock ?? 0) > 0

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-secondary-400 hover:text-secondary-800 transition-colors mb-6"
      >
        <ArrowLeft size={15} /> Back
      </button>

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">

        {/* Left — image */}
        <div className="space-y-3">
          <div className="aspect-square rounded-2xl overflow-hidden bg-[#f5f7fa] border border-[#e8eaed] flex items-center justify-center p-8">
            <img
              src={images[activeImg]}
              alt={product.title}
              className="w-full h-full object-contain transition-all duration-300"
              onError={e => { e.target.src = 'https://placehold.co/500x500/f0f2f5/c0c8d0?text=No+Image' }}
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all bg-[#f5f7fa] ${
                    activeImg === i ? 'border-secondary-800' : 'border-[#e8eaed] hover:border-[#c0c8d0]'
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-contain p-1.5"
                    onError={e => { e.target.src = 'https://placehold.co/64x64/f0f2f5/c0c8d0?text=?' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right — details */}
        <div className="flex flex-col">

          <p className="text-xs font-semibold text-secondary-400 uppercase tracking-widest mb-2">
            {product.category?.replace(/-/g, ' ')}
          </p>

          <h1 className="text-[1.9rem] font-semibold text-neutral-900 leading-tight mb-3"
              style={{ letterSpacing: '-0.01em' }}>
            {product.title}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <Stars rating={product.rating ?? 0} size="sm" />
            {product?.brand && (
              <span className="text-sm text-secondary-400">· {product.brand}</span>
            )}
          </div>

          <p className="text-3xl font-bold text-neutral-900 mb-3"
             style={{ letterSpacing: '-0.02em' }}>
            {formatPrice(product.price)}
          </p>

          <p className={`text-sm font-medium mb-5 ${inStock ? 'text-[#16a34a]' : 'text-[#b91c1c]'}`}>
            {inStock ? 'In stock' : 'Out of stock'}
          </p>

          <div className="h-px bg-neutral-200 mb-5" />

          {inStock ? (
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-11 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm font-medium text-neutral-900">{qty}</span>
                <button
                  onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                  className="w-10 h-11 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 h-11 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all ${
                  added
                    ? 'bg-[#16a34a] text-white'
                    : 'bg-neutral-900 text-white hover:bg-neutral-800'
                }`}
              >
                <ShoppingBag size={16} />
                {added ? 'Added!' : 'Add to Cart'}
              </button>
            </div>
          ) : (
            <div className="h-11 flex items-center justify-center rounded-xl bg-[#fee2e2] text-[#b91c1c] text-sm font-medium mb-5">
              Currently out of stock
            </div>
          )}

          <div className="space-y-2.5">
            {TRUST.map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5 text-xs text-secondary-400">
                <Icon size={13} className="shrink-0 text-neutral-400" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description / Details tabs */}
      <div className="mb-14">
        <div className="flex gap-6 border-b border-neutral-200 mb-6">
          {['description', 'details'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 text-sm font-medium capitalize transition-colors relative ${
                tab === t ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-700'
              }`}
            >
              {t}
              {tab === t && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {tab === 'description' && (
          <p className="text-sm text-neutral-700 leading-7 max-w-2xl">
            {product.description}
          </p>
        )}

        {tab === 'details' && (
          <div className="max-w-md">
            <table className="w-full text-sm">
              <tbody>
                {[
                  ['Category', product.category?.replace(/-/g, ' ')],
                  ['Brand',    product?.brand ?? '—'],
                  ['SKU',      product.id],
                  ['Rating',   `${product.rating?.toFixed(2)} / 5`],
                  ['Stock',    product.stock],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-neutral-100">
                    <td className="py-3 pr-8 font-medium text-neutral-700 capitalize w-28">{label}</td>
                    <td className="py-3 text-secondary-400 capitalize">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section>
          <div className="mb-6">
            <p className="text-xs text-tertiary-500 uppercase tracking-widest mb-1">You might also like</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.8rem', fontWeight: 600, color: '#0F0F0F' }}>
              Related Products
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}