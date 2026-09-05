import { ProductService } from '@/services/ProductService';
import ProductGrid from '@/components/product/ProductGrid';

export default function OffersPage() {
  const products = ProductService.getActive().filter((p) => ProductService.discountPercent(p) > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display font-extrabold text-2xl md:text-3xl text-primary mb-1">العروض والخصومات</h1>
      <p className="text-sm text-secondary mb-6">{products.length} منتج عليه خصم الآن</p>
      <ProductGrid products={products} emptyTitle="لا توجد عروض حاليًا" emptyDescription="تابعنا قريبًا لعروض جديدة" />
    </div>
  );
}
