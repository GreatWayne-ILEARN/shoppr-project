import { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import { useFetch } from '../Hooks/useFetch'
import { API_BASE } from '../Utils/constants'
import { PostSkeleton } from '../Components/Skeletons'
import { ErrorMessage } from '../Components/States'
import BlogCard from '../Components/BlogCard'

export default function BlogPage() {
  const [q, setQ] = useState('')
  const { data, loading, error } = useFetch(`${API_BASE}/posts?limit=30`)
  const posts = data?.posts ?? []

  const filtered = useMemo(() => {
    if (!q.trim()) return posts
    const term = q.toLowerCase()
    return posts.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.body.toLowerCase().includes(term) ||
      p.tags?.some(t => t.includes(term))
    )
  }, [posts, q])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="text-xs text-tertiary-500 uppercase tracking-widest mb-1">Our journal</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: '2.4rem', fontWeight: 600, color: '#0F0F0F' }}>
          Blog
        </h1>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-8">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary-500" />
        <input
          type="text"
          placeholder="Search posts…"
          value={q}
          onChange={e => setQ(e.target.value)}
          className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-tertiary-300 bg-white text-sm placeholder-tertiary-500 focus:outline-none focus:border-primary-400 transition-colors"
        />
        {q && (
          <button onClick={() => setQ('')} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X size={14} color="#b5a898" />
          </button>
        )}
      </div>

      {!loading && !error && (
        <p className="text-sm text-tertiary-500 mb-5">
          {filtered.length} post{filtered.length !== 1 ? 's' : ''}
          {q && ` matching "${q}"`}
        </p>
      )}

      {error && <ErrorMessage message={error} />}

      {!error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading
            ? Array.from({ length: 9 }).map((_, i) => <PostSkeleton key={i} />)
            : filtered.length === 0
              ? (
                <div className="col-span-full text-center py-16 text-tertiary-500">
                  <p className="text-lg" style={{ fontFamily: 'Cormorant Garamond' }}>No posts found for "{q}"</p>
                </div>
              )
              : filtered.map((post, i) => (
                  <div key={post.id} className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 9) * 50}ms` }}>
                    <BlogCard post={post} />
                  </div>
                ))
          }
        </div>
      )}
    </div>
  )
}
