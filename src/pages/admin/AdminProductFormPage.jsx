import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, X, Trash2, Save, ArrowRight } from 'lucide-react';
import { ProductService } from '@/services/ProductService';
import { CategoryService } from '@/services/CategoryService';
import { useToast } from '@/contexts/ToastContext';
import { formatPrice } from '@/utils/format';
import Button from '@/components/common/Button';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import Badge from '@/components/common/Badge';
import RatingStars from '@/components/common/RatingStars';

const emptyProduct = {
  name: '',
  description: '',
  price: '',
  oldPrice: '',
  category: '',
  stock: 0,
  images: [],
  tags: [],
  specifications: [],
  rating: 5,
  reviewsCount: 0,
  featured: false,
  isNew: true,
  bestSeller: false,
  status: 'active',
};

export default function AdminProductFormPage() {
  const { id } = useParams();
  const isEditing = id && id !== 'new';
  const navigate = useNavigate();
  const { showToast } = useToast();
  const categories = CategoryService.getAll();

  const [form, setForm] = useState(emptyProduct);
  const [imageInput, setImageInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [specInput, setSpecInput] = useState({ label: '', value: '' });

  useEffect(() => {
    if (isEditing) {
      const existing = ProductService.getById(id);
      if (existing) setForm(existing);
    }
  }, [id, isEditing]);

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const addImage = () => {
    if (!imageInput.trim()) return;
    set({ images: [...form.images, imageInput.trim()] });
    setImageInput('');
  };
  const removeImage = (idx) => set({ images: form.images.filter((_, i) => i !== idx) });
  const moveImage = (idx, dir) => {
    const next = [...form.images];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    set({ images: next });
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    set({ tags: [...form.tags, tagInput.trim()] });
    setTagInput('');
  };
  const removeTag = (idx) => set({ tags: form.tags.filter((_, i) => i !== idx) });

  const addSpec = () => {
    if (!specInput.label.trim() || !specInput.value.trim()) return;
    set({ specifications: [...form.specifications, specInput] });
    setSpecInput({ label: '', value: '' });
  };
  const removeSpec = (idx) => set({ specifications: form.specifications.filter((_, i) => i !== idx) });

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price) || 0,
      oldPrice: Number(form.oldPrice) || Number(form.price) || 0,
      stock: Number(form.stock) || 0,
      rating: Number(form.rating) || 0,
      reviewsCount: Number(form.reviewsCount) || 0,
    };

    if (isEditing) {
      ProductService.update(id, payload);
      showToast('تم تحديث المنتج بنجاح', 'success');
    } else {
      ProductService.create(payload);
      showToast('تمت إضافة المنتج بنجاح', 'success');
    }
    navigate('/admin/products');
  };

  const previewProduct = {
    ...form,
    price: Number(form.price) || 0,
    oldPrice: Number(form.oldPrice) || Number(form.price) || 0,
    rating: Number(form.rating) || 0,
  };
  const category = categories.find((c) => c.id === form.category);
  const discount = previewProduct.oldPrice > previewProduct.price
    ? Math.round(((previewProduct.oldPrice - previewProduct.price) / previewProduct.oldPrice) * 100)
    : 0;

  return (
    <div>
      <button onClick={() => navigate('/admin/products')} className="flex items-center gap-1.5 text-sm text-secondary hover:text-primary mb-4">
        <ArrowRight size={15} />
        العودة إلى المنتجات
      </button>

      <h1 className="font-display font-extrabold text-2xl text-primary mb-6">
        {isEditing ? 'تعديل المنتج' : 'إضافة منتج جديد'}
      </h1>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        <form onSubmit={submit} className="space-y-6">
          <div className="bg-surface border border-themed rounded-xl p-5 space-y-4">
            <h2 className="font-display font-bold text-primary">المعلومات الأساسية</h2>
            <div>
              <label className="text-sm font-medium text-primary block mb-1.5">اسم المنتج *</label>
              <input required value={form.name} onChange={(e) => set({ name: e.target.value })} className="w-full bg-transparent border border-themed rounded-lg px-3 py-2.5 text-sm text-primary outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-primary block mb-1.5">الوصف</label>
              <textarea rows={3} value={form.description} onChange={(e) => set({ description: e.target.value })} className="w-full bg-transparent border border-themed rounded-lg px-3 py-2.5 text-sm text-primary outline-none resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-primary block mb-1.5">السعر الحالي *</label>
                <input required type="number" min="0" value={form.price} onChange={(e) => set({ price: e.target.value })} className="w-full bg-transparent border border-themed rounded-lg px-3 py-2.5 text-sm text-primary outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-primary block mb-1.5">السعر قبل الخصم</label>
                <input type="number" min="0" value={form.oldPrice} onChange={(e) => set({ oldPrice: e.target.value })} className="w-full bg-transparent border border-themed rounded-lg px-3 py-2.5 text-sm text-primary outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-primary block mb-1.5">التصنيف *</label>
                <select required value={form.category} onChange={(e) => set({ category: e.target.value })} className="w-full bg-transparent border border-themed rounded-lg px-3 py-2.5 text-sm text-primary outline-none">
                  <option value="">اختر تصنيفًا</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-primary block mb-1.5">الكمية بالمخزون</label>
                <input type="number" min="0" value={form.stock} onChange={(e) => set({ stock: e.target.value })} className="w-full bg-transparent border border-themed rounded-lg px-3 py-2.5 text-sm text-primary outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-surface border border-themed rounded-xl p-5 space-y-3">
            <h2 className="font-display font-bold text-primary">الصور</h2>
            <div className="flex gap-2">
              <input
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                placeholder="ألصق رابط صورة (URL)"
                className="flex-1 bg-transparent border border-themed rounded-lg px-3 py-2.5 text-sm text-primary outline-none"
              />
              <Button type="button" variant="outline" onClick={addImage}><Plus size={16} /></Button>
            </div>
            {form.images.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {form.images.map((img, idx) => (
                  <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-themed group">
                    <ImageWithFallback src={img} alt="" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 left-1 w-5 h-5 bg-black/60 rounded-full text-white flex items-center justify-center">
                      <X size={11} />
                    </button>
                    <div className="absolute bottom-1 inset-x-1 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                      <button type="button" onClick={() => moveImage(idx, -1)} className="w-5 h-5 bg-black/60 rounded-full text-white flex items-center justify-center text-[10px]">‹</button>
                      <button type="button" onClick={() => moveImage(idx, 1)} className="w-5 h-5 bg-black/60 rounded-full text-white flex items-center justify-center text-[10px]">›</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-surface border border-themed rounded-xl p-5 space-y-3">
            <h2 className="font-display font-bold text-primary">المواصفات</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <input value={specInput.label} onChange={(e) => setSpecInput((s) => ({ ...s, label: e.target.value }))} placeholder="اسم الخاصية" className="flex-1 bg-transparent border border-themed rounded-lg px-3 py-2.5 text-sm text-primary outline-none" />
              <input value={specInput.value} onChange={(e) => setSpecInput((s) => ({ ...s, value: e.target.value }))} placeholder="القيمة" className="flex-1 bg-transparent border border-themed rounded-lg px-3 py-2.5 text-sm text-primary outline-none" />
              <Button type="button" variant="outline" onClick={addSpec}><Plus size={16} /></Button>
            </div>
            {form.specifications.length > 0 && (
              <ul className="space-y-1.5">
                {form.specifications.map((spec, idx) => (
                  <li key={idx} className="flex items-center justify-between text-sm bg-surface-2 rounded-lg px-3 py-2">
                    <span className="text-primary"><b>{spec.label}:</b> {spec.value}</span>
                    <button type="button" onClick={() => removeSpec(idx)} className="text-secondary hover:text-[var(--color-danger)]"><Trash2 size={14} /></button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-surface border border-themed rounded-xl p-5 space-y-3">
            <h2 className="font-display font-bold text-primary">الوسوم (Tags)</h2>
            <div className="flex gap-2">
              <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="أضف وسمًا واضغط إضافة" className="flex-1 bg-transparent border border-themed rounded-lg px-3 py-2.5 text-sm text-primary outline-none" />
              <Button type="button" variant="outline" onClick={addTag}><Plus size={16} /></Button>
            </div>
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.tags.map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 text-xs bg-surface-2 text-primary rounded-full px-3 py-1.5">
                    #{tag}
                    <button type="button" onClick={() => removeTag(idx)}><X size={11} /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="bg-surface border border-themed rounded-xl p-5 space-y-3">
            <h2 className="font-display font-bold text-primary">الحالة والتصنيفات الخاصة</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'featured', label: 'منتج مميز' },
                { key: 'isNew', label: 'منتج جديد' },
                { key: 'bestSeller', label: 'الأكثر مبيعًا' },
              ].map((flag) => (
                <label key={flag.key} className="flex items-center justify-between text-sm text-primary bg-surface-2 rounded-lg px-3 py-2.5 cursor-pointer">
                  {flag.label}
                  <input type="checkbox" checked={!!form[flag.key]} onChange={(e) => set({ [flag.key]: e.target.checked })} className="accent-[var(--color-brand)] w-4 h-4" />
                </label>
              ))}
              <label className="flex items-center justify-between text-sm text-primary bg-surface-2 rounded-lg px-3 py-2.5 cursor-pointer">
                مفعّل
                <input type="checkbox" checked={form.status === 'active'} onChange={(e) => set({ status: e.target.checked ? 'active' : 'disabled' })} className="accent-[var(--color-brand)] w-4 h-4" />
              </label>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full sm:w-auto">
            <Save size={16} />
            {isEditing ? 'حفظ التعديلات' : 'إضافة المنتج'}
          </Button>
        </form>

        <div className="lg:sticky lg:top-20 h-fit">
          <p className="text-xs font-semibold text-secondary mb-2">معاينة مباشرة</p>
          <div className="rounded-xl border border-themed bg-surface overflow-hidden max-w-[280px]">
            <div className="relative aspect-square bg-surface-2">
              <ImageWithFallback src={form.images?.[0]} alt={form.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 flex flex-col gap-1.5 items-start">
                {form.isNew && <Badge type="new" />}
                {discount > 0 && <Badge type="sale">خصم {discount}%</Badge>}
                {form.bestSeller && <Badge type="bestSeller" />}
              </div>
            </div>
            <div className="p-3.5 space-y-1.5">
              {category && <p className="text-[11px] text-secondary">{category.name}</p>}
              <h3 className="text-sm font-semibold text-primary line-clamp-2">{form.name || 'اسم المنتج'}</h3>
              <RatingStars rating={previewProduct.rating} count={form.reviewsCount} size={12} />
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-primary">{formatPrice(previewProduct.price || 0)}</span>
                {discount > 0 && <span className="text-xs text-secondary line-through">{formatPrice(previewProduct.oldPrice)}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
