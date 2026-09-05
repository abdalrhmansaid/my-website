import { NavLink } from 'react-router-dom';
import { X, MessageCircle } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';

const LINKS = [
  { to: '/', label: 'الرئيسية', end: true },
  { to: '/products', label: 'المنتجات' },
  { to: '/offers', label: 'العروض' },
  { to: '/about', label: 'من نحن' },
  { to: '/contact', label: 'تواصل معنا' },
];

export default function MobileMenu({ open, onClose }) {
  const { settings, categories } = useStore();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute top-0 bottom-0 right-0 w-[82%] max-w-xs bg-surface p-5 flex flex-col overflow-y-auto animate-entry">
        <div className="flex items-center justify-between mb-6">
          <span className="font-display font-bold text-lg text-primary">{settings.storeName}</span>
          <button onClick={onClose} aria-label="إغلاق" className="text-secondary">
            <X size={22} />
          </button>
        </div>
        <nav className="flex flex-col gap-1">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onClose}
              className={({ isActive }) =>
                `px-3 py-3 rounded-lg text-base font-medium ${isActive ? 'text-[var(--color-brand)] bg-surface-2' : 'text-primary hover:bg-surface-2'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-4 pt-4 border-t border-themed">
          <p className="text-xs font-semibold text-secondary mb-2 px-3">التصنيفات</p>
          <div className="flex flex-col gap-1">
            {categories.filter((c) => c.enabled).map((c) => (
              <NavLink
                key={c.id}
                to={`/products?category=${c.id}`}
                onClick={onClose}
                className="px-3 py-2.5 rounded-lg text-sm text-secondary hover:text-primary hover:bg-surface-2"
              >
                {c.name}
              </NavLink>
            ))}
          </div>
        </div>

        <a
          href={`https://wa.me/${settings.whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="mt-auto flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand)] text-white font-semibold px-4 py-3"
        >
          <MessageCircle size={18} />
          تواصل عبر واتساب
        </a>
      </div>
    </div>
  );
}
