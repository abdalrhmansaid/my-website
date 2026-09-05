export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-themed bg-surface overflow-hidden animate-pulse">
      <div className="aspect-square bg-surface-2" />
      <div className="p-4 space-y-2">
        <div className="h-3 w-3/4 bg-surface-2 rounded" />
        <div className="h-3 w-1/2 bg-surface-2 rounded" />
        <div className="h-4 w-1/3 bg-surface-2 rounded mt-3" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
