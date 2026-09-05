import { useStore } from '@/contexts/StoreContext';

const PRICE_RANGES = [
  { label: 'كل الأسعار', min: null, max: null },
  { label: 'أقل من 300 ج.م', min: null, max: 300 },
  { label: '300 – 800 ج.م', min: 300, max: 800 },
  { label: '800 – 1500 ج.م', min: 800, max: 1500 },
  { label: 'أكثر من 1500 ج.م', min: 1500, max: null },
];

export default function FilterPanel({ filters, updateFilter, resetFilters }) {
  const { categories } = useStore();

  const activeRangeIndex = PRICE_RANGES.findIndex(
    (r) => r.min === filters.minPrice && r.max === filters.maxPrice
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-primary">الفلاتر</h3>
        <button onClick={resetFilters} className="text-xs font-semibold text-[var(--color-brand)] hover:underline">
          إعادة التعيين
        </button>
      </div>

      <div>
        <p className="text-sm font-semibold text-primary mb-2.5">التصنيف</p>
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={!filters.category}
              onChange={() => updateFilter('category', '')}
              className="accent-[var(--color-brand)]"
            />
            كل التصنيفات
          </label>
          {categories.filter((c) => c.enabled).map((c) => (
            <label key={c.id} className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={filters.category === c.id}
                onChange={() => updateFilter('category', c.id)}
                className="accent-[var(--color-brand)]"
              />
              {c.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-primary mb-2.5">السعر</p>
        <div className="flex flex-col gap-1.5">
          {PRICE_RANGES.map((range, i) => (
            <label key={range.label} className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={activeRangeIndex === i || (activeRangeIndex === -1 && i === 0)}
                onChange={() => {
                  updateFilter('minPrice', range.min);
                  updateFilter('maxPrice', range.max);
                }}
                className="accent-[var(--color-brand)]"
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-primary mb-2.5">التقييم</p>
        <div className="flex flex-col gap-1.5">
          {[0, 4, 4.5].map((min) => (
            <label key={min} className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === min}
                onChange={() => updateFilter('minRating', min)}
                className="accent-[var(--color-brand)]"
              />
              {min === 0 ? 'كل التقييمات' : `${min} نجوم فأكثر`}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2.5 pt-1">
        <label className="flex items-center justify-between text-sm text-secondary cursor-pointer">
          متوفر فقط
          <input
            type="checkbox"
            checked={filters.onlyInStock}
            onChange={(e) => updateFilter('onlyInStock', e.target.checked)}
            className="accent-[var(--color-brand)] w-4 h-4"
          />
        </label>
        <label className="flex items-center justify-between text-sm text-secondary cursor-pointer">
          عليه خصم
          <input
            type="checkbox"
            checked={filters.onlyDiscounted}
            onChange={(e) => updateFilter('onlyDiscounted', e.target.checked)}
            className="accent-[var(--color-brand)] w-4 h-4"
          />
        </label>
      </div>
    </div>
  );
}
