import { starArray } from '../Utils/helpers'

export default function Stars({ rating = 0, size = 'sm' }) {
  const { full, half, empty } = starArray(rating)
  const sz = size === 'lg' ? 18 : 13

  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: full  }).map((_, i) => <StarFull  key={`f${i}`} sz={sz} />)}
      {half === 1 &&                                           <StarHalf     sz={sz} />}
      {Array.from({ length: empty }).map((_, i) => <StarEmpty key={`e${i}`} sz={sz} />)}
      <span className="ml-1 text-xs" style={{ color: 'var(--ink-300)', fontFamily: 'DM Sans' }}>
        {rating.toFixed(1)}
      </span>
    </span>
  )
}

const StarFull = ({ sz }) => (
  <svg width={sz} height={sz} viewBox="0 0 24 24" fill="#D4AF70">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
)
const StarHalf = ({ sz }) => (
  <svg width={sz} height={sz} viewBox="0 0 24 24">
    <defs>
      <linearGradient id="half"><stop offset="50%" stopColor="#D4AF70"/><stop offset="50%" stopColor="#e4ddd3"/></linearGradient>
    </defs>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#half)"/>
  </svg>
)
const StarEmpty = ({ sz }) => (
  <svg width={sz} height={sz} viewBox="0 0 24 24" fill="#e4ddd3">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
)
