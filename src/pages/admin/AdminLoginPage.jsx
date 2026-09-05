import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useStore } from '@/contexts/StoreContext';
import Button from '@/components/common/Button';

export default function AdminLoginPage() {
  const { isAuthenticated, login } = useAuth();
  const { settings } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const submit = (e) => {
    e.preventDefault();
    const result = login(form.username, form.password);
    if (!result.success) setError(result.error);
    else navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-page px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="w-12 h-12 rounded-2xl bg-[var(--color-brand)] flex items-center justify-center mx-auto mb-3">
            <span className="font-display font-extrabold text-white text-xl">{settings.logoText?.[0] || 'ف'}</span>
          </span>
          <h1 className="font-display font-bold text-xl text-primary">لوحة تحكم {settings.storeName}</h1>
          <p className="text-sm text-secondary mt-1">سجّل الدخول لإدارة المتجر</p>
        </div>

        <form onSubmit={submit} className="bg-surface border border-themed rounded-2xl p-6 space-y-4">
          {error && <p className="text-sm text-[var(--color-danger)] bg-[var(--color-danger)]/10 rounded-lg px-3 py-2">{error}</p>}

          <div>
            <label className="text-sm font-medium text-primary block mb-1.5">اسم المستخدم</label>
            <div className="flex items-center gap-2 border border-themed rounded-lg px-3 py-2.5">
              <User size={16} className="text-secondary" />
              <input
                required
                autoFocus
                value={form.username}
                onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                className="flex-1 bg-transparent outline-none text-sm text-primary"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-primary block mb-1.5">كلمة المرور</label>
            <div className="flex items-center gap-2 border border-themed rounded-lg px-3 py-2.5">
              <Lock size={16} className="text-secondary" />
              <input
                required
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className="flex-1 bg-transparent outline-none text-sm text-primary"
              />
              <button type="button" onClick={() => setShowPassword((s) => !s)} className="text-secondary">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">تسجيل الدخول</Button>

          <p className="text-xs text-secondary text-center pt-1">
            بيانات الدخول الافتراضية: admin / velora2026 — يُنصح بتغييرها فور الدخول من الإعدادات.
          </p>
        </form>
      </div>
    </div>
  );
}
