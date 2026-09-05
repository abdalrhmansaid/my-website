import { useState } from 'react';
import { Plus, Trash2, Eye, EyeOff, X } from 'lucide-react';
import { CategoryService } from '@/services/CategoryService';
import { useToast } from '@/contexts/ToastContext';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import Button from '@/components/common/Button';

const emptyForm = { name: '', description: '', image: '' };

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(() => CategoryService.getAll());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const { showToast } = useToast();

  const refresh = () => setCategories(CategoryService.getAll());

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    CategoryService.create(form);
    setForm(emptyForm);
    setShowForm(false);
    refresh();
    showToast('تمت إضافة التصنيف بنجاح', 'success');
  };

  const handleDelete = (category) => {
    if (!window.confirm(`هل تريد حذف تصنيف "${category.name}"؟`)) return;
    CategoryService.remove(category.id);
    refresh();
    showToast('تم حذف التصنيف', 'success');
  };

  const handleToggle = (category) => {
    CategoryService.toggleEnabled(category.id);
    refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-primary mb-1">إدارة التصنيفات</h1>
          <p className="text-sm text-secondary">{categories.length} تصنيف</p>
        </div>
        <Button onClick={() => setShowForm((s) => !s)}>
          <Plus size={16} />
          إضافة تصنيف
        </Button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="bg-surface border border-themed rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-primary">تصنيف جديد</h2>
            <button type="button" onClick={() => setShowForm(false)} className="text-secondary"><X size={18} /></button>
          </div>
          <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="اسم التصنيف" className="w-full bg-transparent border border-themed rounded-lg px-3 py-2.5 text-sm text-primary outline-none" />
          <input value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="وصف مختصر" className="w-full bg-transparent border border-themed rounded-lg px-3 py-2.5 text-sm text-primary outline-none" />
          <input value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} placeholder="رابط صورة التصنيف" className="w-full bg-transparent border border-themed rounded-lg px-3 py-2.5 text-sm text-primary outline-none" />
          <Button type="submit">حفظ التصنيف</Button>
        </form>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-surface border border-themed rounded-xl overflow-hidden">
            <div className="aspect-video bg-surface-2">
              <ImageWithFallback src={category.image} alt={category.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-primary">{category.name}</h3>
                <button
                  onClick={() => handleToggle(category)}
                  className={`inline-flex items-center gap-1 text-xs font-semibold rounded-full px-2.5 py-1 ${
                    category.enabled ? 'bg-[var(--color-brand)]/10 text-[var(--color-brand)]' : 'bg-surface-2 text-secondary'
                  }`}
                >
                  {category.enabled ? <Eye size={12} /> : <EyeOff size={12} />}
                  {category.enabled ? 'مفعّل' : 'معطّل'}
                </button>
              </div>
              <p className="text-xs text-secondary mb-3">{category.description}</p>
              <button onClick={() => handleDelete(category)} className="text-xs font-medium text-[var(--color-danger)] inline-flex items-center gap-1 hover:underline">
                <Trash2 size={13} /> حذف التصنيف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
