import { storage, KEYS } from '@/utils/storage';
import { categoriesSeed } from '@/data/categories.seed';
import { ProductService } from '@/services/ProductService';

function ensureSeeded() {
  storage.seed(KEYS.CATEGORIES, categoriesSeed);
}

function readAll() {
  ensureSeeded();
  return storage.get(KEYS.CATEGORIES, []);
}

function writeAll(categories) {
  storage.set(KEYS.CATEGORIES, categories);
}

export const CategoryService = {
  getAll() {
    return readAll();
  },

  getEnabled() {
    return readAll().filter((c) => c.enabled);
  },

  getById(id) {
    return readAll().find((c) => c.id === id) || null;
  },

  withProductCounts() {
    const products = ProductService.getActive();
    return this.getEnabled().map((c) => ({
      ...c,
      productCount: products.filter((p) => p.category === c.id).length,
    }));
  },

  create(category) {
    const categories = readAll();
    const id = category.id || `cat-${Date.now()}`;
    const newCategory = { enabled: true, image: '', description: '', ...category, id };
    categories.push(newCategory);
    writeAll(categories);
    return newCategory;
  },

  update(id, patch) {
    const categories = readAll();
    const idx = categories.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    categories[idx] = { ...categories[idx], ...patch, id };
    writeAll(categories);
    return categories[idx];
  },

  remove(id) {
    writeAll(readAll().filter((c) => c.id !== id));
  },

  toggleEnabled(id) {
    const category = this.getById(id);
    if (!category) return null;
    return this.update(id, { enabled: !category.enabled });
  },
};
