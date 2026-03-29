import { AlertCircle, PackageSearch } from 'lucide-react'

export function ErrorMessage({ message = 'Something went wrong. Please try again.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-[#fee2e2] flex items-center justify-center mb-4">
        <AlertCircle size={28} color="#b91c1c" />
      </div>
      <h3 className="text-xl font-semibold text-secondary-800 mb-2" style={{ fontFamily: 'Cormorant Garamond' }}>
        Failed to load
      </h3>
      <p className="text-secondary-400 max-w-sm">{message}</p>
    </div>
  )
}

export function EmptyResults({ query }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-tertiary-100 flex items-center justify-center mb-4 border border-tertiary-300">
        <PackageSearch size={28} color="#b5a898" />
      </div>
      <h3 className="text-xl font-semibold text-secondary-800 mb-2" style={{ fontFamily: 'Cormorant Garamond' }}>
        No products found
      </h3>
      <p className="text-secondary-400 max-w-sm">
        {query
          ? `We couldn't find anything matching "${query}". Try a different search or browse all products.`
          : 'No products match the selected filters. Try adjusting your selections.'}
      </p>
    </div>
  )
}
