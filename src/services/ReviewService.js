import { storage, KEYS } from '@/utils/storage';

const reviewsSeed = {
  'p-001': [
    { id: 'r1', author: 'ياسمين', rating: 5, comment: 'جودة الصوت مذهلة وعزل الضوضاء ممتاز فعلاً.' },
    { id: 'r2', author: 'كريم', rating: 4, comment: 'مريحة للاستخدام الطويل، البطارية تدوم يوم كامل.' },
  ],
  'p-003': [
    { id: 'r3', author: 'سارة', rating: 5, comment: 'تصميم أنيق ودقة تتبع عالية، تستحق السعر.' },
  ],
  'p-007': [
    { id: 'r4', author: 'أحمد', rating: 5, comment: 'مقصورة اللابتوب ممتازة والخامة تبان قوية.' },
  ],
};

function ensureSeeded() {
  storage.seed(KEYS.REVIEWS, reviewsSeed);
}

function readAll() {
  ensureSeeded();
  return storage.get(KEYS.REVIEWS, {});
}

export const ReviewService = {
  getForProduct(productId) {
    return readAll()[productId] || [];
  },
  add(productId, review) {
    const all = readAll();
    const list = all[productId] || [];
    const newReview = { id: `r-${Date.now()}`, ...review };
    const next = { ...all, [productId]: [newReview, ...list] };
    storage.set(KEYS.REVIEWS, next);
    return newReview;
  },
};
