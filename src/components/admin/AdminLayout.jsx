import { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  LayoutDashboard, Package, Tags, Settings, Image, LogOut, Menu, X, ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useStore } from '@/contexts/StoreContext';

const NAV = [
  { to: '/admin', label: 'نظرة عامة', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'المنتجات', icon: Package },
  { to: '/admin/categories', label: 'التصنيفات', icon: Tags },
  { to: '/admin/banners', label: 'البانرات', icon: Image },
  { to: '/admin/settings', label: 'الإعدادات', icon: Settings },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const { settings } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const SidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-5 py-5">
        <span className="w-9 h-9 rounded-xl bg-[var(--color-brand)] flex items-center justify-center">
          <span className="font-display font-extrabold text-white text-lg">{settings.logoText?.[0] || 'ف'}</span>
        </span>
        <div>
          <p className="font-display font-bold text-primary leading-none">{settings.storeName}</p>
          <p className="text-xs text-secondary mt-0.5">لوحة التحكم</p>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-[var(--color-brand)] text-white' : 'text-secondary hover:bg-surface-2 hover:text-primary'
              }`
            }
          >
            <item.icon size={17} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 space-y-1 border-t border-themed">
        <Link to="/" target="_blank" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-secondary hover:bg-surface-2 hover:text-primary">
          <ExternalLink size={17} />
          عرض المتجر
        </Link>
        <button onClick={logout} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10">
          <LogOut size={17} />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-page flex">
      <aside className="hidden lg:block w-64 shrink-0 bg-surface border-l border-themed">
        {SidebarContent}
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="absolute top-0 bottom-0 right-0 w-72 bg-surface animate-entry">
            <button onClick={() => setSidebarOpen(false)} className="absolute top-4 left-4 text-secondary">
              <X size={20} />
            </button>
            {SidebarContent}
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <header className="lg:hidden sticky top-0 z-30 bg-surface border-b border-themed h-14 flex items-center justify-between px-4">
          <button onClick={() => setSidebarOpen(true)} className="text-primary"><Menu size={20} /></button>
          <span className="font-display font-bold text-primary">لوحة التحكم</span>
          <span className="w-5" />
        </header>
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
