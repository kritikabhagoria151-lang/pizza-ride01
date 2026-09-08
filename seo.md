# Pizza Ride — SEO Audit & Improvement Plan

> Audit based on the **actual code** in this project (`pizza-ride01-main/artifacts/pizza-ride`).
> Current live URL: `https://pizza-ride01-main.vercel.app`
> Business: Pizza Ride — Samalkha, Haryana, India (100% veg pizza & fast-food delivery)

## Quick Status Checklist

| # | Area | Status |
|---|------|--------|
| 1 | Title Tag | ❌ Single generic title, no keywords |
| 2 | Meta Description | ❌ Replit placeholder text |
| 3 | Heading Hierarchy | ❌ No `<h1>` on any main page |
| 4 | Alt Text | ✅ All `<img>` have `alt` (can be improved) |
| 5 | Clean URLs | ✅ Short, readable route slugs |
| 6 | Semantic Tags | ✅ header/nav/main/section/footer used |
| 7 | Internal Linking | ✅ Nav+Footer link all pages (content links weak) |
| 8 | JSON-LD Structured Data | ❌ None anywhere |
| 9 | robots.txt | ⚠️ Exists but missing sitemap line + disallows |
| 10 | sitemap.xml | ❌ Missing |
| 11 | Speed & Mobile | ⚠️ Good base, but font/image/split improvements needed |

---

## 1. Title Tag

**Current code** — `pizza-ride01-main/artifacts/pizza-ride/index.html` line 6:

```html
<title>Pizza Ride</title>
```

**Analysis:** This single title is served for **every** route (SPA shell). It is
only 10 characters, contains no keywords, no location, and gives Google no clue
what the page is about. Every page ranks as "Pizza Ride".

**Fix — 1a. Optimized default title:**

```html
<title>Pizza Ride — Fast Pizza Delivery in Samalkha | Order Online</title>
```

**Fix — 1b. Unique per-page titles** (best done with `react-helmet-async`, see
point 8 section on SPA). Recommended titles:

| Route | Title |
|-------|-------|
| `/` | `Pizza Ride — Fast Pizza Delivery & Online Ordering in Samalkha` |
| `/menu` | `Our Menu — Pizzas, Burgers, Shakes & More | Pizza Ride` |
| `/why-us` | `Why Choose Us — Fresh Ingredients & Fast Delivery | Pizza Ride` |
| `/gallery` | `Gallery — See Our Delicious Pizzas | Pizza Ride` |
| `/location` | `Find Us — Store Location, Hours & Contact | Pizza Ride` |

Keep titles 50–60 characters so Google doesn't truncate.

---

## 2. Meta Description

**Current code** — `index.html` lines 7, 10, 14:

```html
<meta name="description" content="Pizza Ride — built on Replit. Update this description to reflect the app." />
```

**Analysis:** This is the default Replit boilerplate and is **visible in Google
search results** — it says "built on Replit", looks unprofessional, and kills
click-through rate. It has zero keywords and no value proposition.

**Fix — optimized 155-character description (Home):**

```html
<meta name="description" content="Order hot, fresh pizzas delivered in 30 minutes in Samalkha. 100% veg menu, wood-fired crusts, free college delivery. Order online at Pizza Ride." />
```

(Count = 154 characters.)

**Per-page descriptions** (120–160 chars):

```html
<!-- Menu -->
<meta name="description" content="Explore the full Pizza Ride menu — wood-fired pizzas from ₹59, burgers, shakes, pasta & more. Order online for fast delivery in Samalkha." />

<!-- Why Us -->
<meta name="description" content="Fresh ingredients, bold flavors, and lightning-fast delivery. 500+ happy customers in Samalkha. See why locals choose Pizza Ride." />

<!-- Gallery -->
<meta name="description" content="From the fiery oven to the perfect cheese pull — see the mouth-watering pizzas, burgers and shakes at Pizza Ride, Samalkha." />

<!-- Location -->
<meta name="description" content="Visit Pizza Ride at 6279+3QG, Jurasi Saraf Khas, Haryana. Open Mon–Sun 12 PM–12 AM. Call +91 72068 87688 for delivery or pickup." />
```

**Also update** the `og:description` (line 10) and `twitter:description`
(line 14) to match — they both still contain the placeholder text.

---

## 3. Heading Hierarchy

**Scan result — no `<h1>` exists on any main page:**

| File | Headings found | Has H1? |
|------|----------------|---------|
| `src/components/Hero.tsx` | Big title is a `<div>` (lines 107–151) | ❌ |
| `src/components/Features.tsx` | `<h2>` "Why Choose Us", `<h3>`, `<h4>` | ❌ |
| `src/components/Menu.tsx` | `<h2>` "Our Menu", `<h3>`, `<h4>`, `<h5>` | ❌ |
| `src/components/Gallery.tsx` | `<h2>` "The Vibe", `<h3>` | ❌ |
| `src/components/LocationContact.tsx` | `<h2>` "Find Us", `<h3>`, `<h4>` | ❌ |
| `src/pages/not-found.tsx` | `<h1>` "404 Page Not Found" | ✅ (only this page) |

**Analysis:** The biggest hero headline on the site is a **`<div>`**, not a
heading — search engines cannot tell what the page is about. Nesting *within*
components is otherwise correct (`h2 > h3 > h4`). Missing: one `h1` per page.

**Fix 3a — Hero title → `<h1>`** (`Hero.tsx`, line 107):

```tsx
{/* Before */}
<div className="text-5xl md:text-7xl font-display font-black leading-[1.05] text-foreground">

{/* After */}
<h1 className="text-5xl md:text-7xl font-display font-black leading-[1.05] text-foreground">
  ...words...
</h1>
```
(close with `</h1>` instead of `</div>` at the end of the two line blocks)

**Fix 3b — Add an `<h1>` on the other pages.** Quickest approach: change the
existing top `<h3>` → `<h1>` on each sub-page so the hierarchy becomes
`h1 > h2 > ...`:

- `Menu.tsx` line 304: `<h3 className="text-4xl md:text-5xl ...">Fast. Fresh. Delicious.</h3>` → `<h1>`
- `Features.tsx` line 101: `<h3>Not Your Average Pizza Joint.</h3>` → `<h1>`
- `Gallery.tsx` line 46: `<h3>Catch the Pizza Ride Energy.</h3>` → `<h1>`
- `LocationContact.tsx` line 81: `<h3>Drop By or Get It Delivered.</h3>` → `<h1>`

> Rule: exactly **one `h1`** per page, keep it keyword-rich ("Pizza", "Delivery",
> "Samalkha").

---

## 4. Alt Text

**Scan result — good news: every `<img>` already has an `alt` attribute:**

| File | Example `alt` |
|------|---------------|
| `Hero.tsx:250` | `alt="Delicious Pizza"` |
| `Navbar.tsx:53` | `alt="Pizza Ride logo"` |
| `Features.tsx:53-55` | `alt="Fresh Pizza" / "Juicy Burger" / "Creamy Shake"` |
| `Menu.tsx:236` (ItemCard) | `alt={item.name}` (e.g. "Farm House") |
| `Gallery.tsx:95` | `alt={photo.alt}` |
| `ChatBot.tsx:337,362,381,395` | `alt="Chat" / "PizzaBot"` |

**Improvement:** make the alt text **descriptive + keyword-relevant** instead of
just the item name. In `Menu.tsx` ItemCard (line 236) change:

```tsx
{/* Before */}
<motion.img src={item.image} alt={item.name} loading="lazy" ... />

{/* After */}
<motion.img
  src={item.image}
  alt={`${item.name} — ${item.description} at Pizza Ride Samalkha`}
  loading="lazy"
  ...
/>
```

Similarly upgrade:
- Hero: `alt="Hot wood-fired pizza with melted cheese — Pizza Ride Samalkha"`
- Gallery/Features photos: `alt="Cheesy farmhouse pizza at Pizza Ride Samalkha"` etc.

---

## 5. Clean URLs

**Current routing** — `src/App.tsx` lines 17–24:

```tsx
<Route path="/" component={Home} />
<Route path="/menu" component={MenuPage} />
<Route path="/why-us" component={WhyUs} />
<Route path="/gallery" component={GalleryPage} />
<Route path="/location" component={LocationPage} />
```

**Analysis:** URLs are already **clean, short, readable slugs** — no query
strings, no IDs. ✅ This is exactly right for SEO.

**Suggested additions:**

```tsx
{/* Optional alias routes for higher-intent keywords */}
<Route path="/order-online" component={MenuPage} />
<Route path="/contact" component={LocationPage} />
<Route path="/about" component={WhyUs} />
```

Keep the canonical hrefs pointing to the primary slug via the canonical tag
(point 8 SPA section). Avoid nested dynamic paths like `/menu/pizza/123` unless
backend pages exist.

---

## 6. Semantic Tags

**Scan result — the app already uses semantic elements:**

| File | Elements |
|------|---------|
| `Navbar.tsx:27` | `<header>` + `<nav>` + `<main>` is in PageLayout |
| `PageLayout.tsx:8-10` | `<main>{children}</main>` |
| `Footer.tsx:16` | `<footer>` |
| `Hero.tsx:33` | `<section>` |
| `Features.tsx:32` | `<section id="why-us">` |
| `Menu.tsx:285` | `<section id="menu">` |
| `Gallery.tsx:24` | `<section id="gallery">` |
| `LocationContact.tsx:66` | `<section id="location">` |

**Analysis:** Excellent semantic structure already. ✅

**Minor refactors:**
1. `not-found.tsx` uses generic `<div>` — wrap content in `<main>`:
   ```tsx
   <main className="min-h-screen w-full flex items-center justify-center bg-gray-50">
   ```
2. Each `Menu.tsx` `ItemCard` is a self-contained item — promote to `<article>`:
   ```tsx
   {/* ItemCard return: change motion.div → motion.article */}
   <motion.article ... >...</motion.article>
   ```

---

## 7. Internal Linking

**Current links:**
- `Navbar.tsx` (lines 18–24, 128–139): links to all 5 routes — ✅
- `Footer.tsx` (lines 69–90): Quick Links to all pages — ✅
- `Hero.tsx:170` "View Menu" → `/menu` — ✅
- `Features.tsx:109` "Taste the Difference" → `/menu` — ✅

**Gaps / opportunities:**
1. **No in-content link to `/location`** anywhere except Nav/Footer. On the Home
   Hero, add a secondary CTA:
   ```tsx
   <motion.a href="/location" className="...">Get Directions →</motion.a>
   ```
2. **ChatBot quick chips** already point users to menu — add a "Call us" wrap:
   "Order karna hai? Call **+91 72068 87688** ya [Menu](/menu) dekho."
3. **Dead placeholder links in `Footer.tsx`** (lines 104–107): Privacy,
   Terms, Refund all point to `#` and social icons (line 45) point to `#`.
   Point them to real pages/profiles, or remove them (broken links hurt SEO).
4. **Breadcrumbs** — add a "Home › Menu" breadcrumb on `/menu` for crawl depth.

---

## 8. JSON-LD Structured Data

**Current state:** ❌ Zero structured data anywhere in the project (no
`application/ld+json`, no microdata).

**Fix — add Restaurant schema** to `index.html` in the `<head>` (data taken from
`src/components/LocationContact.tsx` lines 6–49):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Pizza Ride",
  "image": "https://pizza-ride01-main.vercel.app/images/og-pizza-ride.jpg",
  "url": "https://pizza-ride01-main.vercel.app/",
  "telephone": "+91-72068-87688",
  "priceRange": "₹₹",
  "servesCuisine": ["Pizza", "Burgers", "Sandwiches", "Pasta", "Shakes", "Fast Food"],
  "menu": "https://pizza-ride01-main.vercel.app/menu",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "6279+3QG, Jurasi Saraf Khas",
    "addressLocality": "Haryana",
    "addressCountry": "IN"
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "12:00",
    "closes": "00:00"
  }],
  "acceptsReservations": "False",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "500"
  }
}
</script>
```

> **Note on ratings:** the site claims "500+ happy customers in Samalkha"
> (`Hero.tsx:217`, `Features.tsx:25`). Only include `aggregateRating` once you
> have real reviews from a verified source (Google reviews), otherwise Google
> may flag it. If you don't have reviews yet, remove the `aggregateRating` block.

**Also add `WebSite` schema** for sitelinks searchbox:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Pizza Ride",
  "url": "https://pizza-ride01-main.vercel.app/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://pizza-ride01-main.vercel.app/menu?search={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

**SPA / structured-data note:** because this is a single-page app, `index.html`
metadata (title, description, JSON-LD) is shared across all routes. The
**recommended long-term fix** is `react-helmet-async` for per-route metadata:

```bash
pnpm add react-helmet-async
```

```tsx
import { Helmet } from 'react-helmet-async';

export default function MenuPage() {
  return (
    <>
      <Helmet>
        <title>Our Menu — Pizzas, Burgers, Shakes & More | Pizza Ride</title>
        <meta name="description" content="Explore the full Pizza Ride menu..." />
        <link rel="canonical" href="https://pizza-ride01-main.vercel.app/menu" />
        <script type="application/ld+json">{JSON.stringify(menuSchema)}</script>
      </Helmet>
      <PageLayout>...</PageLayout>
    </>
  );
}
```

Wrap `<App>` with `<HelmetProvider>` in `src/main.tsx`.

---

## 9. robots.txt

**Current file** — `pizza-ride01-main/artifacts/pizza-ride/public/robots.txt`:

```txt
User-agent: *
Allow: /
```

**Analysis:** File exists ✅ but is minimal — no sitemap reference, no
protection for API/internal paths.

**Fix — replace the content:**

```txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /images/robot.png

Sitemap: https://pizza-ride01-main.vercel.app/sitemap.xml
```

(`public/` is copied to the build root by Vite, so the served URL is
`/robots.txt`.)

---

## 10. sitemap.xml

**Current state:** ❌ No file matches `**/sitemap*` anywhere in the project.
Search engines can't discover the sub-pages easily.

**Fix — create `pizza-ride01-main/artifacts/pizza-ride/public/sitemap.xml`:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://pizza-ride01-main.vercel.app/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://pizza-ride01-main.vercel.app/menu</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://pizza-ride01-main.vercel.app/why-us</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://pizza-ride01-main.vercel.app/gallery</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://pizza-ride01-main.vercel.app/location</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

Then submit it in **Google Search Console** → Sitemaps, and
**Bing Webmaster Tools**. Replace `pizza-ride01-main.vercel.app` with your
custom domain once you buy one.

---

## 11. Speed & Mobile Responsiveness

### 11.1 Image size & format

**Current state:** ~90 images bundled in `src/assets/` (plus 55+ raw masters in
`attached_assets/`). Mostly `.jpg`, with a few `.avif`/`.webp`
(e.g. `feature-pizza.avif`, `feature-burger.webp`, `gallery-pizza.avif`).

**Fix:**
- Convert the remaining `.jpg`/`.png` menu images to **WebP or AVIF**.
- Target **< 200 KB per image**; the hero + menu cards matter most.
- Reserved in the layout via `aspect-[4/3]` — add explicit `width`/`height`
  attributes to prevent layout shift (CLS) where possible.

### 11.2 Lazy loading

**Scan result:**

| File | `loading="lazy"`? |
|------|------------------|
| `Menu.tsx:237` (item images) | ✅ |
| `Gallery.tsx:96` | ✅ |
| `LocationContact.tsx:158` (map iframe) | ✅ |
| `Features.tsx:55` | ✅ |
| `Hero.tsx:248` (hero image) | ❌ — intentionally not lazy (it's the LCP); **correct**, add `fetchpriority="high"` instead |

**Fix for hero (LCP):**

```tsx
<motion.img
  src={heroImg}
  alt="Hot wood-fired pizza with melted cheese — Pizza Ride Samalkha"
  fetchPriority="high"
  ...
/>
```

### 11.3 Fonts (render-blocking)

**Current code** — `src/index.css` line 1 loads two font families via CSS
`@import`, which blocks rendering:

```css
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Outfit:wght@300;400;500;600;700&display=swap');
```

**Fix:** move the font load to `index.html` with `preconnect` + `display=swap`
(removes the blocking CSS import and gets faster render):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

### 11.4 Code splitting

**Current state:** single bundle — all page components are statically imported
in `App.tsx` (lines 6–10); no `React.lazy`.

**Fix — route-level lazy loading (small win, easy):**

```tsx
import { lazy, Suspense } from 'react';

const MenuPage = lazy(() => import('@/pages/MenuPage'));
const WhyUs = lazy(() => import('@/pages/WhyUs'));
const GalleryPage = lazy(() => import('@/pages/GalleryPage'));
const LocationPage = lazy(() => import('@/pages/LocationPage'));
```

Wrap routes in `<Suspense fallback={null}>`.

### 11.5 Mobile responsiveness

**Status: mostly done ✅.** Previous pass already fixed:
- `index.html` viewport: `width=device-width, initial-scale=1.0` (zoom enabled ✅)
- `overflow-x-hidden` on `body` and `PageLayout` (no horizontal scroll ✅)
- ChatBot FAB + window scale down on mobile ✅
- Hero blobs responsive, badges no longer clipped ✅
- Map `min-h-[280px] sm:min-h-[400px]`, subscribe form stacks on mobile ✅
- Menu grid `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5` ✅

**Remaining checks:**
- Run the [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
  and a Lighthouse audit on the live URL.
- Verify tap targets ≥ 48×48px on the ChatBot quick chips and menu cards.
- Body text base size is `text-sm` on several cards — consider `text-base` on
  mobile for readability (≥16px).

---

## Priority — What To Fix First

| Priority | Fix | Effort |
|----------|-----|--------|
| 🔴 1 | Meta description + title (remove "built on Replit") | 5 min |
| 🔴 2 | Add `<h1>` on all pages (Hero div → h1) | 15 min |
| 🔴 3 | Create `sitemap.xml` + update `robots.txt` | 15 min |
| 🔴 4 | Add Restaurant + WebSite JSON-LD to `index.html` | 20 min |
| 🟡 5 | Improve alt texts (keyword-rich) | 30 min |
| 🟡 6 | Move fonts to `index.html` with preconnect + swap | 15 min |
| 🟡 7 | Add canonical tags + per-page meta via `react-helmet-async` | 1–2 hrs |
| 🟢 8 | Route-level code splitting (`React.lazy`) | 30 min |
| 🟢 9 | Convert heavy JPGs to WebP/AVIF | 1–2 hrs |
| 🟢 10 | Fix dead `#` links in Footer (privacy/terms/social) | 20 min |

---

> **Bottom line:** The site already has clean URLs, semantic tags, good alt
> text and solid mobile responsiveness. The biggest losses are: placeholder
> meta text, **zero `<h1>` tags**, **no structured data**, **no sitemap**, and
> render-blocking fonts. Fixing items 1–4 above takes under an hour and will
> make the biggest difference to how Google understands and displays Pizza Ride.