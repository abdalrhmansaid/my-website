import { Link } from 'react-router-dom';
import { Heart, Share2, ShoppingBag } from 'lucide-react';
import Badge from '@/components/common/Badge';
import RatingStars from '@/components/common/RatingStars';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import { formatPrice } from '@/utils/format';
import { ProductService } from '@/services/ProductService';
import { useWishlist } from '@/contexts/WishlistContext';
import { AnalyticsService } from '@/services/AnalyticsService';
import { SettingsService } from '@/services/SettingsService';
import { CategoryService } from '@/services/CategoryService';
import { shareLinks, currentUrl } from '@/utils/format';

export default function ProductCard({ product }) {
  const { has, toggle } = useWishlist();
  const discount = ProductService.discountPercent(product);
  const outOfStock = product.stock <= 0;
  const category = CategoryService.getById(product.category);

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    AnalyticsService.trackBuyClick(product.id);
    AnalyticsService.trackWhatsAppClick(product.id);
    const url = SettingsService.buildWhatsAppLink(product, { origin: window.location.origin });
    window.open(url, '_blank');
  };

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = currentUrl(`/products/${product.id}`);
    AnalyticsService.trackShare(product.id);
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, url });
      } catch {
        /* user cancelled */
      }
    } else {
      const links = shareLinks({ url, title: product.name });
      window.open(links.whatsapp, '_blank');
    }
  };

  return (
    <Link
      to={`/products/${product.id}`}
      onClick={() => AnalyticsService.trackProductClick(product.id)}
      className="group flex flex-col rounded-xl border border-themed bg-surface overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-square overflow-hidden bg-surface-2">
        <ImageWithFallback
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 items-start">
          {product.isNew && <Badge type="new" />}
          {discount > 0 && <Badge type="sale">خصم {discount}%</Badge>}
          {product.bestSeller && <Badge type="bestSeller" />}
        </div>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(product); }}
          aria-label="إضافة إلى المفضلة"
          className="absolute top-2 left-2 w-8 h-8 rounded-full bg-surface/90 backdrop-blur flex items-center justify-center shadow-sm"
        >
          <Heart size={15} className={has(product.id) ? 'fill-[var(--color-danger)] text-[var(--color-danger)]' : 'text-secondary'} />
        </button>
        {outOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white text-sm font-semibold bg-black/60 px-3 py-1 rounded-full">نفدت الكمية</span>
          </div>
        )}
      </div>

      <div className="p-3.5 flex flex-col gap-1.5 flex-1">
        {category && <p className="text-[11px] text-secondary">{category.name}</p>}
        <h3 className="text-sm font-semibold text-primary line-clamp-2 leading-snug">{product.name}</h3>
        <RatingStars rating={product.rating} count={product.reviewsCount} size={12} />
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-bold text-primary">{formatPrice(product.price)}</span>
          {discount > 0 && <span className="text-xs text-secondary line-through">{formatPrice(product.oldPrice)}</span>}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={handleBuyNow}
            disabled={outOfStock}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--color-brand)] text-white text-xs font-semibold py-2 hover:bg-[var(--color-brand-light)] disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ShoppingBag size={14} />
            اطلب الآن
          </button>
          <button
            onClick={handleShare}
            aria-label="مشاركة المنتج"
            className="w-8 h-8 rounded-full border border-themed flex items-center justify-center text-secondary hover:text-primary shrink-0"
          >
            <Share2 size={13} />
          </button>
        </div>
      </div>
    </Link>
  );
}
