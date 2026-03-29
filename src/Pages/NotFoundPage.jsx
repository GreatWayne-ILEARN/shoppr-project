import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'

export default function NotFoundPage() {
  const location = useLocation()

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Big 404 */}
      <div className="relative mb-6">
        <span style={{
          fontSize: 'clamp(8rem, 20vw, 14rem)',
          fontWeight: 700,
          color: '#e4ddd3',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          userSelect: 'none',
        }}>
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white border border-tertiary-300 flex items-center justify-center shadow-sm">
            <Compass size={28} color="#D4AF70" />
          </div>
        </div>
      </div>

      <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: '2rem', fontWeight: 600, color: '#0F0F0F' }} className="mb-2">
        Page not found
      </h1>
      <p className="text-secondary-400 mb-2 max-w-sm">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <code className="text-xs px-3 py-1.5 rounded-lg bg-tertiary-100 border border-tertiary-300 text-tertiary-500 mb-8 font-mono">
        {location.pathname}
      </code>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary-800 text-tertiary-100 text-sm font-medium hover:bg-primary-600 transition-all"
        >
          <ArrowLeft size={15} /> Go Home
        </Link>
        <Link to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-tertiary-300 text-secondary-500 text-sm font-medium hover:border-primary-400 hover:text-primary-600 transition-all bg-white"
        >
          Browse Shop
        </Link>
      </div>
    </div>
  )
}
