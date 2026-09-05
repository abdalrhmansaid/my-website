import { useStore } from '@/contexts/StoreContext';

export default function AboutPage() {
  const { settings } = useStore();

  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="font-display font-extrabold text-3xl text-primary mb-5">من نحن</h1>
      <p className="text-secondary leading-relaxed mb-4">
        {settings.storeName} هو متجر إلكتروني يقدّم مجموعة مختارة بعناية من المنتجات التي تجمع بين الجودة
        والتصميم المدروس. نؤمن أن التسوق يجب أن يكون تجربة بسيطة وسريعة، لذلك جعلنا رحلة الطلب بأكملها
        بضع خطوات فقط تنتهي برسالة واحدة على واتساب.
      </p>
      <p className="text-secondary leading-relaxed mb-4">
        نحرص على اختيار كل منتج بعناية، والتأكد من جودته قبل عرضه، حتى تصلك القطعة كما تتوقعها بالضبط.
      </p>
      <p className="text-secondary leading-relaxed">{settings.description}</p>
    </div>
  );
}
