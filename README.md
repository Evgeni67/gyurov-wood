# Gyurov Wood – website

Next.js (App Router, React 19) site for the wooden garden furniture listed on
alo.bg. Every page is rendered on the server and pre-built as static HTML, so
Google gets the full content, prices and structured data on the first request.

## 1. Before you publish – fill in your details

Open **`lib/site.ts`** and set:

| Field   | What it does |
|---------|--------------|
| `name`  | Brand name in the logo, page titles and Google results (now "Gyurov Wood"). |
| `phone` | e.g. `"+359888123456"`. Turns on the **Обади се** and **Viber** buttons and sends inquiries to WhatsApp. |
| `email` | If set, the **Поискай оферта** form opens a pre-filled email to this address. |
| `social`| Facebook / Instagram links (added to Google's business profile data). |

Until a phone or email is set, every contact button sends visitors to your
alo.bg listings, so nothing on the site is ever broken.

Products, prices and descriptions live in **`lib/products.ts`**; category
texts in **`lib/categories.ts`**. To add a product, copy one block, change the
fields, and put its photo in `public/products/<id>.jpg`.

## 2. Run it on your computer

Double-click **`start.bat`** (or run `npm install` then `npm run dev`) and open
http://localhost:3000. Edits to the files show up automatically.

## 3. Publish

The site is hosted on Netlify as fully pre-rendered HTML (project `gyurov-wood`).

- **Update the live site:** double-click **`publish-site.bat`**. It builds a clean
  copy and uploads it to https://gyurov-wood.netlify.app.
- **Push code to GitHub:** double-click **`push-to-github.bat`**
  (repo: https://github.com/Evgeni67/gyurov-wood).
- **Own domain:** Netlify → project → *Domain management* → add your domain, then set
  `NEXT_PUBLIC_SITE_URL` in `publish-site.bat` to that domain and publish again.

Alternative hosting: any Node server (`npm run build && npm start`) or Docker
(`Dockerfile` included) serves the same site with live server-side rendering.

## 4. After launch – SEO checklist

1. **Google Search Console** (search.google.com/search-console): add your
   domain, then submit `https://www.your-domain.bg/sitemap.xml`.
2. **Google Business Profile** (business.google.com): create a profile for the
   workshop in София with the same name, phone and website. This is the single
   biggest boost for searches like "беседка по поръчка София".
3. Test product pages at search.google.com/test/rich-results – they should
   show *Product*, *Breadcrumb* and (on the home page) *FAQ* and *LocalBusiness*.
4. Link to the website from your alo.bg profile, Facebook and Instagram.
5. Add more photos and real customer projects over time – fresh, original
   content is what keeps rankings climbing.

## What's built in

- Server-side rendering + static generation for every page (`/`, 5 category
  pages, 12 product pages).
- Unique title, description, canonical URL, Open Graph and Twitter card per page.
- Schema.org JSON-LD: `FurnitureStore`/`LocalBusiness`, `WebSite`, `Product`
  with `Offer` (EUR price, made-to-order), `BreadcrumbList`, `ItemList`, `FAQPage`.
- `sitemap.xml` (with image entries), `robots.txt`, web manifest, favicon.
- Bulgarian (`lang="bg"`), keyword-focused URLs such as
  `/besedki/darvena-besedka-3x3-s-masa-i-peiki`.
- Self-hosted product photos served as AVIF/WebP in the right size for each
  device; self-hosted Onest font with Cyrillic.
- Conversion features: "Поискай оферта" form on every product, sticky price bar
  on mobile, call/Viber buttons, FAQ, ordering steps, related products.
- Accessible: keyboard focus, skip link, reduced-motion support, semantic HTML.

## Project map

```
app/                    pages (home, [category], [category]/[slug]), sitemap, robots
components/             Header, Footer, hero billboard, product cards, inquiry dialog
lib/site.ts             ← your business details
lib/products.ts         ← products
lib/categories.ts       ← category pages and SEO texts
lib/seo.ts              structured data + FAQ
scripts/fetch-images.mjs  downloads photos from alo.bg before each build
```
