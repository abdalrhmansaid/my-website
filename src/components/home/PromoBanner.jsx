import { Link } from 'react-router-dom';
import { BannerService } from '@/services/BannerService';
import ImageWithFallback from '@/components/common/ImageWithFallback';

export default function PromoBanner() {
  const banners = BannerService.getEnabled();
  if (!banners.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      {banners.map((banner) => (
        <div key={banner.id} className="relative rounded-2xl overflow-hidden h-56 md:h-72">
          <ImageWithFallback src={banner.image} alt={banner.text} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-transparent" />
          <div className="relative h-full flex flex-col justify-center gap-4 px-6 md:px-10 max-w-md">
            <p className="text-white font-display font-bold text-xl md:text-2xl leading-snug">{banner.text}</p>
            {banner.buttonText && (
              <Link
                to={banner.link || '/products'}
                className="self-start rounded-full bg-white text-[var(--color-ink)] font-semibold text-sm px-5 py-2.5 hover:bg-white/90 transition-colors"
              >
                {banner.buttonText}
              </Link>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
