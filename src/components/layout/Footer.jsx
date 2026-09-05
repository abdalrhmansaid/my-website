import { Link } from 'react-router-dom';
import { Send, MessageCircle, MapPin, Mail, Phone } from 'lucide-react';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '@/components/common/BrandIcons';
import { useStore } from '@/contexts/StoreContext';

const SOCIALS = [
  { key: 'facebookUrl', icon: FacebookIcon, label: 'فيسبوك' },
  { key: 'instagramUrl', icon: InstagramIcon, label: 'إنستغرام' },
  { key: 'youtubeUrl', icon: YoutubeIcon, label: 'يوتيوب' },
  { key: 'telegramUrl', icon: Send, label: 'تيليجرام' },
];

export default function Footer() {
  const { settings, categories } = useStore();
  const enabledCategories = categories.filter((c) => c.enabled).slice(0, 5);

  return (
    <footer className="bg-surface border-t border-themed mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-9 h-9 rounded-xl bg-[var(--color-brand)] flex items-center justify-center">
              <span className="font-display font-extrabold text-white text-lg">{settings.logoText?.[0] || 'ف'}</span>
            </span>
            <span className="font-display font-extrabold text-lg text-primary">{settings.storeName}</span>
          </div>
          <p className="text-sm text-secondary leading-relaxed">{settings.description}</p>
          <div className="flex items-center gap-2 mt-4">
            {SOCIALS.filter((s) => settings[s.key]).map((s) => (
              <a
                key={s.key}
                href={settings[s.key]}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full bg-surface-2 flex items-center justify-center text-secondary hover:text-[var(--color-brand)] transition-colors"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-primary mb-3">تصفح</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-secondary hover:text-primary">الرئيسية</Link></li>
            <li><Link to="/products" className="text-secondary hover:text-primary">كل المنتجات</Link></li>
            <li><Link to="/wishlist" className="text-secondary hover:text-primary">المفضلة</Link></li>
            <li><Link to="/about" className="text-secondary hover:text-primary">من نحن</Link></li>
            <li><Link to="/contact" className="text-secondary hover:text-primary">تواصل معنا</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-primary mb-3">التصنيفات</h4>
          <ul className="space-y-2 text-sm">
            {enabledCategories.map((c) => (
              <li key={c.id}>
                <Link to={`/products?category=${c.id}`} className="text-secondary hover:text-primary">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-primary mb-3">تواصل معنا</h4>
          <ul className="space-y-2.5 text-sm text-secondary">
            {settings.phone && <li className="flex items-center gap-2"><Phone size={15} /> {settings.phone}</li>}
            {settings.email && <li className="flex items-center gap-2"><Mail size={15} /> {settings.email}</li>}
            {settings.address && <li className="flex items-center gap-2"><MapPin size={15} /> {settings.address}</li>}
            {settings.whatsappNumber && (
              <li>
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--color-brand)] font-medium hover:underline"
                >
                  <MessageCircle size={15} /> راسلنا على واتساب
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-themed py-5 text-center text-xs text-secondary pb-24 md:pb-5">
        © {new Date().getFullYear()} {settings.storeName}. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
