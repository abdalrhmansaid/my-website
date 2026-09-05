# فيلورا (Velora) — Premium E-Commerce Store

متجر إلكتروني كامل مبني بـ React + Vite، لا يحتاج بوابة دفع ولا تسجيل دخول للعميل — رحلة الشراء تنتهي
برسالة جاهزة على واتساب أو فيسبوك. يتضمن المشروع لوحة تحكم كاملة لإدارة المنتجات والتصنيفات والإعدادات
والتحليلات، بدون أي Backend في هذه النسخة.

---

## 1. نظرة عامة على المشروع

- **الواجهة الأمامية للعميل**: الرئيسية، كل المنتجات (بحث/فلاتر/ترتيب)، صفحة تفاصيل المنتج، المفضلة،
  العروض، من نحن، تواصل معنا.
- **رحلة الشراء**: Home → Products → Product Details → Buy Now → يفتح واتساب برسالة جاهزة (أو فيسبوك).
- **لوحة التحكم** (`/admin`): نظرة عامة وإحصائيات، إدارة منتجات كاملة (إضافة/تعديل/حذف/نسخ/تفعيل)،
  إدارة تصنيفات، إدارة بانرات ترويجية، إعدادات المتجر بالكامل (بيانات التواصل، روابط السوشيال ميديا،
  محتوى الصفحة الرئيسية)، وتغيير بيانات دخول الأدمن.
- كل البيانات (منتجات، تصنيفات، إعدادات، مفضلة، تحليلات) محفوظة في **localStorage** عبر طبقة Services
  مصممة لتُستبدل لاحقًا بخادم حقيقي دون إعادة كتابة الواجهات.

---

## 2. المزايا (Features)

- Dark / Light Mode مع حفظ الاختيار.
- شريط إعلانات (Announcement Bar) قابل للتفعيل والتعديل من اللوحة.
- Hero قابل للتخصيص بالكامل (عنوان، وصف، صورة، نصوص الأزرار).
- عروض محدودة (Flash Sale) بعدّاد تنازلي.
- منتجات مميزة، الأكثر مبيعًا، وصل حديثًا.
- بحث حي (Live Search) + بحث كامل في صفحة المنتجات.
- فلاتر (تصنيف، سعر، تقييم، توفر، خصم) وترتيب (الأحدث، السعر، التقييم، الأكثر مبيعًا).
- صفحة منتج كاملة: معرض صور، مواصفات، تقييمات ومراجعات (يمكن للزائر إضافة تقييم)، منتجات "شاهدتها مؤخرًا".
- طلب مباشر عبر واتساب وفيسبوك، بدون أي بوابة دفع.
- مفضلة (Wishlist) ومشاركة المنتج (رابط / واتساب / فيسبوك / مشاركة الجهاز إن توفرت).
- تحليلات محلية: مشاهدات المنتج، نقرات الطلب، نقرات واتساب/فيسبوك، مع رسم بياني في اللوحة.
- Toast Notifications، Skeleton Loading، Empty States، صفحة 404، صورة بديلة عند تعطل رابط الصورة.
- Bottom Navigation على الموبايل + قائمة جانبية (Drawer) على الشاشات الصغيرة.
- تصميم Responsive بالكامل من الموبايل إلى الشاشات الكبيرة.

---

## 3. Tech Stack

- React 19 + Vite
- React Router v6
- Tailwind CSS v4 (عبر `@tailwindcss/vite`)
- Lucide React (أيقونات)
- Recharts (الرسم البياني في لوحة التحكم)
- localStorage كطبقة تخزين مبدئية (عبر Services قابلة للاستبدال)

---

## 4. هيكل المجلدات (Folder Structure)

```
src/
  components/
    common/      → عناصر عامة (Button, Badge, RatingStars, Skeleton, EmptyState...)
    layout/      → Navbar, Footer, AnnouncementBar, MobileBottomNav, MobileMenu, Layout
    home/        → Hero, Features, CategoryGrid, FlashSale, PromoBanner, RecentlyViewed
    product/     → ProductCard, ProductGrid, FilterPanel, SortDropdown, ProductGallery...
    admin/       → AdminLayout, StatCard
  pages/         → صفحات الواجهة العامة (Home, Products, ProductDetails, Wishlist...)
    admin/       → صفحات لوحة التحكم (Overview, Products, Categories, Banners, Settings, Login)
  services/      → طبقة البيانات (ProductService, CategoryService, SettingsService,
                   WishlistService, AnalyticsService, AuthService, BannerService, ReviewService)
  contexts/      → ThemeContext, ToastContext, StoreContext, WishlistContext, AuthContext
  hooks/         → useProducts, useDebounce, useMediaQuery
  data/          → بيانات تجريبية أولية (products.seed.js, categories.seed.js, settings.seed.js)
  utils/         → storage.js (غلاف localStorage)، format.js
  styles/        → index.css (متغيرات التصميم والخطوط)
```

---

## 5. التثبيت (Installation)

يتطلب Node.js 18 أو أحدث.

```bash
cd premium-store
npm install
```

## 6. التشغيل أثناء التطوير (Development)

```bash
npm run dev
```

سيفتح المشروع عادة على `http://localhost:5173`.

## 7. البناء للإنتاج (Production Build)

```bash
npm run build
npm run preview   # لمعاينة نسخة الإنتاج محليًا
```

الناتج يكون في مجلد `dist/` — ارفعه على أي استضافة ثابتة (Vercel, Netlify, Cloudflare Pages,
GitHub Pages، أو أي سيرفر يدعم SPA fallback).

> **ملاحظة النشر (SPA Fallback):** بما أن المشروع يستخدم React Router، يجب توجيه كل المسارات غير
> الموجودة كملف إلى `index.html` (يُعرف عادة بـ "rewrite" أو "SPA fallback"). كل الاستضافات المذكورة
> أعلاه تدعم هذا تلقائيًا أو بإعداد بسيط (`_redirects` في Netlify، إعداد Rewrites في Vercel...).

---

## 8. إعداد دخول لوحة التحكم (Admin Login Setup)

- الرابط: `/admin/login`
- بيانات الدخول الافتراضية:
  - اسم المستخدم: `admin`
  - كلمة المرور: `velora2026`
- **غيّر كلمة المرور فورًا** بعد أول دخول من: لوحة التحكم → الإعدادات → تبويب "الأمان".
- الجلسة صالحة لمدة 12 ساعة، ثم يُطلب تسجيل الدخول من جديد.

⚠️ **مهم جدًا:** هذا النظام يعمل بالكامل من المتصفح (client-side) ولا يوجد خادم يتحقق من الهوية.
هذا كافٍ لمنع الزوار العاديين من فتح لوحة التحكم، لكنه **ليس حماية حقيقية** — أي شخص لديه إمكانية فتح
أدوات المطوّر (DevTools) في هذا المتصفح يمكنه قراءة أو تعديل بيانات `localStorage`. لا تعتمد على هذا
كحماية وحيدة في مشروع فعلي يحتوي على بيانات حساسة. راجع قسم "التكامل المستقبلي مع Backend" أدناه.

---

## 9. إعداد واتساب (WhatsApp Setup)

من لوحة التحكم → الإعدادات → تبويب "التواصل والسوشيال" → أدخل رقم واتساب **بدون علامة + وبدون مسافات**،
مع كود الدولة، مثال لمصر: `201001234567`.

عند الضغط على "اطلب الآن" يُفتح واتساب برسالة جاهزة تحتوي على اسم المنتج ورقمه وسعره ورابطه.

## 10. إعداد فيسبوك (Facebook Setup)

من نفس التبويب أدخل رابط صفحة فيسبوك الخاصة بالمتجر (مثال: `https://facebook.com/your-page`).
زر "اطلب عبر فيسبوك" في صفحة تفاصيل المنتج يفتح هذا الرابط في تبويب جديد.

---

## 11. إضافة المنتجات (Adding Products)

من لوحة التحكم → المنتجات → "إضافة منتج": أدخل الاسم، الوصف، السعر (والسعر قبل الخصم إن وجد)،
التصنيف، الكمية، الصور (بروابط URL)، المواصفات، الوسوم، وحدّد إن كان المنتج مميزًا / جديدًا / الأكثر
مبيعًا. تظهر معاينة مباشرة (Live Preview) لشكل بطاقة المنتج أثناء التعبئة.

يمكنك أيضًا **نسخ** منتج موجود أو **تفعيل/تعطيل** ظهوره في المتجر دون حذفه.

## 12. إعدادات المتجر (Store Settings)

من لوحة التحكم → الإعدادات: اسم المتجر، الوصف، بيانات التواصل، روابط السوشيال ميديا، شريط الإعلانات،
محتوى قسم الـ Hero في الرئيسية، وإعدادات قسم العروض المحدودة.

## 13. تخزين البيانات (Data Storage)

كل البيانات محفوظة حاليًا في `localStorage` عبر طبقة Services مستقلة تمامًا عن الواجهات:

- `ProductService`, `CategoryService`, `SettingsService`, `BannerService`, `ReviewService`
- `WishlistService`, `RecentlyViewedService`, `AnalyticsService`, `AuthService`

كل الوظائف (get/create/update/remove...) موجودة في `src/services/`. لا يوجد أي بيانات Hard-coded
داخل الـ Components — كل شيء يمر عبر هذه الطبقة، بما فيها البيانات التجريبية الأولية في `src/data/`.

**ملاحظة:** `localStorage` مرتبط بالمتصفح والجهاز؛ التعديلات التي تجريها من لوحة التحكم على جهاز/متصفح
معيّن لن تظهر لزوار آخرين يفتحون الموقع من أجهزة مختلفة. هذا طبيعي في هذه المرحلة (Frontend-only) وسيُحل
عند ربط المشروع بخادم حقيقي (انظر القسم التالي).

---

## 14. النشر (Deployment)

1. نفّذ `npm run build`.
2. ارفع محتوى مجلد `dist/` إلى الاستضافة المفضلة لديك (Vercel / Netlify / Cloudflare Pages...).
3. تأكد من تفعيل SPA Fallback كما ذُكر في قسم "Production Build" أعلاه.
4. لا حاجة لأي متغيرات بيئة (Environment Variables) في هذه النسخة، لأنها Frontend بالكامل.

---

## 15. التكامل المستقبلي مع Backend (Future Backend Integration)

طبقة الـ Services (`src/services/`) صُممت خصيصًا لتسهيل هذا الانتقال. كل ملف Service يغلّف مصدر
البيانات، لذا يمكن استبدال الجسم الداخلي لدوال كل Service (مثل `ProductService.getAll`) لتستدعي
Firebase / Supabase / REST API بدلاً من `localStorage`، دون تعديل أي صفحة أو مكوّن يستخدم هذه الدوال.

خطوات مقترحة عند الانتقال لخادم حقيقي:
- استبدال `AuthService` بمصادقة حقيقية (مثل Firebase Auth أو JWT عبر API)، بحيث تُتحقق الجلسة من الخادم
  وليس من `localStorage` فقط.
- استبدال دوال `ProductService` / `CategoryService` / `BannerService` / `SettingsService` باستدعاءات
  `fetch` أو SDK قاعدة البيانات المختارة، مع إبقاء نفس التوقيعات (نفس أسماء الدوال والمدخلات/المخرجات)
  حتى لا تحتاج لتعديل الصفحات.
- ربط `AnalyticsService` بخدمة تحليلات حقيقية أو جدول في قاعدة البيانات لتجميع الإحصائيات من كل الزوار
  بدلاً من جهاز واحد فقط.
- إضافة رفع صور فعلي (Image Upload / Storage) بدلاً من إدخال روابط URL يدويًا في نموذج المنتج.

---

## 16. بيانات تجريبية

المشروع يأتي مع 14 منتجًا تجريبيًا و6 تصنيفات، تُحمَّل تلقائيًا عند أول تشغيل حتى يظهر المتجر ممتلئًا
مباشرة. يمكنك حذفها أو تعديلها من لوحة التحكم في أي وقت.
