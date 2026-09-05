import { useState } from 'react';
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import { useToast } from '@/contexts/ToastContext';
import Button from '@/components/common/Button';

export default function ContactPage() {
  const { settings } = useStore();
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', message: '' });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    const text = encodeURIComponent(`مرحبًا، أنا ${form.name}\n\n${form.message}`);
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${text}`, '_blank');
    showToast('جاري تحويلك إلى واتساب', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10">
      <div>
        <h1 className="font-display font-extrabold text-3xl text-primary mb-4">تواصل معنا</h1>
        <p className="text-secondary leading-relaxed mb-6">
          يسعدنا الرد على استفساراتك. راسلنا مباشرة عبر واتساب أو استخدم النموذج بجانبك.
        </p>
        <div className="space-y-3.5 text-sm">
          {settings.phone && <p className="flex items-center gap-2.5 text-secondary"><Phone size={16} /> {settings.phone}</p>}
          {settings.email && <p className="flex items-center gap-2.5 text-secondary"><Mail size={16} /> {settings.email}</p>}
          {settings.address && <p className="flex items-center gap-2.5 text-secondary"><MapPin size={16} /> {settings.address}</p>}
        </div>
      </div>

      <form onSubmit={submit} className="bg-surface border border-themed rounded-2xl p-6 space-y-4 h-fit">
        <div>
          <label className="text-sm font-medium text-primary block mb-1.5">الاسم</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full bg-transparent border border-themed rounded-lg px-3 py-2.5 text-sm text-primary outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-primary block mb-1.5">رسالتك</label>
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            className="w-full bg-transparent border border-themed rounded-lg px-3 py-2.5 text-sm text-primary outline-none resize-none"
          />
        </div>
        <Button type="submit" className="w-full">
          <MessageCircle size={16} />
          إرسال عبر واتساب
        </Button>
      </form>
    </div>
  );
}
