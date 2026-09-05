const STYLES = {
  new: 'bg-[var(--color-brand)] text-white',
  sale: 'bg-[var(--color-danger)] text-white',
  bestSeller: 'bg-[var(--color-brass)] text-[#221704]',
  limited: 'bg-ink text-white dark:bg-white dark:text-ink',
  featured: 'bg-surface-2 text-primary border border-themed',
};

const LABELS = {
  new: 'جديد',
  sale: 'خصم',
  bestSeller: 'الأكثر مبيعًا',
  limited: 'كمية محدودة',
  featured: 'مميز',
};

export default function Badge({ type, children }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${STYLES[type] || STYLES.featured}`}>
      {children || LABELS[type]}
    </span>
  );
}
