// Local, privacy-friendly analytics. Every event is a simple counter plus a
// per-product breakdown, all stored under one localStorage key so the
// Admin Overview can read it in a single call.

import { storage, KEYS } from '@/utils/storage';

const EMPTY_STATE = {
  productViews: {},
  productClicks: {},
  buyClicks: {},
  whatsappClicks: {},
  facebookClicks: {},
  wishlistAdds: {},
  shares: {},
  totals: {
    productViews: 0,
    buyClicks: 0,
    whatsappClicks: 0,
    facebookClicks: 0,
  },
};

function read() {
  return storage.get(KEYS.ANALYTICS, EMPTY_STATE);
}

function write(state) {
  storage.set(KEYS.ANALYTICS, state);
}

function bump(bucketKey, totalKey, productId) {
  const state = read();
  const bucket = { ...state[bucketKey] };
  bucket[productId] = (bucket[productId] || 0) + 1;
  const totals = { ...state.totals };
  if (totalKey) totals[totalKey] = (totals[totalKey] || 0) + 1;
  write({ ...state, [bucketKey]: bucket, totals });
}

export const AnalyticsService = {
  trackProductView(productId) {
    bump('productViews', 'productViews', productId);
  },
  trackProductClick(productId) {
    bump('productClicks', null, productId);
  },
  trackBuyClick(productId) {
    bump('buyClicks', 'buyClicks', productId);
  },
  trackWhatsAppClick(productId) {
    bump('whatsappClicks', 'whatsappClicks', productId);
  },
  trackFacebookClick(productId) {
    bump('facebookClicks', 'facebookClicks', productId);
  },
  trackWishlistAdd(productId) {
    bump('wishlistAdds', null, productId);
  },
  trackShare(productId) {
    bump('shares', null, productId);
  },

  getState() {
    return read();
  },

  topProducts(bucketKey, products, limit = 5) {
    const state = read();
    const bucket = state[bucketKey] || {};
    return Object.entries(bucket)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([id, count]) => ({
        product: products.find((p) => p.id === id),
        count,
      }))
      .filter((row) => row.product);
  },

  reset() {
    write(EMPTY_STATE);
  },
};
