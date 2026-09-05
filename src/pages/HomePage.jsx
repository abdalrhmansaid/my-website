import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import CategoryGrid from '@/components/home/CategoryGrid';
import FlashSale from '@/components/home/FlashSale';
import PromoBanner from '@/components/home/PromoBanner';
import Section from '@/components/product/Section';
import ProductGrid from '@/components/product/ProductGrid';
import { ProductService } from '@/services/ProductService';

export default function HomePage() {
  const featured = ProductService.getFeatured().slice(0, 8);
  const bestSellers = ProductService.getBestSellers().slice(0, 4);
  const newArrivals = ProductService.getNewArrivals().slice(0, 4);

  return (
    <>
      <Hero />
      <Features />
      <CategoryGrid />
      <FlashSale />

      {featured.length > 0 && (
        <Section title="منتجات مميزة" subtitle="اختيارات فريقنا هذا الأسبوع" viewAllLink="/products">
          <ProductGrid products={featured} />
        </Section>
      )}

      <PromoBanner />

      {bestSellers.length > 0 && (
        <Section title="الأكثر مبيعًا" subtitle="المنتجات التي يثق بها عملاؤنا" viewAllLink="/products?sort=best-selling">
          <ProductGrid products={bestSellers} />
        </Section>
      )}

      {newArrivals.length > 0 && (
        <Section title="وصل حديثًا" subtitle="أحدث الإضافات إلى المتجر" viewAllLink="/products?sort=newest">
          <ProductGrid products={newArrivals} />
        </Section>
      )}
    </>
  );
}
