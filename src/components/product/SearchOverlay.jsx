import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { ProductService } from '@/services/ProductService';
import { useDebounce } from '@/hooks/useDebounce';
import { formatPrice } from '@/utils/format';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import EmptyState from '@/components/common/EmptyState';

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 200);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const results = debounced.trim() ? ProductService.search(debounced).slice(0, 6) : [];

  const goToResults = () => {
    if (!query.trim()) return;
    navigate(`/products?q=${encodeURIComponent(query.trim())}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute top-0 inset-x-0 bg-surface rounded-b-2xl shadow-xl max-h-[85vh] overflow-y-auto animate-entry">
        <div className="max-w-2xl mx-auto p-4">
          <div className="flex items-center gap-2 border border-themed rounded-full px-4 py-2.5">
            <Search size={18} className="text-secondary shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && goToResults()}
              placeholder="ابحث عن منتج، تصنيف، أو كلمة..."
              className="flex-1 bg-transparent outline-none text-sm text-primary placeholder:text-secondary"
            />
            {query && (
              <button onClick={() => setQuery('')} aria-label="مسح البحث" className="text-secondary hover:text-primary">
                <X size={16} />
              </button>
            )}
            <button onClick={onClose} className="text-sm text-secondary hover:text-primary shrink-0">إغلاق</button>
          </div>

          <div className="mt-3">
            {debounced.trim() && results.length === 0 && (
              <EmptyState
                icon={Search}
                title="لا توجد نتائج"
                description={`لم نعثر على منتجات تطابق "${debounced}"`}
              />
            )}

            {results.map((product) => (
              <button
                key={product.id}
                onClick={() => { navigate(`/products/${product.id}`); onClose(); }}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-2 transition-colors text-right"
              >
                <ImageWithFallback src={product.images?.[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary truncate">{product.name}</p>
                  <p className="text-xs text-secondary">{formatPrice(product.price)}</p>
                </div>
              </button>
            ))}

            {results.length > 0 && (
              <button
                onClick={goToResults}
                className="w-full text-center text-sm font-semibold text-[var(--color-brand)] py-2.5 hover:underline"
              >
                عرض كل النتائج
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
