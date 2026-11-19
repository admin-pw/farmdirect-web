export type Lang = 'en' | 'es';
export const langs: Lang[] = ['en', 'es'];

// One entry per page, with the URL in each language. Old WordPress URLs that ranked
// (/about-us/, /contact/, /varieties/, /holiday-roses/) are kept as-is for SEO continuity.
export const routes = {
  home: { en: '/', es: '/es/' },
  varieties: { en: '/varieties/', es: '/es/variedades/' },
  about: { en: '/about-us/', es: '/es/sobre-nosotros/' },
  contact: { en: '/contact/', es: '/es/contacto/' },
  holiday: { en: '/holiday-roses/', es: '/es/rosas-navidenas/' },
  apply: { en: '/apply/', es: '/es/solicitar-cuenta/' },
  catalog: { en: '/catalog/', es: '/es/catalogo/' },
  thanks: { en: '/thank-you/', es: '/es/gracias/' },
  privacy: { en: '/privacy/', es: '/es/privacidad/' },
  terms: { en: '/terms/', es: '/es/terminos/' },
} as const;

export type RouteKey = keyof typeof routes;

export const varietyPath = (lang: Lang, slug: string) =>
  lang === 'en' ? `/varieties/${slug}/` : `/es/variedades/${slug}/`;

export const r = (key: RouteKey, lang: Lang) => routes[key][lang];
