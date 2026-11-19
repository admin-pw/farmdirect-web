import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static site. Real 301 redirects live in public/_redirects (Cloudflare Pages / Netlify format).
export default defineConfig({
  site: 'https://farmdirect.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en-US', es: 'es-US' } },
      filter: (page) => !/\/(thank-you|gracias)\//.test(page),
    }),
  ],
});
