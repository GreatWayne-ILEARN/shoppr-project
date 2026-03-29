export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-tertiary-300 flex flex-col">
      <div className="aspect-square skeleton" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-3 w-20 rounded" />
        <div className="skeleton h-5 w-full rounded" />
        <div className="skeleton h-4 w-24 rounded" />
        <div className="flex justify-between items-center pt-2">
          <div className="skeleton h-6 w-16 rounded" />
          <div className="skeleton h-8 w-16 rounded" />
        </div>
      </div>
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="skeleton aspect-square rounded-2xl" />
      <div className="space-y-4">
        <div className="skeleton h-4 w-28 rounded" />
        <div className="skeleton h-10 w-3/4 rounded" />
        <div className="skeleton h-4 w-32 rounded" />
        <div className="skeleton h-24 w-full rounded" />
        <div className="skeleton h-12 w-40 rounded" />
        <div className="skeleton h-14 w-full rounded" />
      </div>
    </div>
  )
}

export function PostSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 border border-tertiary-300 space-y-3">
      <div className="skeleton h-3 w-24 rounded" />
      <div className="skeleton h-6 w-full rounded" />
      <div className="skeleton h-6 w-4/5 rounded" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-3/4 rounded" />
    </div>
  )
}
