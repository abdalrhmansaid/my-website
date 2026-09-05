import { Link } from 'react-router-dom';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import { useStore } from '@/contexts/StoreContext';

export default function Hero() {
  const { settings } = useStore();
  const hero = settings.hero;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[var(--color-brass)]/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[var(--color-brand)]/15 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center relative">
        <div className="animate-entry order-2 md:order-1">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-primary leading-[1.15] mb-5">
            {hero.title}
          </h1>
          <p className="text-secondary text-base md:text-lg leading-relaxed max-w-lg mb-8">
            {hero.description}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/products"
              className="rounded-full bg-[var(--color-brand)] text-white font-semibold px-7 py-3.5 hover:bg-[var(--color-brand-light)] transition-colors"
            >
              {hero.primaryButtonText}
            </Link>
            <Link
              to="/offers"
              className="rounded-full border border-themed text-primary font-semibold px-7 py-3.5 hover:bg-surface-2 transition-colors"
            >
              {hero.secondaryButtonText}
            </Link>
          </div>
        </div>

        <div className="order-1 md:order-2 relative">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-surface-2">
            <ImageWithFallback src={hero.image} alt={hero.title} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-5 -right-5 bg-surface border border-themed rounded-xl px-5 py-3.5 shadow-lg hidden sm:block">
            <p className="text-xs text-secondary">تقييم عملائنا</p>
            <p className="font-display font-bold text-lg text-primary">4.8 / 5</p>
          </div>
        </div>
      </div>
    </section>
  );
}
