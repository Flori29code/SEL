export const formatPrice = (price: number, currency: string = 'USD'): string => {
  const locale = currency === 'PEN' ? 'es-PE' : 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

export const formatDiscount = (original: number, discounted: number): number => {
  return Math.round(((original - discounted) / original) * 100);
};

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}; 