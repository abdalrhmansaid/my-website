import { useState } from 'react';
import ImageWithFallback from '@/components/common/ImageWithFallback';

export default function ProductGallery({ images = [], name }) {
  const [active, setActive] = useState(0);
  const safeImages = images.length ? images : [null];

  return (
    <div>
      <div className="aspect-square rounded-2xl overflow-hidden bg-surface-2 mb-3">
        <ImageWithFallback
          src={safeImages[active]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      {safeImages.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
          {safeImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                active === i ? 'border-[var(--color-brand)]' : 'border-transparent'
              }`}
            >
              <ImageWithFallback src={img} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
