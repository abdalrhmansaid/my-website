import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Section({ title, subtitle, viewAllLink, children }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10 md:py-14">
      <div className="flex items-end justify-between mb-6 md:mb-8">
        <div>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-primary">{title}</h2>
          {subtitle && <p className="text-sm text-secondary mt-1">{subtitle}</p>}
        </div>
        {viewAllLink && (
          <Link to={viewAllLink} className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand)] hover:gap-2.5 transition-all">
            عرض الكل
            <ArrowLeft size={15} />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
