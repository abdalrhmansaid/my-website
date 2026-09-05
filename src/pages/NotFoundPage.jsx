import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import Button from '@/components/common/Button';

export default function NotFoundPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-surface-2 flex items-center justify-center mx-auto mb-5">
        <Compass size={28} className="text-secondary" />
      </div>
      <h1 className="font-display font-extrabold text-3xl text-primary mb-2">404</h1>
      <p className="text-secondary mb-6">الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>
      <Button as={Link} to="/">العودة إلى الرئيسية</Button>
    </div>
  );
}
