import { ArrowUpDown } from 'lucide-react';

const OPTIONS = [
  { value: 'newest', label: 'الأحدث' },
  { value: 'price-asc', label: 'السعر: من الأقل للأعلى' },
  { value: 'price-desc', label: 'السعر: من الأعلى للأقل' },
  { value: 'rating', label: 'الأعلى تقييمًا' },
  { value: 'best-selling', label: 'الأكثر مبيعًا' },
];

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="relative">
      <ArrowUpDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-surface border border-themed rounded-full pl-4 pr-9 py-2.5 text-sm text-primary outline-none cursor-pointer"
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
