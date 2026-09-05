import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import { ProductService } from '@/services/ProductService';
import { useProducts } from '@/hooks/useProducts';
import ProductGrid from '@/components/product/ProductGrid';
import FilterPanel from '@/components/product/FilterPanel';
import SortDropdown from '@/components/product/SortDropdown';
import { ProductGridSkeleton } from '@/components/common/Skeleton';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';
  const sortParam = searchParams.get('sort') || 'newest';

  const { products, filters, updateFilter, resetFilters, allProducts } = useProducts({
    category: categoryParam === 'all' ? '' : categoryParam,
    sort: sortParam,
  });
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(queryParam);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const displayedProducts = useMemo(() => {
    if (!queryParam.trim()) return products;
    const results = ProductService.search(queryParam);
    const idsInResults = new Set(results.map((p) => p.id));
    return ProductService.filterAndSort(
      allProducts.filter((p) => idsInResults.has(p.id)),
      filters
    );
  }, [products, queryParam, allProducts, filters]);

  const submitSearch = (e) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (searchInput.trim()) next.set('q', searchInput.trim());
    else next.delete('q');
    setSearchParams(next);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="font-display font-extrabold text-2xl md:text-3xl text-primary mb-1">كل المنتجات</h1>
        <p className="text-sm text-secondary">{displayedProducts.length} منتج متاح</p>
      </div>

      <form onSubmit={submitSearch} className="flex items-center gap-2 mb-6 md:hidden">
        <div className="flex-1 flex items-center gap-2 border border-themed rounded-full px-4 py-2.5">
          <Search size={16} className="text-secondary" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="ابحث..."
            className="flex-1 bg-transparent outline-none text-sm text-primary"
          />
        </div>
      </form>

      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="lg:hidden inline-flex items-center gap-1.5 text-sm font-semibold border border-themed rounded-full px-4 py-2"
        >
          <SlidersHorizontal size={15} />
          الفلاتر
        </button>
        <div className="mr-auto">
          <SortDropdown value={filters.sort} onChange={(v) => updateFilter('sort', v)} />
        </div>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        <aside className="hidden lg:block">
          <FilterPanel filters={filters} updateFilter={updateFilter} resetFilters={resetFilters} />
        </aside>

        <div>
          {loading ? (
            <ProductGridSkeleton />
          ) : (
            <ProductGrid
              products={displayedProducts}
              emptyTitle={queryParam ? 'لا توجد نتائج بحث' : 'لا توجد منتجات مطابقة'}
              emptyDescription={queryParam ? `لم نعثر على أي منتج يطابق "${queryParam}"` : 'جرّب تعديل الفلاتر للعثور على ما تبحث عنه'}
            />
          )}
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute bottom-0 inset-x-0 max-h-[85vh] overflow-y-auto bg-surface rounded-t-2xl p-5 animate-entry">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-bold text-lg text-primary">الفلاتر</h3>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="إغلاق">
                <X size={20} className="text-secondary" />
              </button>
            </div>
            <FilterPanel filters={filters} updateFilter={updateFilter} resetFilters={resetFilters} />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full mt-6 rounded-full bg-[var(--color-brand)] text-white font-semibold py-3"
            >
              عرض النتائج
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
