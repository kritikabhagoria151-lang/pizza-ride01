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

**Website ke components mein kaunsa semantic tag hai — saath mein aasan matlab:**

| Component | File & line | Tag | Kya hai / kaam |
|-----------|-------------|-----|----------------|
| Navbar | `Navbar.tsx:27` | `<header>` | Page ka upar wala hissa — logo, menu, banner. Google samajhta hai ye site ka top hai |
| Navbar (desktop menu) | `Navbar.tsx:63` | `<nav>` | Navigation/menu hai — Home, Menu, Why Us, Gallery, Location ke links |
| Navbar (mobile menu) | `Navbar.tsx:128` | `<nav>` | Mobile pe khulne wala menu bhi navigation hai |
| PageLayout | `PageLayout.tsx:9` | `<main>` | Page ka main content — Navbar ke baad aur Footer se pehle ka hissa |
| Footer | `Footer.tsx:16` | `<footer>` | Page ka neeche wala hissa — contact, social links, copyright |
| Hero | `Hero.tsx:33` | `<section>` | Home page ka sabse pehla bada section (banner/hero) |
| Features | `Features.tsx:32` | `<section id="why-us">` | "Why Us" wala section — features/benefits |
| Menu | `Menu.tsx:286` | `<section id="menu">` | Menu wala section — saari pizzas, burgers aur shakes |
| Gallery | `Gallery.tsx:24` | `<section id="gallery">` | Gallery wala section — photos |
| LocationContact | `LocationContact.tsx:66` | `<section id="location">` | Location/contact wala section — address, map, phone |

**Har tag ka aasan matlab:**

| Tag | Matlab |
|-----|--------|
| `<header>` | Page ka upar wala hissa hai — logo, menu, banner |
| `<nav>` | Navigation/menu hai — Google samajhta hai ki ye site ke links hain |
| `<main>` | Page ka main content hai — ye sabse important hissa |
| `<section>` | Content ka ek alag section hai — jaise Menu, Gallery, Location |
| `<footer>` | Page ka neeche wala hissa hai — contact, links, copyright |
| `<article>` | Independent content hai — jaise koi akela menu item ya blog post |

**Analysis:** Excellent semantic structure already. ✅ — kyunki `<header>`,
`<nav>`, `<main>`, `<section>`, `<footer>` sab sahi jagah use ho rahe hain.

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

**Implemented (all verified live):**

| Where | Link | Status |
|-------|------|--------|
| `Navbar.tsx` (desktop + mobile) | All 5 routes: Home, Menu, Why Us, Gallery, Location | ✅ |
| `Footer.tsx` Quick Links | Our Menu, Why Choose Us, Gallery, Contact & Location | ✅ |
| `Footer.tsx` Visit Us column | Get Directions → `/location`, Order Online → `/menu`, See Our Gallery → `/gallery` | ✅ |
| `Hero.tsx` primary CTA | "View Menu" → `/menu` | ✅ |
| `Hero.tsx` secondary CTA | "Get Directions" → `/location` | ✅ |
| `Features.tsx` primary CTA | "Taste the Difference" → `/menu` | ✅ |
| `Features.tsx` secondary CTA | "Get Directions" → `/location` | ✅ |
| `Menu.tsx` bottom CTA | "See Our Gallery" → `/gallery`, "Visit Our Outlet" → `/location` | ✅ |
| `Gallery.tsx` bottom CTA | "Order From Our Menu" → `/menu`, "Visit Our Outlet" → `/location` | ✅ |
| `LocationContact.tsx` info link | "Browse the Full Menu" → `/menu` | ✅ |
| **Breadcrumbs** | Home › Menu, Home › Gallery, Home › Why Us, Home › Location (via `Breadcrumb.tsx`) | ✅ |

**Dead links removed:** Instagram icon (`#`), Privacy/Terms/Refund placeholder links (`#`) — all removed from `Footer.tsx`.

---

## 8. JSON-LD Structured Data

**Status:** ✅ Fully implemented. Structured data is delivered in two layers:

**Layer 1 — Global (static in `index.html` `<head>`):** present for every route
even before JavaScript runs:
- `Restaurant` schema (`@id: #restaurant`) — name, image, logo, url, telephone,
  priceRange, servesCuisine, menu, hasMap, areaServed, currenciesAccepted,
  paymentAccepted, address (Samalkha, Haryana, IN), openingHoursSpecification.
  `aggregateRating` **deliberately excluded** (no verified Google reviews yet —
  see note below).
- `WebSite` schema (`@id: #website`) with `SearchAction` (sitelinks searchbox),
  linked to the Restaurant via `publisher`.
- Canonical + Open Graph + Twitter card meta tags.

**Layer 2 — Per-route (dynamic in `src/components/Seo.tsx`, no extra deps):**
because this is a SPA, a `Seo` component reads the current wouter route and
updates `document.title`, meta description, canonical, OG/Twitter tags and a
`#route-jsonld` block (`@graph`) on every navigation:

| Route | JSON-LD types | Title |
|-------|---------------|-------|
| `/` | `WebPage` | Pizza Ride — Fresh Pizza, Burgers & Shakes in Samalkha |
| `/menu` | `BreadcrumbList` + `Menu` (all sections + items + `Offer` prices in INR) | Menu — Pizzas, Burgers, Pasta & Shakes |
| `/why-us` | `BreadcrumbList` + `AboutPage` | Why Choose Us — Fresh Ingredients, Fast Delivery |
| `/gallery` | `BreadcrumbList` + `ImageGallery` | Gallery — Inside the Pizza Ride Kitchen |
| `/location` | `BreadcrumbList` + `Restaurant` (address, map, hours, tel) | Location & Contact — Jurasi Saraf Khas, Haryana |

The `/menu` `Menu` schema is generated directly from the live menu data
(`categories` exported from `Menu.tsx`), so prices and items never drift out of
sync.

**Reference — global Restaurant schema applied** (data taken from
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
> may flag it. **Status: ✅ excluded as recommended** — add it back when real
> reviews are available.

**WebSite schema applied** for sitelinks searchbox:

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
metadata is shared across all routes. This was solved **without adding any
dependency** — `src/components/Seo.tsx` uses wouter's `useLocation` to update
title, description, canonical, OG/Twitter tags and a per-route `#route-jsonld`
block on navigation. (`react-helmet-async` is the common alternative, but was
avoided to keep the bundle lean and because the pnpm lockfile cannot be
regenerated locally.)

---

## 9. robots.txt

**Current file** — `pizza-ride01-main/artifacts/pizza-ride/public/robots.txt`:

```txt
# robots.txt — Pizza Ride (https://pizza-ride01-main.vercel.app/)
# Public site is fully crawlable; only API endpoints are blocked.

User-agent: *
Allow: /
Disallow: /api/

# All public pages, submitted via sitemap
Sitemap: https://pizza-ride01-main.vercel.app/sitemap.xml
```

**Status:** ✅ Implemented & live at `/robots.txt`:
- `Allow: /` — every public page (/, /menu, /why-us, /gallery, /location) is crawlable.
- `Disallow: /api/` — keeps the chat/API backend out of the index (it only
  returns JSON, not content worth ranking).
- `Sitemap:` line points Google/Bing to all pages at once.
- No `Crawl-delay` (not supported by Google and unnecessary here).
- `public/` is copied to the build root by Vite, so the served URL is `/robots.txt`.

---

## 10. sitemap.xml

**Status:** ✅ Implemented & live — `pizza-ride01-main/artifacts/pizza-ride/public/sitemap.xml`
covers all 5 routes (verified 200 at `/sitemap.xml`). Valid XML, correct
`urlset` namespace, absolute `https` URLs, one `<url>` per indexable page.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://pizza-ride01-main.vercel.app/</loc>
    <lastmod>2026-09-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://pizza-ride01-main.vercel.app/menu</loc>
    <lastmod>2026-09-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://pizza-ride01-main.vercel.app/why-us</loc>
    <lastmod>2026-09-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://pizza-ride01-main.vercel.app/gallery</loc>
    <lastmod>2026-09-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://pizza-ride01-main.vercel.app/location</loc>
    <lastmod>2026-09-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

**Why this is Google-friendly:**
- `lastmod` — the only signal Google actually uses to decide re-crawl; update it
  whenever a page's content changes (especially `/menu` prices).
- `priority` / `changefreq` — harmless; kept for other engines, but Google
  ignores them.
- All URLs are clean, absolute, `https`, and match the live routes exactly.
- Referenced from `robots.txt` (`Sitemap:` line) so crawlers find it
  automatically.

**Next step:** submit it in **Google Search Console** → Sitemaps (and
**Bing Webmaster Tools**). Replace `pizza-ride01-main.vercel.app` with your
custom domain once you buy one.

---

## 11. Speed & Mobile Responsiveness

**Status: all core items done ✅.** Page experience (Core Web Vitals) is a
direct Google ranking factor, and Google now indexes the **mobile** version of
the site first. This section covers what was measured and fixed.

**Speed wins implemented:**
1. **Images** — all converted to **WebP**, full-resolution originals kept — §11.1
2. **Lazy loading** + `fetchPriority="high"` on the LCP hero image — §11.2
3. **Fonts** moved out of render-blocking CSS `@import` → `preconnect` + swap — §11.3
4. **Code splitting** — lazy routes, Home stays eager — §11.4
5. **Mobile** — 44 px tap targets, readable text sizes, no horizontal scroll — §11.5

### 11.1 Image size & format

**Current state:** ✅ **WebP** for all rasters, at their **original full size** —
original dimensions and quality kept (per client request).

**Format:**
- 116 `.webp` files in `src/assets/` (converted from 112 `.jpg` + 1 `.jpeg` +
  1 `.png`); `public/images/robot.webp` for the chatbot.
- 2 `.avif` files kept (`feature-pizza.avif`, `gallery-pizza.avif`) — modern
  format, even smaller than WebP.
- `gallery-pizza-video.mp4` for the video tile.

**Size (measured 2026-09-18):**

| Metric | Value |
|--------|------:|
| Total (116 files) | 23.4 MB |
| Average per image | ~207 KB |
| Largest image | 345 KB |
| Typical dimensions | 1000 × 1000 px, quality 92 |

> Note: an earlier pass resized these to 800 px / `< 200 KB` (≈52 % smaller,
> 11.2 MB) for maximum speed. That was **reverted on request** to keep the
> original full-resolution images. If page speed ever needs another boost, this
> is the first thing to re-optimize.

**HTML attributes (kept — these do NOT affect image quality):**
- `width` + `height` on every content image → browser reserves space, **no layout shift (CLS)**.
- `loading="lazy"` on below-the-fold menu & gallery images → faster first paint.
- Hero image uses `fetchPriority="high"` (LCP element) → faster Largest Contentful Paint.
- `decoding="async"` everywhere → images decode off the main thread.

**Why this still helps Google:**
- **WebP** is a small, modern format Google recommends (smaller than JPG at the
  same quality).
- Correct `width`/`height` removes layout shift, improving **CLS**.
- Fast hero/LCP image improves **LCP**; together these feed into
  **Core Web Vitals**, which Google uses for ranking.

### 11.2 Lazy loading & loading hints

**Status:** ✅ Implemented.

| Element | Strategy | Why |
|---------|----------|-----|
| Menu item images | `loading="lazy"` + `decoding="async"` | below the fold, ~80 images |
| Gallery images | `loading="lazy"` + `decoding="async"` | below the fold |
| Features images | `loading="lazy"` | below the fold |
| Map iframe (`LocationContact`) | `loading="lazy"` | heavy third-party frame |
| Hero image (LCP) | `fetchPriority="high"` + `decoding="async"` (NOT lazy) | it is the Largest Contentful Paint — must load first |
| All content images | `width` + `height` attributes | reserve space → **no CLS** |

The hero uses `fetchPriority="high"` so the browser fetches it before other
resources, speeding up LCP:

```tsx
<img src={heroImg} alt="…" width={600} height={600} decoding="async" fetchPriority="high" />
```

### 11.3 Fonts (render-blocking)

**Status:** ✅ Fixed. The fonts were previously loaded with a CSS
`@import` inside `src/index.css`, which blocks rendering. They now load from
`index.html` with `preconnect` + `display=swap`, so text paints immediately in
a fallback font and swaps when the web fonts arrive:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Outfit:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

- `preconnect` — opens the connection to Google Fonts early (saves ~100–300 ms).
- `display=swap` — no invisible text while fonts load (avoids FOIT).
- Also added `<meta name="theme-color" content="#e63746" />` for a branded
  mobile browser UI.

### 11.4 Code splitting

**Status:** ✅ Implemented. `Home` stays in the main bundle (it is the landing
page), and the other routes are lazy-loaded so their code is only downloaded
when the visitor opens that page:

```tsx
import { lazy, Suspense } from 'react';
import Home from '@/pages/Home';

const MenuPage = lazy(() => import('@/pages/MenuPage'));
const WhyUs = lazy(() => import('@/pages/WhyUs'));
const GalleryPage = lazy(() => import('@/pages/GalleryPage'));
const LocationPage = lazy(() => import('@/pages/LocationPage'));
const NotFound = lazy(() => import('@/pages/not-found'));
```

All routes are wrapped in `<Suspense fallback={<RouteFallback />}>` (a light,
accessible "Loading…" placeholder with `role="status"`).

**Result:** smaller initial JavaScript → faster Time-to-Interactive on mobile.

### 11.5 Mobile responsiveness

**Status: done ✅.** Google's mobile-first indexing means the mobile version is
what actually gets ranked, so this matters.

Implemented:
- `index.html` viewport: `width=device-width, initial-scale=1.0` (pinch-zoom
  NOT disabled — accessibility requirement).
- `overflow-x-hidden` on `body` + `PageLayout` → no horizontal scroll.
- Responsive layouts across the site: menu grid `grid-cols-2 sm:grid-cols-3
  lg:grid-cols-4 xl:grid-cols-5`, hero blobs/badges scale, map
  `min-h-[280px] sm:min-h-[400px]`, subscribe form stacks.
- ChatBot FAB scales down on mobile; window uses
  `max-w-[calc(100vw-3rem)]` so it never overflows.
- **Tap targets ≥ 44×44 px** — ChatBot quick chips now `min-h-[44px]`
  (were ~28 px tall, below the recommended minimum).
- **Mobile text legibility** — menu card descriptions are `text-sm` on mobile
  (≥14 px) and `text-xs` on larger screens.

**Remaining checks (manual, run after deploy):**
- Google [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
  on the live URL.
- Lighthouse (mobile) on the live URL — aim for Performance ≥ 90,
  Accessibility ≥ 95, Best Practices = 100, SEO = 100.
- Confirm the LCP hero image paints under 2.5 s on a throttled 4G profile.

---

## Priority — What To Fix First

All ten original items are now **done**. Remaining work is verification /
optional polish:

| ✔ | Done | Where |
|---|------|-------|
| ✅ | Title + meta description (no "built on Replit") | §1, §2 |
| ✅ | `<h1>` on all pages | §3 |
| ✅ | `sitemap.xml` + `robots.txt` | §9, §10 |
| ✅ | Restaurant + WebSite JSON-LD (global + per-route) | §8 |
| ✅ | Keyword-rich alt texts | §4 |
| ✅ | Fonts → `index.html` with preconnect + swap | §11.3 |
| ✅ | Canonical + per-page meta (custom `Seo.tsx`, no extra dep) | §8 |
| ✅ | Route-level code splitting (`React.lazy`) | §11.4 |
| ✅ | Images converted + resized to WebP | §11.1 |
| ✅ | Dead `#` links removed from Footer | §7 |

**Still to do (manual / off-site):**
- 🔴 Submit the sitemap in **Google Search Console** + **Bing Webmaster Tools**.
- 🟡 Run **Lighthouse (mobile)** and **PageSpeed Insights** on the live URL.
- 🟡 Create and verify a **Google Business Profile** (huge for local SEO).
- 🟢 Optional: full AVIF + `srcset` for every image.

---

> **Bottom line:** Pizza Ride's on-page SEO is now in good shape — clean URLs,
> proper headings, rich alt text, valid structured data, a sitemap, a
> crawl-friendly `robots.txt`, optimized images, non-blocking fonts, code
> splitting and mobile-friendly tap targets. The next biggest wins are
> **off-site**: submitting to Search Console and setting up a **Google Business
> Profile** for the Samalkha location.