import raw from './varieties.json';
import type { Lang } from '../i18n/routes';

export interface Variety {
  localImage: string;
  id: number;
  slug: string;
  name: string;
  category: string;
  short: string;
  desc: string;
  priceFrom: number;
  priceTo: number;
  images: string[];
  attrs: Record<string, string[]>;
}

// Main product photo is self-hosted in /public/assets/img/products (downloaded from WordPress).
export const varieties: Variety[] = (raw as Omit<Variety, 'localImage'>[]).map((v) => ({
  ...v,
  localImage: v.images[0] ? `/assets/img/products/${v.images[0].split('/').pop()!.replace(/\.(png|jpe?g)$/i, '.webp')}` : '',
}));

// Display order of categories (keys match WooCommerce category names)
export const categoryOrder = ['Wholesale Bunch Roses', 'Spray Roses', 'Garden Roses', 'Alstroemerias'];

export const categorySlug: Record<string, string> = {
  'Wholesale Bunch Roses': 'roses',
  'Spray Roses': 'spray-roses',
  'Garden Roses': 'garden-roses',
  Alstroemerias: 'alstroemeria',
};

export function byCategory() {
  return categoryOrder
    .map((c) => ({ key: c, slug: categorySlug[c], items: varieties.filter((v) => v.category === c) }))
    .filter((g) => g.items.length);
}

export const getVariety = (slug: string) => varieties.find((v) => v.slug === slug);

export const money = (n: number, lang: Lang) =>
  new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'es-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

// "100 Roses" -> "100 stems". Pack labels come from WooCommerce as "N Roses" even for alstroemeria.
export function packLabel(s: string, lang: Lang) {
  const m = s.match(/^(\d+)/);
  return m ? `${m[1]} ${lang === 'en' ? 'stems' : 'tallos'}` : s;
}

export const lengthLabel = (s: string, lang: Lang) =>
  lang === 'en' ? s : s.replace('Long Stem', 'Tallo largo').replace('Short Stem', 'Tallo corto');
