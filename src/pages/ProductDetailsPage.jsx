import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { MessageCircle, Heart, Share2, ShoppingBag, ChevronLeft, CheckCircle2, XCircle } from 'lucide-react';
import { FacebookIcon } from '@/components/common/BrandIcons';
import { ProductService } from '@/services/ProductService';
import { CategoryService } from '@/services/CategoryService';
import { SettingsService } from '@/services/SettingsService';
import { AnalyticsService } from '@/services/AnalyticsService';
import { RecentlyViewedService } from '@/services/RecentlyViewedService';
import { useWishlist } from '@/contexts/WishlistContext';
import { formatPrice, shareLinks, currentUrl } from '@/utils/format';
import ProductGallery from '@/components/product/ProductGallery';
import Badge from '@/components/common/Badge';
import RatingStars from '@/components/common/RatingStars';
import ReviewsSection from '@/components/product/ReviewsSection';
import RecentlyViewed from '@/components/home/RecentlyViewed';
import Button from '@/components/common/Button';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(() => ProductService.getById(id));
  const { has, toggle } = useWishlist();

  useEffect(() => {
    const found = ProductService.getById(id);
    setProduct(found);
    if (found) {
      AnalyticsService.trackProductView(found.id);
      RecentlyViewedService.record(found.id);
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!product || product.status !== 'active') {
    return <Navigate to="/products" replace />;
  }

  const category = CategoryService.getById(product.category);
  const discount = ProductService.discountPercent(product);
  const outOfStock = product.stock <= 0;
  const productUrl = currentUrl(`/products/${product.id}`);
  const links = shareLinks({ url: productUrl, title: product.name });

  const handleWhatsAppOrder = () => {
    AnalyticsService.trackBuyClick(product.id);
    AnalyticsService.trackWhatsAppClick(product.id);
    window.open(SettingsService.buildWhatsAppLink(product, { origin: window.location.origin }), '_blank');
  };

  const handleFacebookOrder = () => {
    AnalyticsService.trackFacebookClick(product.id);
    window.open(SettingsService.getFacebookUrl(), '_blank');
  };

  const handleShare = async () => {
    AnalyticsService.trackShare(product.id);
    if (navigator.share) {
      try { await navigator.share({ title: product.name, url: productUrl }); } catch { /* cancelled */ }
    } else {
      window.open(links.whatsapp, '_blank');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-1.5 text-xs text-secondary mb-6">
        <Link to="/" className="hover:text-primary">الرئيسية</Link>
        <ChevronLeft size={13} />
        <Link to="/products" className="hover:text-primary">المنتجات</Link>
        {category && (
          <>
            <ChevronLeft size={13} />
            <Link to={`/products?category=${category.id}`} className="hover:text-primary">{category.name}</Link>
          </>
        )}
        <ChevronLeft size={13} />
        <span className="text-primary truncate">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <div className="flex items-center gap-2 mb-3">
            {product.isNew && <Badge type="new" />}
            {discount > 0 && <Badge type="sale">خصم {discount}%</Badge>}
            {product.bestSeller && <Badge type="bestSeller" />}
          </div>

          <h1 className="font-display font-extrabold text-2xl md:text-3xl text-primary mb-2">{product.name}</h1>
          <RatingStars rating={product.rating} count={product.reviewsCount} size={15} />

          <div className="flex items-baseline gap-3 my-5">
            <span className="font-display font-extrabold text-3xl text-primary">{formatPrice(product.price)}</span>
            {discount > 0 && <span className="text-secondary line-through">{formatPrice(product.oldPrice)}</span>}
          </div>

          <p className="text-secondary leading-relaxed mb-5">{product.description}</p>

          <div className="flex items-center gap-2 mb-6">
            {outOfStock ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-danger)]">
                <XCircle size={16} /> نفدت الكمية حاليًا
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-brand)]">
                <CheckCircle2 size={16} /> متوفر في المخزون ({product.stock} قطعة)
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <Button size="lg" className="flex-1" disabled={outOfStock} onClick={handleWhatsAppOrder}>
              <ShoppingBag size={18} />
              اطلب الآن
            </Button>
            <Button variant="outline" size="lg" onClick={() => toggle(product)}>
              <Heart size={18} className={has(product.id) ? 'fill-[var(--color-danger)] text-[var(--color-danger)]' : ''} />
              {has(product.id) ? 'في المفضلة' : 'أضف للمفضلة'}
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button variant="brass" size="md" className="flex-1" disabled={outOfStock} onClick={handleWhatsAppOrder}>
              <MessageCircle size={16} />
              اطلب عبر واتساب
            </Button>
            <Button variant="ghost" size="md" className="flex-1 border border-themed" onClick={handleFacebookOrder}>
              <FacebookIcon size={16} />
              اطلب عبر فيسبوك
            </Button>
            <Button variant="ghost" size="md" onClick={handleShare} aria-label="مشاركة">
              <Share2 size={16} />
            </Button>
          </div>

          {product.specifications?.length > 0 && (
            <div className="border-t border-themed pt-5">
              <h3 className="font-display font-bold text-primary mb-3">المواصفات</h3>
              <dl className="grid grid-cols-2 gap-y-2.5 text-sm">
                {product.specifications.map((spec) => (
                  <div key={spec.label} className="contents">
                    <dt className="text-secondary">{spec.label}</dt>
                    <dd className="text-primary font-medium">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {product.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {product.tags.map((tag) => (
                <span key={tag} className="text-xs bg-surface-2 text-secondary rounded-full px-3 py-1.5">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-14 max-w-3xl">
        <ReviewsSection productId={product.id} rating={product.rating} reviewsCount={product.reviewsCount} />
      </div>

      <RecentlyViewed excludeId={product.id} />
    </div>
  );
}
