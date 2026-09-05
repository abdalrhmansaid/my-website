import { storage, KEYS } from '@/utils/storage';

function readIds() {
  return storage.get(KEYS.WISHLIST, []);
}

export const WishlistService = {
  getIds() {
    return readIds();
  },

  has(productId) {
    return readIds().includes(productId);
  },

  toggle(productId) {
    const ids = readIds();
    const next = ids.includes(productId)
      ? ids.filter((id) => id !== productId)
      : [...ids, productId];
    storage.set(KEYS.WISHLIST, next);
    return next;
  },

  remove(productId) {
    const next = readIds().filter((id) => id !== productId);
    storage.set(KEYS.WISHLIST, next);
    return next;
  },

  clear() {
    storage.set(KEYS.WISHLIST, []);
    return [];
  },

  count() {
    return readIds().length;
  },
};
