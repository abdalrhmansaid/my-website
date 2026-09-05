import { storage, KEYS } from '@/utils/storage';

const bannersSeed = [
  {
    id: 'banner-1',
    enabled: true,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80',
    text: 'مجموعة الخريف وصلت — تصاميم هادئة بألوان دافئة',
    buttonText: 'اكتشف المجموعة',
    link: '/products',
  },
];

function ensureSeeded() {
  storage.seed(KEYS.BANNERS, bannersSeed);
}

function readAll() {
  ensureSeeded();
  return storage.get(KEYS.BANNERS, []);
}

function writeAll(banners) {
  storage.set(KEYS.BANNERS, banners);
}

export const BannerService = {
  getAll() {
    return readAll();
  },
  getEnabled() {
    return readAll().filter((b) => b.enabled);
  },
  create(banner) {
    const banners = readAll();
    const newBanner = { id: `banner-${Date.now()}`, enabled: true, ...banner };
    banners.push(newBanner);
    writeAll(banners);
    return newBanner;
  },
  update(id, patch) {
    const banners = readAll();
    const idx = banners.findIndex((b) => b.id === id);
    if (idx === -1) return null;
    banners[idx] = { ...banners[idx], ...patch, id };
    writeAll(banners);
    return banners[idx];
  },
  remove(id) {
    writeAll(readAll().filter((b) => b.id !== id));
  },
  toggleEnabled(id) {
    const banner = readAll().find((b) => b.id === id);
    if (!banner) return null;
    return this.update(id, { enabled: !banner.enabled });
  },
};
