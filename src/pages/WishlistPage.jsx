import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { ProductService } from '@/services/ProductService';
import ProductGrid from '@/components/product/ProductGrid';
import EmptyState from '@/components/common/EmptyState';
import Button from '@/components/common/Button';

export default function WishlistPage() {
  const { ids } = useWishlist();
  const products = useMemo(() => ProductService.getByIds(ids).filter((p) => p.status === 'active'), [ids]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display font-extrabold text-2xl md:text-3xl text-primary mb-1">المفضلة</h1>
      <p className="text-sm text-secondary mb-6">{products.length} منتج محفوظ</p>

      {products.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="قائمة المفضلة فارغة"
          description="أضف المنتجات التي تعجبك لتجدها هنا بسهولة لاحقًا"
          action={<Button as={Link} to="/products">تصفح المنتجات</Button>}
        />
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
