import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Search, Heart, MessageCircle, Menu, Sun, Moon } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useTheme } from '@/contexts/ThemeContext';
import SearchOverlay from '@/components/product/SearchOverlay';

const LINKS = [
  { to: '/', label: 'الرئيسية', end: true },
  { to: '/products', label: 'المنتجات' },
  { to: '/offers', label: 'العروض' },
  { to: '/about', label: 'من نحن' },
  { to: '/contact', label: 'تواصل معنا' },
];

export default function Navbar({ onMenuClick }) {
  const { settings } = useStore();
  const { count } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}`;

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-shadow ${scrolled ? 'shadow-sm' : ''}`}
        style={{ backgroundColor: 'color-mix(in srgb, var(--bg-page) 88%, transparent)', backdropFilter: 'blur(10px)' }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <span className="w-9 h-9 rounded-xl bg-[var(--color-brand)] flex items-center justify-center">
                <span className="font-display font-extrabold text-white text-lg">
                  {settings.logoText?.[0] || 'ف'}
                </span>
              </span>
              <span className="font-display font-extrabold text-lg text-primary hidden sm:inline">
                {settings.storeName}
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive ? 'text-[var(--color-brand)] bg-surface-2' : 'text-secondary hover:text-primary'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="بحث"
                className="w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-2 transition-colors"
              >
                <Search size={19} />
              </button>

              <button
                onClick={toggleTheme}
                aria-label="تبديل الوضع الليلي"
                className="w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-2 transition-colors"
              >
                {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
              </button>

              <Link
                to="/wishlist"
                aria-label="المفضلة"
                className="relative w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-2 transition-colors"
              >
                <Heart size={19} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -left-0.5 bg-[var(--color-danger)] text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 min-w-[18px] h-[18px] flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[var(--color-brand)] text-white text-sm font-semibold px-4 py-2 hover:bg-[var(--color-brand-light)] transition-colors"
              >
                <MessageCircle size={16} />
                واتساب
              </a>

              <button
                onClick={onMenuClick}
                aria-label="القائمة"
                className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-2 transition-colors"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
