import { useState } from 'react';
import { Star } from 'lucide-react';
import RatingStars from '@/components/common/RatingStars';
import Button from '@/components/common/Button';
import { ReviewService } from '@/services/ReviewService';
import { useToast } from '@/contexts/ToastContext';

export default function ReviewsSection({ productId, rating, reviewsCount }) {
  const [reviews, setReviews] = useState(() => ReviewService.getForProduct(productId));
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ author: '', rating: 5, comment: '' });
  const { showToast } = useToast();

  const submitReview = (e) => {
    e.preventDefault();
    if (!form.author.trim() || !form.comment.trim()) return;
    const review = ReviewService.add(productId, form);
    setReviews((prev) => [review, ...prev]);
    setForm({ author: '', rating: 5, comment: '' });
    setShowForm(false);
    showToast('شكرًا لتقييمك، تمت إضافته بنجاح', 'success');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-display font-bold text-xl text-primary mb-1">التقييمات والمراجعات</h2>
          <RatingStars rating={rating} count={reviewsCount} size={16} />
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowForm((s) => !s)}>
          أضف تقييمك
        </Button>
      </div>

      {showForm && (
        <form onSubmit={submitReview} className="mb-6 p-4 rounded-xl border border-themed bg-surface space-y-3">
          <input
            required
            value={form.author}
            onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
            placeholder="اسمك"
            className="w-full bg-transparent border border-themed rounded-lg px-3 py-2 text-sm text-primary outline-none"
          />
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => setForm((f) => ({ ...f, rating: n }))}>
                <Star size={20} className={n <= form.rating ? 'fill-[var(--color-brass)] text-[var(--color-brass)]' : 'text-[var(--border-color)]'} />
              </button>
            ))}
          </div>
          <textarea
            required
            value={form.comment}
            onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
            placeholder="اكتب رأيك في المنتج..."
            rows={3}
            className="w-full bg-transparent border border-themed rounded-lg px-3 py-2 text-sm text-primary outline-none resize-none"
          />
          <Button type="submit" size="sm">إرسال التقييم</Button>
        </form>
      )}

      {reviews.length === 0 ? (
        <p className="text-sm text-secondary">لا توجد مراجعات بعد. كن أول من يقيّم هذا المنتج.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-themed pb-4 last:border-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-sm text-primary">{review.author}</span>
                <RatingStars rating={review.rating} showValue={false} size={13} />
              </div>
              <p className="text-sm text-secondary leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
