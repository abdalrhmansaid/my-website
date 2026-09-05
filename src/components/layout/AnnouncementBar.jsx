import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';

export default function AnnouncementBar() {
  const { settings } = useStore();
  const [dismissed, setDismissed] = useState(false);
  const bar = settings.announcementBar;

  if (!bar?.enabled || dismissed) return null;

  const content = (
    <span className="text-sm font-medium truncate">{bar.text}</span>
  );

  return (
    <div className="bg-[var(--color-brand)] text-white">
      <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-center gap-3 relative">
        {bar.link ? (
          <Link to={bar.link} className="hover:opacity-90 truncate">{content}</Link>
        ) : content}
        <button
          onClick={() => setDismissed(true)}
          aria-label="إغلاق الشريط"
          className="absolute left-3 text-white/80 hover:text-white"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
