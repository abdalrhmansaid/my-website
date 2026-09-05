export function formatPrice(value) {
  return `${Number(value).toLocaleString('ar-EG')} ج.م`;
}

export function shareLinks({ url, title }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  return {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };
}

export function currentUrl(path = '') {
  if (typeof window === 'undefined') return '';
  return `${window.location.origin}${path}`;
}
