// Curated selection from the 2026 flower catalog. Only the most important varieties are shown on the site;
// the full catalog is shared by the sales team. Photos: /public/assets/img/flowers (cut out from the catalog).
export type FeaturedCat = 'roses' | 'garden-roses' | 'alstroemeria';

export interface Featured {
  slug: string;
  name: string;
  cat: FeaturedCat;
  color: { en: string; es: string };
}

export const featured: Featured[] = [
  { slug: 'dallas', name: 'Dallas', cat: 'roses', color: { en: 'Red', es: 'Rojo' } },
  { slug: 'freedom', name: 'Freedom', cat: 'roses', color: { en: 'Red', es: 'Rojo' } },
  { slug: 'explorer', name: 'Explorer', cat: 'roses', color: { en: 'Burgundy', es: 'Borgoña' } },
  { slug: 'pink-floyd', name: 'Pink Floyd', cat: 'roses', color: { en: 'Hot pink', es: 'Rosa fucsia' } },
  { slug: 'mondial', name: 'Mondial', cat: 'roses', color: { en: 'Ivory', es: 'Marfil' } },
  { slug: 'cayenne', name: 'Cayenne', cat: 'roses', color: { en: 'Orange', es: 'Naranja' } },
  { slug: 'super-sun', name: 'Super Sun', cat: 'roses', color: { en: 'Yellow', es: 'Amarillo' } },
  { slug: 'quicksand', name: 'Quicksand', cat: 'roses', color: { en: 'Cream', es: 'Crema' } },
  { slug: 'queens-crown', name: 'Queens Crown', cat: 'garden-roses', color: { en: 'Magenta', es: 'Magenta' } },
  { slug: 'candlelight', name: 'Candlelight', cat: 'garden-roses', color: { en: 'Ivory', es: 'Marfil' } },
  { slug: 'okinawa', name: 'Okinawa', cat: 'alstroemeria', color: { en: 'Purple', es: 'Morado' } },
  { slug: 'cordoba', name: 'Cordoba', cat: 'alstroemeria', color: { en: 'White & pink', es: 'Blanco y rosa' } },
];
