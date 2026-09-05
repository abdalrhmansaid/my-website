import { useMemo } from 'react';
import {
  Package, PackageX, Star, Sparkles, Tag, LayoutGrid, Eye, ShoppingBag, MessageCircle,
} from 'lucide-react';
import { FacebookIcon } from '@/components/common/BrandIcons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ProductService } from '@/services/ProductService';
import { CategoryService } from '@/services/CategoryService';
import { AnalyticsService } from '@/services/AnalyticsService';
import StatCard from '@/components/admin/StatCard';

export default function AdminOverviewPage() {
  const products = ProductService.getAll();
  const categories = CategoryService.getAll();
  const analytics = AnalyticsService.getState();

  const stats = useMemo(() => ({
    total: products.length,
    active: products.filter((p) => p.status === 'active').length,
    outOfStock: products.filter((p) => p.stock <= 0).length,
    featured: products.filter((p) => p.featured).length,
    newProducts: products.filter((p) => p.isNew).length,
    discounted: products.filter((p) => ProductService.discountPercent(p) > 0).length,
  }), [products]);

  const topViewed = AnalyticsService.topProducts('productViews', products, 5);
  const chartData = topViewed.map((row) => ({ name: row.product.name.slice(0, 14), المشاهدات: row.count }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-primary mb-1">نظرة عامة</h1>
        <p className="text-sm text-secondary">ملخص أداء المتجر والمنتجات</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <StatCard icon={Package} label="إجمالي المنتجات" value={stats.total} />
        <StatCard icon={Sparkles} label="منتجات نشطة" value={stats.active} />
        <StatCard icon={PackageX} label="نفدت الكمية" value={stats.outOfStock} tone="danger" />
        <StatCard icon={Star} label="مميزة" value={stats.featured} tone="brass" />
        <StatCard icon={Tag} label="عليها خصم" value={stats.discounted} tone="brass" />
        <StatCard icon={LayoutGrid} label="التصنيفات" value={categories.length} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={Eye} label="إجمالي المشاهدات" value={analytics.totals.productViews} />
        <StatCard icon={ShoppingBag} label="نقرات الطلب" value={analytics.totals.buyClicks} />
        <StatCard icon={MessageCircle} label="نقرات واتساب" value={analytics.totals.whatsappClicks} />
        <StatCard icon={FacebookIcon} label="نقرات فيسبوك" value={analytics.totals.facebookClicks} />
      </div>

      <div className="bg-surface border border-themed rounded-xl p-5">
        <h2 className="font-display font-bold text-primary mb-4">المنتجات الأكثر مشاهدة</h2>
        {chartData.length === 0 ? (
          <p className="text-sm text-secondary py-8 text-center">لا توجد بيانات كافية بعد. تصفّح المتجر لتوليد إحصائيات.</p>
        ) : (
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="المشاهدات" fill="#1C4B43" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
