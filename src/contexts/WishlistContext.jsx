import { createContext, useContext, useEffect, useState } from 'react';
import { WishlistService } from '@/services/WishlistService';
import { AnalyticsService } from '@/services/AnalyticsService';
import { useToast } from '@/contexts/ToastContext';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => WishlistService.getIds());
  const { showToast } = useToast();

  useEffect(() => {
    WishlistService.getIds();
  }, []);

  const toggle = (product) => {
    const next = WishlistService.toggle(product.id);
    setIds(next);
    if (next.includes(product.id)) {
      AnalyticsService.trackWishlistAdd(product.id);
      showToast('تمت الإضافة إلى المفضلة', 'success');
    } else {
      showToast('تمت الإزالة من المفضلة', 'info');
    }
  };

  const remove = (productId) => {
    setIds(WishlistService.remove(productId));
    showToast('تمت الإزالة من المفضلة', 'info');
  };

  const has = (productId) => ids.includes(productId);

  return (
    <WishlistContext.Provider value={{ ids, toggle, remove, has, count: ids.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
