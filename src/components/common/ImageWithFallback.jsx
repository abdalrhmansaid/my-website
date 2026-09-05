import { useState } from 'react';
import { ImageOff } from 'lucide-react';

export default function ImageWithFallback({ src, alt, className = '', ...props }) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div className={`flex items-center justify-center bg-surface-2 text-secondary ${className}`}>
        <ImageOff size={28} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setErrored(true)}
      className={className}
      {...props}
    />
  );
}
