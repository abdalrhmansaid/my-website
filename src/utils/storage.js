// Thin wrapper around localStorage so the rest of the app never touches
// window.localStorage directly. Swapping to IndexedDB/Firebase/Supabase
// later only means rewriting this one file.

const isBrowser = typeof window !== 'undefined';

export const storage = {
  get(key, fallback = null) {
    if (!isBrowser) return fallback;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch (err) {
      console.error(`storage.get failed for "${key}"`, err);
      return fallback;
    }
  },

  set(key, value) {
    if (!isBrowser) return false;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error(`storage.set failed for "${key}"`, err);
      return false;
    }
  },

  remove(key) {
    if (!isBrowser) return;
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      console.error(`storage.remove failed for "${key}"`, err);
    }
  },

  // Only seeds a key with `value` if nothing is stored there yet.
  seed(key, value) {
    if (!isBrowser) return;
    if (window.localStorage.getItem(key) === null) {
      this.set(key, value);
    }
  },
};

export const KEYS = {
  PRODUCTS: 'velora_products',
  CATEGORIES: 'velora_categories',
  SETTINGS: 'velora_settings',
  BANNERS: 'velora_banners',
  WISHLIST: 'velora_wishlist',
  RECENTLY_VIEWED: 'velora_recently_viewed',
  ANALYTICS: 'velora_analytics',
  AUTH: 'velora_auth_session',
  ADMIN_CREDENTIALS: 'velora_admin_credentials',
  THEME: 'velora_theme',
  REVIEWS: 'velora_reviews',
};
