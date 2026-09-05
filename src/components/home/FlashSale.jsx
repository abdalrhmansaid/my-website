import { useMemo } from 'react';
import { Zap } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import { ProductService } from '@/services/ProductService';
import Section from '@/components/product/Section';
import ProductGrid from '@/components/product/ProductGrid';
import CountdownTimer from '@/components/product/CountdownTimer';
import { storage } from '@/utils/storage';

export default function FlashSale() {
  const { settings } = useStore();
  const flash = settings.flashSale;

  const endTime = useMemo(() => {
    const cacheKey = 'velora_flash_sale_end';
    let end = storage.get(cacheKey, null);
    if (!end || end < Date.now()) {
      end = Date.now() + 1000 * 60 * 60 * 8; // 8 hours from first visit
      storage.set(cacheKey, end);
    }
    return end;
  }, []);

  if (!flash?.enabled) return null;
  const products = ProductService.getByIds(flash.productIds).filter((p) => p.status === 'active');
  if (!products.length) return null;

  return (
    <section className="bg-surface border-y border-themed">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 md:mb-8">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-full bg-[var(--color-danger)]/10 flex items-center justify-center text-[var(--color-danger)]">
              <Zap size={18} />
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-primary">{flash.title}</h2>
          </div>
          <CountdownTimer endTime={endTime} />
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
