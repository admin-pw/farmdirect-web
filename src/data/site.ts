// Single source of truth for contact data, feature flags and (temporary) remote assets.
const wp = 'https://farmdirect.com/wp-content/uploads';

export const site = {
  name: 'Farm Direct',
  domain: 'https://farmdirect.com',
  phone: '+1 (645) 400-3304',
  phoneHref: 'tel:+16454003304',
  email: 'sales1@farmdirect.com',
  since: 1997,
  get years() {
    return new Date().getFullYear() - this.since;
  },
  // Show "From $X / box" on variety cards and pages. Flip to false to hide all prices.
  showPrices: false,
  // Shown on the Holiday Roses landing.
  holidayWindow: { en: 'Oct 15 – Nov 15', es: '15 oct – 15 nov' },
  social: {
    facebook: 'https://www.facebook.com/people/Farm-Direct-Corp/61579102440025/',
    instagram: 'https://www.instagram.com/farmdirectcorp',
    linkedin: 'https://www.linkedin.com/company/farmdirectcorp',
  },
  // Environment-driven (see .env.example)
  formEndpoint: (import.meta.env.PUBLIC_FORM_ENDPOINT as string | undefined) ?? '',
  gtmId: (import.meta.env.PUBLIC_GTM_ID as string | undefined) ?? '',
  // TEMPORARY: hot-linked from the WordPress media library. Replace with local files in /public
  // (or src/assets) after exporting the media library, before WordPress is switched off.
  assets: {
    // Self-hosted copies (public/assets/img), downloaded from the WordPress media library.
    logoDark: '/assets/img/Farm-Direct-FC-White-bkg.webp',
    logoLight: '/assets/img/Farm-Direct_Logo_1C-White.png',
    // Holiday Roses landing images: still hot-linked from WordPress, self-host before switching WP off.
    dallas: `${wp}/2026/07/dallas-frame.webp`,
    dallasSmall: `${wp}/2026/07/dallas-frame-768x960.webp`,
    pinkFloyd: `${wp}/2026/08/Pink_Floyd-Rose-1.webp`,
  },
} as const;
