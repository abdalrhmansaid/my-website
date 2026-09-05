import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Pencil, Copy, Trash2, Eye, EyeOff } from 'lucide-react';
import { ProductService } from '@/services/ProductService';
import { CategoryService } from '@/services/CategoryService';
import { useToast } from '@/contexts/ToastContext';
import { formatPrice } from '@/utils/format';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import Button from '@/components/common/Button';
import EmptyState from '@/components/common/EmptyState';

export default function AdminProductsPage() {
  const [products, setProducts] = useState(() => ProductService.getAll());
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const { showToast } = useToast();
  const categories = CategoryService.getAll();

  const refresh = () => setProducts(ProductService.getAll());

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery = !query.trim() || p.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !categoryFilter || p.category === categoryFilter;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, categoryFilter]);

  const handleDelete = (product) => {
    if (!window.confirm(`هل تريد حذف "${product.name}"؟`)) return;
    ProductService.remove(product.id);
    refresh();
    showToast('تم حذف المنتج بنجاح', 'success');
  };

  const handleDuplicate = (product) => {
    ProductService.duplicate(product.id);
    refresh();
    showToast('تم نسخ المنتج بنجاح', 'success');
  };

  const handleToggle = (product) => {
    ProductService.toggleStatus(product.id);
    refresh();
    showToast(product.status === 'active' ? 'تم تعطيل المنتج' : 'تم تفعيل المنتج', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-primary mb-1">إدارة المنتجات</h1>
          <p className="text-sm text-secondary">{filtered.length} من {products.length} منتج</p>
        </div>
        <Button as={Link} to="/admin/products/new">
          <Plus size={16} />
          إضافة منتج
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 border border-themed rounded-lg px-3 py-2 flex-1 min-w-[220px]">
          <Search size={16} className="text-secondary" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن منتج..."
            className="flex-1 bg-transparent outline-none text-sm text-primary"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-themed rounded-lg px-3 py-2 text-sm text-primary bg-surface outline-none"
        >
          <option value="">كل التصنيفات</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="لا توجد منتجات" description="جرّب تعديل البحث أو أضف منتجًا جديدًا" />
      ) : (
        <div className="bg-surface border border-themed rounded-xl overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="border-b border-themed text-secondary text-xs">
                <th className="text-right font-medium px-4 py-3">المنتج</th>
                <th className="text-right font-medium px-4 py-3">السعر</th>
                <th className="text-right font-medium px-4 py-3">المخزون</th>
                <th className="text-right font-medium px-4 py-3">الحالة</th>
                <th className="text-right font-medium px-4 py-3">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-themed last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <ImageWithFallback src={product.images?.[0]} alt={product.name} className="w-11 h-11 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-primary truncate max-w-[220px]">{product.name}</p>
                        <p className="text-xs text-secondary">{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-primary whitespace-nowrap">{formatPrice(product.price)}</td>
                  <td className="px-4 py-3">
                    <span className={product.stock <= 0 ? 'text-[var(--color-danger)]' : 'text-primary'}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggle(product)}
                      className={`inline-flex items-center gap-1 text-xs font-semibold rounded-full px-2.5 py-1 ${
                        product.status === 'active'
                          ? 'bg-[var(--color-brand)]/10 text-[var(--color-brand)]'
                          : 'bg-surface-2 text-secondary'
                      }`}
                    >
                      {product.status === 'active' ? <Eye size={12} /> : <EyeOff size={12} />}
                      {product.status === 'active' ? 'مفعّل' : 'معطّل'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Link to={`/admin/products/${product.id}`} className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-2" aria-label="تعديل">
                        <Pencil size={15} />
                      </Link>
                      <button onClick={() => handleDuplicate(product)} className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-2" aria-label="نسخ">
                        <Copy size={15} />
                      </button>
                      <button onClick={() => handleDelete(product)} className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10" aria-label="حذف">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
