import { Truck, ShieldCheck, Sparkles, MessageCircleMore } from 'lucide-react';

const FEATURES = [
  { icon: Truck, title: 'توصيل سريع', description: 'يصلك طلبك خلال أيام قليلة أينما كنت' },
  { icon: ShieldCheck, title: 'تسوق آمن', description: 'منتجات أصلية مع ضمان الجودة' },
  { icon: Sparkles, title: 'جودة مميزة', description: 'كل قطعة نختارها تمر بمعايير دقيقة' },
  { icon: MessageCircleMore, title: 'دعم عبر واتساب', description: 'فريقنا يرد على استفساراتك مباشرة' },
];

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {FEATURES.map((f) => (
          <div key={f.title} className="flex flex-col items-center text-center gap-2.5 p-5 rounded-xl bg-surface border border-themed hover:-translate-y-0.5 transition-transform">
            <div className="w-11 h-11 rounded-full bg-surface-2 flex items-center justify-center text-[var(--color-brand)]">
              <f.icon size={20} />
            </div>
            <h3 className="font-semibold text-sm text-primary">{f.title}</h3>
            <p className="text-xs text-secondary leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
