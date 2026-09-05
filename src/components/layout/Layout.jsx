import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';
import MobileMenu from './MobileMenu';
import ScrollToTop from '@/components/common/ScrollToTop';

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-page">
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar onMenuClick={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav onOpenMenu={() => setMenuOpen(true)} />
    </div>
  );
}
