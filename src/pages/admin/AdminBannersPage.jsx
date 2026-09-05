import { useState } from 'react';
import { Plus, Trash2, Eye, EyeOff, X } from 'lucide-react';
import { BannerService } from '@/services/BannerService';
import { useToast } from '@/contexts/ToastContext';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import Button from '@/components/common/Button';

const emptyForm = { image: '', text: '', buttonText: '', link: '/products' };

export default function AdminBannersPage() {
  const [banners, setBanners] = useState(() => BannerService.getAll());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const { showToast } = useToast();

  const refresh = () => setBanners(BannerService.getAll());

  const submit = (e) => {
    e.preventDefault();
    if (!form.image.trim() || !form.text.trim()) return;
    BannerService.create(form);
    setForm(emptyForm);
    setShowForm(false);
    refresh();
    showToast('تمت إضافة البانر بنجاح', 'success');
  };

  const handleDelete = (banner) => {
    if (!window.confirm('هل تريد حذف هذا البانر؟')) return;
    BannerService.remove(banner.id);
    refresh();
    showToast('تم حذف البانر', 'success');
  };

  const handleToggle = (banner) => {
    BannerService.toggleEnabled(banner.id);
    refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-primary mb-1">البانرات الترويجية</h1>
          <p className="text-sm text-secondary">{banners.length} بانر</p>
        </div>
        <Button onClick={() => setShowForm((s) => !s)}>
          <Plus size={16} />
          إضافة بانر
        </Button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="bg-surface border border-themed rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-primary">بانر جديد</h2>
            <button type="button" onClick={() => setShowForm(false)} className="text-secondary"><X size={18} /></button>
          </div>
          <input required value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} placeholder="رابط صورة البانر" className="w-full bg-transparent border border-themed rounded-lg px-3 py-2.5 text-sm text-primary outline-none" />
          <input required value={form.text} onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))} placeholder="نص البانر" className="w-full bg-transparent border border-themed rounded-lg px-3 py-2.5 text-sm text-primary outline-none" />
          <div className="grid grid-cols-2 gap-3">
            <input value={form.buttonText} onChange={(e) => setForm((f) => ({ ...f, buttonText: e.target.value }))} placeholder="نص الزر" className="w-full bg-transparent border border-themed rounded-lg px-3 py-2.5 text-sm text-primary outline-none" />
            <input value={form.link} onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))} placeholder="رابط الزر" className="w-full bg-transparent border border-themed rounded-lg px-3 py-2.5 text-sm text-primary outline-none" />
          </div>
          <Button type="submit">حفظ البانر</Button>
        </form>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-surface border border-themed rounded-xl overflow-hidden">
            <div className="aspect-[16/7] bg-surface-2">
              <ImageWithFallback src={banner.image} alt={banner.text} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-primary text-sm">{banner.text}</p>
                <button
                  onClick={() => handleToggle(banner)}
                  className={`shrink-0 inline-flex items-center gap-1 text-xs font-semibold rounded-full px-2.5 py-1 ${
                    banner.enabled ? 'bg-[var(--color-brand)]/10 text-[var(--color-brand)]' : 'bg-surface-2 text-secondary'
                  }`}
                >
                  {banner.enabled ? <Eye size={12} /> : <EyeOff size={12} />}
                  {banner.enabled ? 'مفعّل' : 'معطّل'}
                </button>
              </div>
              <button onClick={() => handleDelete(banner)} className="text-xs font-medium text-[var(--color-danger)] inline-flex items-center gap-1 hover:underline">
                <Trash2 size={13} /> حذف البانر
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
