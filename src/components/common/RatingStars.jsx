import { Star } from 'lucide-react';

export default function RatingStars({ rating = 0, size = 14, showValue = true, count }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={size}
            className={n <= Math.round(rating) ? 'fill-[var(--color-brass)] text-[var(--color-brass)]' : 'text-[var(--border-color)]'}
          />
        ))}
      </div>
      {showValue && <span className="text-xs text-secondary">{rating.toFixed(1)}</span>}
      {typeof count === 'number' && <span className="text-xs text-secondary">({count})</span>}
    </div>
  );
}
