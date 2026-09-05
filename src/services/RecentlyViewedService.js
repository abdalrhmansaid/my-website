import { storage, KEYS } from '@/utils/storage';

const MAX_ITEMS = 10;

export const RecentlyViewedService = {
  getIds() {
    return storage.get(KEYS.RECENTLY_VIEWED, []);
  },

  record(productId) {
    const ids = this.getIds().filter((id) => id !== productId);
    ids.unshift(productId);
    const trimmed = ids.slice(0, MAX_ITEMS);
    storage.set(KEYS.RECENTLY_VIEWED, trimmed);
    return trimmed;
  },

  clear() {
    storage.set(KEYS.RECENTLY_VIEWED, []);
  },
};
