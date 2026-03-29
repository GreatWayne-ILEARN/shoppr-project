import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useFetch } from '../hooks/useFetch'
import { API_BASE } from '../Utils/constants'
import { ErrorMessage } from '../Components/States'

export default function PostPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: post, loading, error } = useFetch(`${API_BASE}/posts/${id}`)

  if (loading) return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
      <div className="skeleton h-4 w-32 rounded" />
      <div className="skeleton h-10 w-3/4 rounded" />
      <div className="skeleton h-4 w-48 rounded" />
      <div className="space-y-3 mt-6">
        {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-4 w-full rounded" />)}
      </div>
    </div>
  )

  if (error) return <div className="max-w-3xl mx-auto px-4 py-10"><ErrorMessage message={error} /></div>
  if (!post) return null

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-tertiary-500 mb-6">
        <button
        onClick={() => navigate(-1)}
        className="mt-8 flex items-center gap-1.5 text-sm text-tertiary-500 hover:text-secondary-800 transition-colors"
      >
        <ArrowLeft size={14} />Blog
      </button>
      </nav>
    
      <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: '#0F0F0F', lineHeight: 1.15 }} className="mb-4">
        {post.title}
      </h1>

      {/* Body */}
      <div className="prose max-w-none text-secondary-700 leading-8 text-[1.05rem]">
        {post.body.split('\n').map((para, i) => (
          <p key={i} className="mb-5">{para}</p>
        ))}
      </div>
      
    </div>
  )
}
