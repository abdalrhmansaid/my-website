// Every product read/write in the app goes through this service.
// Today it's backed by localStorage; swapping to Firebase/Supabase/REST
// later means editing only the bodies of these functions.

import { storage, KEYS } from '@/utils/storage';
import { productsSeed } from '@/data/products.seed';

function ensureSeeded() {
  storage.seed(KEYS.PRODUCTS, productsSeed);
}

function readAll() {
  ensureSeeded();
  return storage.get(KEYS.PRODUCTS, []);
}

function writeAll(products) {
  storage.set(KEYS.PRODUCTS, products);
}

export const ProductService = {
  getAll() {
    return readAll();
  },

  getActive() {
    return readAll().filter((p) => p.status === 'active');
  },

  getById(id) {
    return readAll().find((p) => p.id === id) || null;
  },

  getByCategory(categoryId) {
    return this.getActive().filter((p) => p.category === categoryId);
  },

  getFeatured() {
    return this.getActive().filter((p) => p.featured);
  },

  getBestSellers() {
    return this.getActive().filter((p) => p.bestSeller);
  },

  getNewArrivals() {
    return this.getActive().filter((p) => p.isNew);
  },

  getByIds(ids) {
    const all = readAll();
    return ids.map((id) => all.find((p) => p.id === id)).filter(Boolean);
  },

  search(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return this.getActive().filter((p) => {
      const haystack = [p.name, p.description, p.category, ...(p.tags || [])]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  },

  create(product) {
    const products = readAll();
    const id = product.id || `p-${Date.now()}`;
    const newProduct = {
      status: 'active',
      images: [],
      tags: [],
      specifications: [],
      rating: 0,
      reviewsCount: 0,
      featured: false,
      isNew: true,
      bestSeller: false,
      oldPrice: product.price,
      ...product,
      id,
    };
    products.unshift(newProduct);
    writeAll(products);
    return newProduct;
  },

  update(id, patch) {
    const products = readAll();
    const idx = products.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    products[idx] = { ...products[idx], ...patch, id };
    writeAll(products);
    return products[idx];
  },

  remove(id) {
    const products = readAll().filter((p) => p.id !== id);
    writeAll(products);
  },

  duplicate(id) {
    const source = this.getById(id);
    if (!source) return null;
    const copy = {
      ...source,
      id: `p-${Date.now()}`,
      name: `${source.name} (نسخة)`,
    };
    const products = readAll();
    products.unshift(copy);
    writeAll(products);
    return copy;
  },

  toggleStatus(id) {
    const product = this.getById(id);
    if (!product) return null;
    return this.update(id, { status: product.status === 'active' ? 'disabled' : 'active' });
  },

  filterAndSort(products, { category, minPrice, maxPrice, onlyDiscounted, onlyInStock, minRating, sort } = {}) {
    let result = [...products];

    if (category) result = result.filter((p) => p.category === category);
    if (minPrice != null) result = result.filter((p) => p.price >= minPrice);
    if (maxPrice != null) result = result.filter((p) => p.price <= maxPrice);
    if (onlyDiscounted) result = result.filter((p) => p.oldPrice > p.price);
    if (onlyInStock) result = result.filter((p) => p.stock > 0);
    if (minRating) result = result.filter((p) => p.rating >= minRating);

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'best-selling':
        result.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0) || b.reviewsCount - a.reviewsCount);
        break;
      case 'newest':
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  },

  discountPercent(product) {
    if (!product.oldPrice || product.oldPrice <= product.price) return 0;
    return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  },
};
