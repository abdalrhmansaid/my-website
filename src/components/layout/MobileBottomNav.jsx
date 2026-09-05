import { NavLink } from 'react-router-dom';
import { Home, Grid3x3, Heart, MessageCircle, Menu } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import { useWishlist } from '@/contexts/WishlistContext';

export default function MobileBottomNav({ onOpenMenu }) {
  const { settings } = useStore();
  const { count } = useWishlist();

  const items = [
    { to: '/', icon: Home, label: 'الرئيسية', end: true },
    { to: '/products', icon: Grid3x3, label: 'المنتجات' },
    { to: '/wishlist', icon: Heart, label: 'المفضلة', badge: count },
    { href: `https://wa.me/${settings.whatsappNumber}`, icon: MessageCircle, label: 'واتساب' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-surface border-t border-themed grid grid-cols-5">
      {items.map((item) =>
        item.href ? (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center gap-0.5 py-2 text-secondary"
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </a>
        ) : (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center gap-0.5 py-2 ${isActive ? 'text-[var(--color-brand)]' : 'text-secondary'}`
            }
          >
            <span className="relative">
              <item.icon size={20} />
              {!!item.badge && (
                <span className="absolute -top-1.5 -left-2 bg-[var(--color-danger)] text-white text-[9px] font-bold rounded-full min-w-[15px] h-[15px] flex items-center justify-center px-0.5">
                  {item.badge}
                </span>
              )}
            </span>
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        )
      )}
      <button onClick={onOpenMenu} className="flex flex-col items-center justify-center gap-0.5 py-2 text-secondary">
        <Menu size={20} />
        <span className="text-[10px] font-medium">القائمة</span>
      </button>
    </nav>
  );
}
