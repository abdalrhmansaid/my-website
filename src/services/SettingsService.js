import { storage, KEYS } from '@/utils/storage';
import { settingsSeed } from '@/data/settings.seed';

function ensureSeeded() {
  storage.seed(KEYS.SETTINGS, settingsSeed);
}

export const SettingsService = {
  get() {
    ensureSeeded();
    return storage.get(KEYS.SETTINGS, settingsSeed);
  },

  update(patch) {
    const current = this.get();
    const next = { ...current, ...patch };
    storage.set(KEYS.SETTINGS, next);
    return next;
  },

  updateNested(section, patch) {
    const current = this.get();
    const next = { ...current, [section]: { ...current[section], ...patch } };
    storage.set(KEYS.SETTINGS, next);
    return next;
  },

  reset() {
    storage.set(KEYS.SETTINGS, settingsSeed);
    return settingsSeed;
  },

  buildWhatsAppLink(product, { origin } = {}) {
    const settings = this.get();
    const url = origin ? `${origin}/products/${product.id}` : '';
    const lines = [
      'مرحبًا 👋',
      'أريد الاستفسار عن المنتج:',
      '',
      `اسم المنتج: ${product.name}`,
      `رقم المنتج: ${product.id}`,
      `السعر: ${product.price} ج.م`,
      url ? `رابط المنتج: ${url}` : null,
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${settings.whatsappNumber}?text=${text}`;
  },

  getFacebookUrl() {
    return this.get().facebookUrl;
  },
};
