import { Link } from 'react-router-dom';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import { CategoryService } from '@/services/CategoryService';
import Section from '@/components/product/Section';

export default function CategoryGrid() {
  const categories = CategoryService.withProductCounts();
  if (!categories.length) return null;

  return (
    <Section title="تسوّق حسب التصنيف" subtitle="اختر ما يناسبك من مجموعاتنا المتنوعة">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((c) => (
          <Link
            key={c.id}
            to={`/products?category=${c.id}`}
            className="group flex flex-col items-center text-center gap-2.5"
          >
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-surface-2 border border-themed">
              <ImageWithFallback src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">{c.name}</p>
              <p className="text-xs text-secondary">{c.productCount} منتج</p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
