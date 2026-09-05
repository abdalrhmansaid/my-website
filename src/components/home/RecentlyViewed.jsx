import { useEffect, useState } from 'react';
import { RecentlyViewedService } from '@/services/RecentlyViewedService';
import { ProductService } from '@/services/ProductService';
import Section from '@/components/product/Section';
import ProductGrid from '@/components/product/ProductGrid';

export default function RecentlyViewed({ excludeId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const ids = RecentlyViewedService.getIds().filter((id) => id !== excludeId);
    setProducts(ProductService.getByIds(ids));
  }, [excludeId]);

  if (!products.length) return null;

  return (
    <Section title="شاهدته مؤخرًا">
      <ProductGrid products={products} />
    </Section>
  );
}
