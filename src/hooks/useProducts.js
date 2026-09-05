import { useMemo, useState, useEffect } from 'react';
import { ProductService } from '@/services/ProductService';

const DEFAULT_FILTERS = {
  category: '',
  minPrice: null,
  maxPrice: null,
  onlyDiscounted: false,
  onlyInStock: false,
  minRating: 0,
  sort: 'newest',
};

export function useProducts(initialFilters = {}) {
  const [allProducts, setAllProducts] = useState([]);
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS, ...initialFilters });

  useEffect(() => {
    setAllProducts(ProductService.getActive());
  }, []);

  const products = useMemo(
    () => ProductService.filterAndSort(allProducts, filters),
    [allProducts, filters]
  );

  const updateFilter = (key, value) => setFilters((f) => ({ ...f, [key]: value }));
  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  return { products, allProducts, filters, updateFilter, setFilters, resetFilters };
}
