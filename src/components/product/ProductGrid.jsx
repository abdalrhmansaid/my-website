import ProductCard from './ProductCard';
import EmptyState from '@/components/common/EmptyState';
import { PackageSearch } from 'lucide-react';

export default function ProductGrid({ products, emptyTitle = 'لا توجد منتجات', emptyDescription }) {
  if (!products.length) {
    return <EmptyState icon={PackageSearch} title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
