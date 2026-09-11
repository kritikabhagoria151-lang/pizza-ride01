# Pizza Ride — SEO Audit & Improvement Plan

> Audit based on the **actual code** in this project (`pizza-ride01-main/artifacts/pizza-ride`).
> Current live URL: `https://pizza-ride01-main.vercel.app`
> Business: Pizza Ride — Samalkha, Haryana, India (100% veg pizza & fast-food delivery)

## 🎯 Focus Keyword: "Pizza Ride"

**Goal:** jab koi browser mein `pizza ride` (aur uske common combinations) search
kare, toh Pizza Ride ki website zahir ho.

> ⚠️ **Honest note:** koi single meta tag se Google mein **guaranteed #1 rank** 
> guarantee nahi de sakta. Ranking Google ke algorithm decide karta hai (content,
> backlinks, Google indexing, competitors). Lekin niche di gayi "Pizza Ride"
> keyword strategy se rank karne ki **possibility sabse zyada** ho jati hai.

### Search variations hume target karne hain (primary keyword = **Pizza Ride**)

| Search query (log kya type karte hain) | Intent |
|----------------------------------------|--------|
| `pizza ride` | Brand |
| `pizza ride samalkha` | Local |
| `pizza ride samalkha menu` | Local + menu |
| `pizza ride menu` | Menu |
| `pizza in samalkha` | Local delivery |
| `pizza delivery samalkha` | Local delivery |
| `vegetarian pizza near me` | Nearby + veg |
| `pizza shop samalkha haryana` | Local shop |

### "Pizza Ride" keyword hook kahaan-kahaan lagna chahiye

| # | Location | Exact suggestion |
|---|----------|------------------|
| 1 | `<title>` (Home) | `Pizza Ride — Pizza Delivery in Samalkha | Order Online` |
| 2 | Meta description | `"Pizza Ride"` ko 1 baar, naturally phrase mein |
| 3 | JSON-LD `name`/`menu` | `"name": "Pizza Ride"` pehle se set hai ✅ |
| 4 | `<h1>` Home (Hero) | Baad wala line "Pizza Ride" ho (abhi `pizza` + emoji text hai) |
| 5 | `<h2>/<h3>` headings | `Menu.tsx` "Our Menu" + `h2/h3` mein burger/shake also |
| 6 | Alt text on images | `"Pizza Ride Special pizza"`, `"Pizza Ride Samalkha menu"` |
| 7 | sitemap URL / canonical | `https://pizza-ride01-main.vercel.app/` (domain mein hi "pizza-ride" hai ✅) |
| 8 | Google Business Profile (OFFSITE) | Naam: `Pizza Ride` — donc consistent na rakhe |
| 9 | Footer content | Company Naam `Pizza Ride` har internal page pe same ✅ |
| 10 | `<h1>` Menu page | `Our Menu — Pizza Ride Samalkha` type |

### Sabse important 3 ke insane (kyunki brand keyword hai):

1. **`pizza ride`** = brand naam — ise **consistently** har jagah same spelling
   (`Pizza Ride`, alag-alag spelling NO: "PizzaRide", "pizza ridee").
2. Google Business Profile + Maps listing naam bhi `Pizza Ride` — local search
   ka #1 signal.
3. Content mein phrase as a **real sentence** use karo, keyword-stuffing mat
   karo (Google penalise karta hai).

---

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

**Title tag — index.html line 6:**

```html
<title>Pizza Ride</title>
```

Per-page title bhi sirf `Pizza Ride`:

| Route | Title |
|-------|-------|
| `/` | `Pizza Ride` |
| `/menu` | `Pizza Ride` |
| `/why-us` | `Pizza Ride` |
| `/gallery` | `Pizza Ride` |
| `/location` | `Pizza Ride` |

---

## 2. Meta Description

**Meta description — index.html lines 7, 10, 14:**

```html
<meta name="description" content="Craving pizza? Pizza Ride delivers hot, fresh pizza straight to you in minutes. Browse our menu, pick your favorites, and we'll handle the rest!" />
```

(Count = 154 characters — Google limit 160 ke andar ✅)

---

## 3. Heading Hierarchy

**Heading structure:**

```html
<body>
  <h1>Pizza Ride...</h1>
  <h2>Our Menu</h2>
  <h3>Veg Pizzas</h3>
</body>
```

---

## 4. Alt Text

**All images + alt texts:**

```html
<img src="logo.png" alt="Pizza Ride Logo — Two friends enjoying pizza and cold drink, Fast Fresh Delicious, Samalkha" />
<img src="favicon.png" alt="Pizza Ride small logo icon" />

<!-- ROW 1 -->
<img src="farm-house-pizza.jpg" alt="Farm House Pizza with Onion Capsicum Corn and Mushroom — Pizza Ride Samalkha, Bestseller, starting from ₹160" />
<img src="tandoori-paneer-pizza.jpg" alt="Tandoori Paneer Pizza with Onion Paneer and Red Paprika — Pizza Ride Samalkha, starting from ₹160" />
<img src="zesty-tangy-pizza.jpg" alt="Zesty Tangy Pizza with Onion Corn and Paneer — Pizza Ride Samalkha, starting from ₹160" />
<img src="makhani-pizza.jpg" alt="Makhani Pizza with Makhani Sauce Capsicum and Paneer — Pizza Ride Samalkha, Local Favourite, starting from ₹160" />
<img src="classical-pizza.jpg" alt="Classical Pizza with Onion Capsicum Corn Mushroom and Paneer — Pizza Ride Samalkha, starting from ₹210" />

<!-- ROW 2 -->
<img src="spicy-paneer-pizza.jpg" alt="Spicy Paneer Pizza with Onion Paneer and Red Paprika — Pizza Ride Samalkha, Spicy, starting from ₹210" />
<img src="delight-extra-cheese-pizza.jpg" alt="Delight Extra Cheese Pizza with Capsicum Mushroom and Jalapeno — Pizza Ride Samalkha, starting from ₹210" />
<img src="tikki-crush-pizza.jpg" alt="Tikki Crush Pizza with Mushroom Jalapeno Paneer Red Paprika and Tikki Crush — Pizza Ride Samalkha, Must Try, starting from ₹210" />
<img src="tomato-pizza.jpg" alt="Tomato Pizza with single topping fresh tomato — Pizza Ride Samalkha, only ₹59" />
<img src="onion-pizza.jpg" alt="Onion Pizza with single topping golden onion — Pizza Ride Samalkha" />

<!-- ROW 1 -->
<img src="capsicum-pizza.jpg" alt="Capsicum Pizza with single topping crisp capsicum — Pizza Ride Samalkha, only ₹70" />
<img src="corn-pizza.jpg" alt="Corn Pizza with single topping sweet corn — Pizza Ride Samalkha, only ₹80" />
<img src="onion-corn-pizza.jpg" alt="Onion and Corn Pizza double topping — Pizza Ride Samalkha, only ₹90" />
<img src="onion-capsicum-pizza.jpg" alt="Onion and Capsicum Pizza double topping — Pizza Ride Samalkha, only ₹90" />
<img src="onion-paneer-pizza.jpg" alt="Onion and Paneer Pizza double topping — Pizza Ride Samalkha, only ₹100" />

<!-- ROW 2 -->
<img src="corn-paneer-pizza.jpg" alt="Corn and Paneer Pizza double topping with stretchy cheese — Pizza Ride Samalkha, only ₹100" />
<img src="paneer-corn-pizza.jpg" alt="Paneer and Corn Pizza double topping with fresh herbs — Pizza Ride Samalkha, only ₹100" />
<img src="single-cheese-pizza.jpg" alt="Single Cheese Pizza veg treat with all veggies and single cheese — Pizza Ride Samalkha, only ₹110" />
<img src="cheese-corn-pizza.jpg" alt="Cheese and Corn Pizza veg treat with all veggies cheese and corn — Pizza Ride Samalkha, only ₹130" />
<img src="double-cheese-pizza.jpg" alt="Double Cheese Pizza veg treat with all veggies and double cheese — Pizza Ride Samalkha" />

<img src="pizza-ride-special.jpg" alt="Pizza Ride Special Signature Pizza with all veggies and loaded cheese — Pizza Ride Samalkha, starting from ₹259" />

<img src="allo-tikki-burger.jpg" alt="Allo Tikki Burger with crispy spiced potato tikki patty and fresh veggies — Pizza Ride Samalkha, Budget Pick, only ₹40" />
<img src="veggi-burger.jpg" alt="Veggi Burger with classic veggie patty and fresh toppings — Pizza Ride Samalkha, only ₹50" />
<img src="cheese-spicy-burger.jpg" alt="Cheese Spicy Burger with spicy patty loaded with gooey cheese — Pizza Ride Samalkha, only ₹70" />
<img src="paneer-burger.jpg" alt="Paneer Burger with juicy paneer patty and mint mayo — Pizza Ride Samalkha, only ₹70" />
<img src="jumbo-burger.jpg" alt="Jumbo Burger with double patty extra cheese fully loaded — Pizza Ride Samalkha, Bestseller, only ₹99" />

<img src="veg-grill-sandwich.jpg" alt="Veg Grill Sandwich with fresh vegetables grilled — Pizza Ride Samalkha, only ₹70" />
<img src="spicy-paneer-sandwich.jpg" alt="Spicy Paneer Sandwich with paneer and spicy filling — Pizza Ride Samalkha, only ₹90" />
<img src="cheese-grill-sandwich.jpg" alt="Cheese Grill Sandwich with melted cheese grilled bread — Pizza Ride Samalkha, only ₹90" />

<img src="allo-tikki-wrap.jpg" alt="Allo Tikki Wrap with spiced potato tikki in soft wrap with chutneys — Pizza Ride Samalkha, only ₹60" />
<img src="cheese-spicy-wrap.jpg" alt="Cheese Spicy Wrap with spicy filling and melted cheese in fresh wrap — Pizza Ride Samalkha, only ₹90" />
<img src="paneer-wrap.jpg" alt="Paneer Wrap with soft paneer mint chutney onions and veggies — Pizza Ride Samalkha, only ₹110" />

<img src="red-sauce-pasta.jpg" alt="Red Sauce Pasta penne in rich spiced tomato red sauce — Pizza Ride Samalkha, only ₹109" />
<img src="white-sauce-pasta.jpg" alt="White Sauce Pasta creamy bechamel white sauce pasta — Pizza Ride Samalkha, only ₹109" />
<img src="tandoori-sauce-pasta.jpg" alt="Tandoori Sauce Pasta smoky tandoori flavoured sauce pasta — Pizza Ride Samalkha, Chefs Pick, only ₹119" />
<img src="makhani-sauce-pasta.jpg" alt="Makhani Sauce Pasta rich makhani sauce buttery and aromatic — Pizza Ride Samalkha, only ₹119" />
<img src="mix-sauce-pasta.jpg" alt="Mix Sauce Pasta best of all sauces mixed together — Pizza Ride Samalkha, Loaded, only ₹149" />

<img src="plain-garlic-bread.jpg" alt="Plain Garlic Bread soft bread with garlic butter — Pizza Ride Samalkha, only ₹81" />
<img src="veg-loaded-garlic-bread.jpg" alt="Veg Loaded Garlic Bread with veg filling and melted cheese — Pizza Ride Samalkha, Must Try, only ₹110" />
<img src="laden-garlic-bread.jpg" alt="Laden Garlic Bread generously loaded with extra toppings — Pizza Ride Samalkha, only ₹120" />

<img src="strawberry-shake.jpg" alt="Strawberry Shake thick creamy strawberry milkshake with whipped cream — Pizza Ride Samalkha, only ₹90" />
<img src="butterscotch-shake.jpg" alt="Butterscotch Shake rich butterscotch milkshake with caramel topping — Pizza Ride Samalkha, only ₹90" />
<img src="vanilla-shake.jpg" alt="Vanilla Shake classic smooth vanilla milkshake — Pizza Ride Samalkha, only ₹90" />
<img src="choco-oreo-shake.jpg" alt="Choco Oreo Shake crushed Oreos blended in chocolate shake — Pizza Ride Samalkha, Fan Favourite, only ₹90" />
<img src="black-current-shake.jpg" alt="Black Current Shake refreshing black currant flavoured milkshake — Pizza Ride Samalkha, only ₹90" />
<img src="cold-coffee.jpg" alt="Cold Coffee chilled creamy cold coffee blended to perfection — Pizza Ride Samalkha, only ₹120" />
<img src="soft-drink.jpg" alt="Soft Drink chilled Pepsi 7Up Mirinda and more — Pizza Ride Samalkha, only ₹30" />

<!-- ROW 1 -->
<img src="salted-fries.jpg" alt="Salted Fries golden crispy fries with sea salt — Pizza Ride Samalkha, only ₹65" />
<img src="peri-peri-fries.jpg" alt="Peri Peri Fries tossed in bold peri peri spice — Pizza Ride Samalkha, only ₹69" />
<img src="masala-fries.jpg" alt="Masala Fries dusted with chaat masala — Pizza Ride Samalkha, only ₹69" />
<img src="cheese-peri-peri-fries.jpg" alt="Cheese Peri Peri Fries peri peri fries topped with cheese sauce — Pizza Ride Samalkha, Popular, only ₹99" />
<img src="veg-pocket.jpg" alt="Veg Pocket crispy pocket filled with spiced veggies — Pizza Ride Samalkha, only ₹59" />

<!-- ROW 2 -->
<img src="paneer-pocket.jpg" alt="Paneer Pocket crispy pocket with gooey paneer filling — Pizza Ride Samalkha, only ₹89" />
<img src="cheese-dip.jpg" alt="Cheese Dip creamy cheese dipping sauce — Pizza Ride Samalkha, only ₹30" />
<img src="spice-dip.jpg" alt="Spice Dip spicy tangy dipping sauce — Pizza Ride Samalkha, only ₹30" />
<img src="tandoori-dip.jpg" alt="Tandoori Dip smoky tandoori dipping sauce — Pizza Ride Samalkha, only ₹30" />
<img src="chilly-dip.jpg" alt="Chilly Dip hot chilly sauce dip — Pizza Ride Samalkha, only ₹30" />
<img src="paneer-salad.jpg" alt="Paneer Salad fresh salad with paneer onion cucumber tomato and veggies — Pizza Ride Samalkha, only ₹100" />

<img src="pizza-ride-outlet-front.jpg" alt="Pizza Ride restaurant outlet front view with Grill Point signboard on NH-44 Samalkha, contact 7206887688" />
<img src="pizza-ride-outlet-side.jpg" alt="Pizza Ride restaurant side view with bright red and yellow signboard Samalkha NH-44, contact 7206887688" />
<img src="pizza-ride-outlet-close.jpg" alt="Pizza Ride restaurant closeup of signboard with logo on NH-44 Samalkha, contact 7206887688" />
```

---

## 5. Clean URLs

**Pizza Ride URLs (clean, short, readable — no query strings, no IDs ✅):**

| Page | URL |
|------|-----|
| Home | `https://pizza-ride01-main.vercel.app/` |
| Menu | `https://pizza-ride01-main.vercel.app/menu` |
| Why Us | `https://pizza-ride01-main.vercel.app/why-us` |
| Gallery | `https://pizza-ride01-main.vercel.app/gallery` |
| Location | `https://pizza-ride01-main.vercel.app/location` |

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

**Kaunsa tag kya karta hai:**

| Tag | Matlab |
|-----|--------|
| `<nav>` | Navigation/menu hai — Google samajhta hai ki ye site ke links hain |
| `<header>` | Page ka upar wala hissa hai — logo, menu, banner |
| `<footer>` | Page ka neeche wala hissa hai — contact, links, copyright |
| `<main>` | Page ka main content hai — ye sabse important hai |
| `<section>` | Content ka ek alag section hai — menu, gallery, location |
| `<article>` | Independent content hai — jaise koi blog post |

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
2. **Dead placeholder links in `Footer.tsx`** (lines 104–107): Privacy,
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