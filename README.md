# Farm Direct: new website (Astro, static, EN + ES)

Replaces the WordPress/Elementor/WooCommerce site. Static output, no database, no plugins.
**Design = a faithful replica of the current WordPress site** (green `#345651`, cream `#EFF0EA`, 20 px radius, "Bigger Display" headings, Cinzel accent, Montserrat body, pill nav, rounded photo cards), rebuilt fluid and responsive (`clamp()`, CSS grid, no fixed pixel layouts; checked at 375, 820 and 1024+ px). No visual redesign yet.

**Design pass 2 (Nov 2026):** same palette and typography, tidier layout. Sticky floating header; About-tabs block keeps a fixed height (all panels share one grid cell); the "High altitude" banner is a standalone banner with the four origin points as a row of cards below it; "Why our partners" is a photo + numbered 2x2 cards; modern footer (phone CTA, columns, wordmark). Letter-by-letter heading animation (`data-split`) and scroll fade-ups (`data-reveal`) run from a small script in `Base.astro`; they respect `prefers-reduced-motion` and fall back to plain text if JS fails.

**Mobile pass:** full-screen menu (`.mobile-nav` in `Header.astro`: big links, call button, email, social, language), and a compact layout at <=700 px (last block of `global.css`): tabs as chips, two stat cards, swipeable card rows for origin/partners/categories, no decorative photos in FAQ, 2-column product grid. Home went from ~8,600 px to ~4,800 px tall at 375 px; Varieties from ~15,000 to ~6,400.

Deliberate differences from the live site (all functional, easy to remove): phone number in header/footer/menu, a floating "Call sales" button on mobile, EN/ES switch, a product list under the category cards on /varieties/, "Open an account" form page.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs ./dist (75 pages)
```

Copy `.env.example` to `.env` and fill:

| Variable | What it does |
|---|---|
| `PUBLIC_FORM_ENDPOINT` | Where leads are POSTed (urlencoded, `no-cors`, same transport as the current Make webhook). **Empty = forms fall back to a prefilled email**, so no lead is silently lost. |
| `PUBLIC_GTM_ID` | GTM container. Empty = no tracking scripts. |

## Structure

```
src/data/site.ts        phone, email, social, feature flags (showPrices), temporary remote assets
src/data/varieties.json 27 varieties exported from WooCommerce (names, packs, lengths, prices, images)
src/i18n/ui.ts          ALL copy, EN + ES (Spanish is type-checked to match English)
src/i18n/routes.ts      URL of every page in both languages
src/views/*.astro       page bodies (take a `lang` prop)
src/pages/**            thin route files (EN at /, ES at /es/)
src/components/         Header, Footer, LeadForm, VarietyCard, Faq, Reviews
public/_redirects       301 map from old WordPress URLs (Netlify / Cloudflare Pages format)
```

URLs kept from WordPress for SEO: `/`, `/varieties/`, `/about-us/`, `/contact/`, `/holiday-roses/`.
New: `/apply/`, `/catalog/`, `/thank-you/`, `/privacy/`, `/terms/`, `/varieties/<slug>/`; Spanish under `/es/…`.

## Tracking (dataLayer events, ready for GTM)

`click_to_call`, `click_email`, `catalog_open`, `lead_form_start`, `lead_form_error`, `lead_submit` (form sent), `thank_you_view` (confirmed-lead page).
Each form sends `source` (holiday_roses, apply, contact, variety_detail), `lang`, `variety`, page URL, UTMs, `fbclid`/`gclid`, referrer.
Mark **only** `lead_submit` / `thank_you_view` as GA4 key events (plus `click_to_call`). Do not mark page_view/scroll.

## Before launch (checklist)

- [ ] Set `PUBLIC_FORM_ENDPOINT`. **The current Make webhook belongs to an org that was reported paused (Aug 6 report). Confirm it is active, or use another endpoint, and test a real lead end to end.**
- [ ] Set `PUBLIC_GTM_ID`; create GA4 key events from the list above; add a call-tracking number if sales wants phone attribution.
- [x] Logos, page photos, the "Bigger Display" font and the main photo of each of the 27 varieties are **self-hosted** in `public/assets` (downloaded from WordPress). **Optimized**: everything re-encoded as WebP q76, large photos capped at 1000–1600 px wide, product photos at 500 px, the two PNG products converted to WebP, unused 766 KB SVG removed (8.7 MB to 3.1 MB). Add new images already compressed (WebP) to keep this size.
- [ ] Still hot-linked from WordPress: the Holiday Roses images (Dallas, Pink Floyd) and extra gallery photos. Self-host them before WordPress is switched off.
- [ ] Favicon is a placeholder SVG; replace with the real one.

### Text corrections applied to the copy (review with the client)
- "20 / 25 / 30 years" claims unified to **29 years** (computed from 1997); "+25" card is now "+29".
- Typos: "proccess" to "process", "on 2007" to "in 2007", "you roses" to "your roses", "upselling" to "selling", "FDC Farms" to "Farm Direct".
- Removed claims that no longer apply because there is no online store: "trusted payment gateways", "SSL / online payments", "payment methods: credit card and PayPal", "online orders typically require 3-5 days", "customize through our online platform". Replaced with phone/account-manager wording **[confirm payment terms and custom-pack wording]**.
- The three "Who We Are at Farm Direct" headings are now Who we are / Vision / Mission tabs.
- Contact form now collects first/last name, phone and business type (sales close by phone); duplicate "Company Name / Business Name" fields merged.
- Cancellation policy kept (5 days); the "10% card refund fee" line was dropped with the online payments.
- [ ] `public/catalog/flipbook/index.html` loads the catalog PDF from WordPress (`PDF_URL`). Upload the PDF to the new host and update that URL.
- [ ] Legal pages are **drafts** (marked, noindex). Replace with counsel-approved text. (`/privacy-policy` and `/terms-of-service` currently 404 on the live site.)
- [ ] Confirm copy marked in `ui.ts`: Garden Roses blurb is new (old site reused the Roses text); "10 partner farms", "replies within 2 hours", "24 h guarantee" come from the old site.
- [ ] Unify the "years" claim: the site now computes it from 1997 (29 in 2026). Old pages said 20/25/29/30.
- [ ] Decide `showPrices` (flag in `site.ts`). Prices shown are the WooCommerce "from" price per box.
- [ ] Add a cookie/consent banner if required (CCPA) once GTM is live.
- [ ] Remove `noindex` from nothing: thank-you and legal drafts stay noindex; verify sitemap excludes them.
- [ ] Deploy to staging (noindex), crawl, and compare against the old URL inventory; then switch DNS (do not touch MX/TXT records of email).
- [ ] Hosting: `_redirects` works on Netlify and Cloudflare Pages. Cloudflare Pages strips trailing slashes by default; the site uses `trailingSlash: 'always'`, so prefer Netlify, or test redirects before choosing.
- [ ] Add social image 1200×630, real favicon/logo files, and alt text review.

## Holiday Roses (archived, not published)
The Holiday Roses landing is **not part of the site**: no menu/footer links, and its routes are disabled by renaming the page files to `src/pages/holiday-roses/_index.astro` and `src/pages/es/rosas-navidenas/_index.astro` (Astro ignores `_` files). The design lives on in `src/views/HolidayRoses.astro`, the copy in `ui.ts` (`holiday`). To bring it back, rename both files to `index.astro` and re-add the link in `Header.astro`/`Footer.astro`.

## Featured varieties (from the 2026 catalog PDF)
The site only shows a curated selection (12 flowers) from the 60-page flower catalog, so the full range is not revealed. Edit the list in `src/data/featured.ts`; photos live in `public/assets/img/flowers/` (cut out from the catalog pages). Tapping a flower adds its name to the order form's message. The per-product detail pages from the old WooCommerce data are archived (`src/pages/varieties/_[slug].astro`, `src/pages/es/variedades/_[slug].astro`); old `/product/...` URLs redirect to `/varieties/`. Language switch is a single circular flag button (shows the language you switch to).

## Market Box promo (Varieties page)
`#market-box` on `/varieties/` and `/es/variedades/` is locked (closed box, no price) until the visitor submits the lead form (`source=market_box`, `variant="promo"`, `unlock="market-box"` in `LeadForm.astro`). A successful submit fires the `fd:unlock` event, saves the first name in `localStorage` (`fd_market_box`) and opens the box in place: price, contents and a prefilled "claim by text" link. Copy lives in `ui.ts` under `varieties.box`; images in `public/assets/img/promo/`. It is a soft gate (the content is in the page source); fine for a promo, not for anything confidential.

## Home interactive pieces
- Section 2 ("story") uses an arch photo collage, tab-style Who we are / Vision / Mission and two count-up facts.
- "High altitude, grand stems" banner: the four origin topics are icon buttons over the photo. Tapping one slides the photo to the left half and opens a text frame on the right; the icons switch topics, the X or the active icon closes it. Copy is `home.origin` in `ui.ts`.
