import { useState } from 'react';
import { Save, Lock } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import { useToast } from '@/contexts/ToastContext';
import { AuthService } from '@/services/AuthService';
import Button from '@/components/common/Button';

const TABS = [
  { key: 'store', label: 'بيانات المتجر' },
  { key: 'contact', label: 'التواصل والسوشيال' },
  { key: 'home', label: 'الصفحة الرئيسية' },
  { key: 'security', label: 'الأمان' },
];

function Field({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium text-primary block mb-1.5">{label}</label>
      <input {...props} className="w-full bg-transparent border border-themed rounded-lg px-3 py-2.5 text-sm text-primary outline-none" />
    </div>
  );
}

export default function AdminSettingsPage() {
  const { settings, updateSettings, updateSettingsSection } = useStore();
  const { showToast } = useToast();
  const [tab, setTab] = useState('store');
  const [local, setLocal] = useState(settings);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newUsername: '', newPassword: '' });
  const [securityError, setSecurityError] = useState('');

  const set = (patch) => setLocal((l) => ({ ...l, ...patch }));
  const setNested = (section, patch) => setLocal((l) => ({ ...l, [section]: { ...l[section], ...patch } }));

  const saveAll = (e) => {
    e.preventDefault();
    updateSettings(local);
    showToast('تم حفظ الإعدادات بنجاح', 'success');
  };

  const changeCredentials = (e) => {
    e.preventDefault();
    setSecurityError('');
    const result = AuthService.changeCredentials(passwordForm);
    if (!result.success) {
      setSecurityError(result.error);
      return;
    }
    setPasswordForm({ currentPassword: '', newUsername: '', newPassword: '' });
    showToast('تم تحديث بيانات الدخول بنجاح', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-primary mb-1">إعدادات المتجر</h1>
        <p className="text-sm text-secondary">تحكم في كل تفاصيل المتجر من مكان واحد</p>
      </div>

      <div className="flex gap-1 overflow-x-auto border-b border-themed">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors ${
              tab === t.key ? 'border-[var(--color-brand)] text-[var(--color-brand)]' : 'border-transparent text-secondary hover:text-primary'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab !== 'security' && (
        <form onSubmit={saveAll} className="space-y-6 max-w-2xl">
          {tab === 'store' && (
            <div className="bg-surface border border-themed rounded-xl p-5 space-y-4">
              <Field label="اسم المتجر" value={local.storeName} onChange={(e) => set({ storeName: e.target.value })} />
              <Field label="نص الشعار (حرف واحد يظهر في الأيقونة)" value={local.logoText} onChange={(e) => set({ logoText: e.target.value })} />
              <div>
                <label className="text-sm font-medium text-primary block mb-1.5">وصف المتجر</label>
                <textarea rows={3} value={local.description} onChange={(e) => set({ description: e.target.value })} className="w-full bg-transparent border border-themed rounded-lg px-3 py-2.5 text-sm text-primary outline-none resize-none" />
              </div>
            </div>
          )}

          {tab === 'contact' && (
            <div className="bg-surface border border-themed rounded-xl p-5 space-y-4">
              <Field label="رقم واتساب (بدون + وبمفتاح الدولة، مثال: 201000000000)" value={local.whatsappNumber} onChange={(e) => set({ whatsappNumber: e.target.value })} />
              <Field label="رابط صفحة فيسبوك" value={local.facebookUrl} onChange={(e) => set({ facebookUrl: e.target.value })} />
              <Field label="رابط إنستغرام" value={local.instagramUrl} onChange={(e) => set({ instagramUrl: e.target.value })} />
              <Field label="رابط تيك توك" value={local.tiktokUrl} onChange={(e) => set({ tiktokUrl: e.target.value })} />
              <Field label="رابط تيليجرام" value={local.telegramUrl} onChange={(e) => set({ telegramUrl: e.target.value })} />
              <Field label="رابط يوتيوب" value={local.youtubeUrl} onChange={(e) => set({ youtubeUrl: e.target.value })} />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="البريد الإلكتروني" value={local.email} onChange={(e) => set({ email: e.target.value })} />
                <Field label="رقم الهاتف" value={local.phone} onChange={(e) => set({ phone: e.target.value })} />
              </div>
              <Field label="العنوان" value={local.address} onChange={(e) => set({ address: e.target.value })} />
            </div>
          )}

          {tab === 'home' && (
            <>
              <div className="bg-surface border border-themed rounded-xl p-5 space-y-4">
                <h2 className="font-display font-bold text-primary">شريط الإعلانات</h2>
                <label className="flex items-center justify-between text-sm text-primary cursor-pointer">
                  تفعيل الشريط
                  <input type="checkbox" checked={local.announcementBar.enabled} onChange={(e) => setNested('announcementBar', { enabled: e.target.checked })} className="accent-[var(--color-brand)] w-4 h-4" />
                </label>
                <Field label="نص الشريط" value={local.announcementBar.text} onChange={(e) => setNested('announcementBar', { text: e.target.value })} />
                <Field label="رابط الشريط" value={local.announcementBar.link} onChange={(e) => setNested('announcementBar', { link: e.target.value })} />
              </div>

              <div className="bg-surface border border-themed rounded-xl p-5 space-y-4">
                <h2 className="font-display font-bold text-primary">قسم البطل (Hero)</h2>
                <Field label="العنوان الرئيسي" value={local.hero.title} onChange={(e) => setNested('hero', { title: e.target.value })} />
                <div>
                  <label className="text-sm font-medium text-primary block mb-1.5">الوصف</label>
                  <textarea rows={3} value={local.hero.description} onChange={(e) => setNested('hero', { description: e.target.value })} className="w-full bg-transparent border border-themed rounded-lg px-3 py-2.5 text-sm text-primary outline-none resize-none" />
                </div>
                <Field label="رابط صورة الخلفية" value={local.hero.image} onChange={(e) => setNested('hero', { image: e.target.value })} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="نص الزر الأساسي" value={local.hero.primaryButtonText} onChange={(e) => setNested('hero', { primaryButtonText: e.target.value })} />
                  <Field label="نص الزر الثانوي" value={local.hero.secondaryButtonText} onChange={(e) => setNested('hero', { secondaryButtonText: e.target.value })} />
                </div>
              </div>

              <div className="bg-surface border border-themed rounded-xl p-5 space-y-4">
                <h2 className="font-display font-bold text-primary">العروض المحدودة (Flash Sale)</h2>
                <label className="flex items-center justify-between text-sm text-primary cursor-pointer">
                  تفعيل قسم العروض المحدودة
                  <input type="checkbox" checked={local.flashSale.enabled} onChange={(e) => setNested('flashSale', { enabled: e.target.checked })} className="accent-[var(--color-brand)] w-4 h-4" />
                </label>
                <Field label="عنوان القسم" value={local.flashSale.title} onChange={(e) => setNested('flashSale', { title: e.target.value })} />
                <p className="text-xs text-secondary">لإضافة أو إزالة منتجات هذا القسم، عدّل خاصية "منتج مميز" أو حرر معرفات المنتجات من صفحة إدارة المنتجات.</p>
              </div>
            </>
          )}

          <Button type="submit"><Save size={16} /> حفظ التغييرات</Button>
        </form>
      )}

      {tab === 'security' && (
        <div className="max-w-md space-y-4">
          <div className="bg-surface border border-themed rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Lock size={16} className="text-[var(--color-brand)]" />
              <h2 className="font-display font-bold text-primary">بيانات دخول لوحة التحكم</h2>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              هذه الحماية تعمل بالكامل من المتصفح، وهي كافية لمنع الزوار العاديين من الوصول للوحة التحكم،
              لكنها ليست بديلاً عن نظام تسجيل دخول حقيقي مرتبط بخادم. راجع قسم "Future Backend Integration"
              في ملف README لمزيد من التفاصيل.
            </p>
            {securityError && <p className="text-sm text-[var(--color-danger)] bg-[var(--color-danger)]/10 rounded-lg px-3 py-2">{securityError}</p>}
            <form onSubmit={changeCredentials} className="space-y-3">
              <Field
                label="كلمة المرور الحالية *"
                type="password"
                required
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm((f) => ({ ...f, currentPassword: e.target.value }))}
              />
              <Field
                label="اسم مستخدم جديد (اختياري)"
                value={passwordForm.newUsername}
                onChange={(e) => setPasswordForm((f) => ({ ...f, newUsername: e.target.value }))}
              />
              <Field
                label="كلمة مرور جديدة (اختياري)"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm((f) => ({ ...f, newPassword: e.target.value }))}
              />
              <Button type="submit" className="w-full">تحديث بيانات الدخول</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
