import { useEffect } from "react";
import { useLocation } from "wouter";
import { categories } from "@/components/Menu";

const BASE = "https://pizza-ride01-main.vercel.app";

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const breadcrumbList = (name: string, path: string) => ({
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
    { "@type": "ListItem", position: 2, name, item: `${BASE}${path}` },
  ],
});

const menuSchema = {
  "@type": "Menu",
  name: "Pizza Ride Menu",
  url: `${BASE}/menu`,
  hasMenuSection: categories.map((cat) => ({
    "@type": "MenuSection",
    name: cat.label,
    hasMenuItem: cat.items.map((item) => ({
      "@type": "MenuItem",
      name: item.name,
      description: item.description,
      offers: {
        "@type": "Offer",
        price: String(item.price),
        priceCurrency: "INR",
      },
    })),
  })),
};

const restaurantSchema = {
  "@type": "Restaurant",
  name: "Pizza Ride",
  url: `${BASE}/`,
  telephone: "+91-72068-87688",
  priceRange: "₹₹",
  image: `${BASE}/og-image.jpg`,
  servesCuisine: ["Pizza", "Burgers", "Sandwiches", "Pasta", "Shakes", "Fast Food"],
  hasMenu: `${BASE}/menu`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "6279+3QG, Jurasi Saraf Khas",
    addressLocality: "Samalkha",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  hasMap:
    "https://www.google.com/maps/search/?api=1&query=6279%2B3QG%20Jurasi%20Saraf%20Khas%2C%20Haryana",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "12:00",
      closes: "00:00",
    },
  ],
  acceptsReservations: "False",
};

type PageSeo = {
  title: string;
  description: string;
  path: string;
  graph: Record<string, unknown>[];
};

const pages: Record<string, PageSeo> = {
  "/": {
    title: "Pizza Ride — Fresh Pizza, Burgers & Shakes in Samalkha",
    description:
      "Craving pizza? Pizza Ride delivers hot, fresh pizza straight to you in minutes. Browse our menu, pick your favorites, and we'll handle the rest!",
    path: "/",
    graph: [
      {
        "@type": "WebPage",
        name: "Pizza Ride — Fresh Pizza, Burgers & Shakes in Samalkha",
        url: `${BASE}/`,
        description:
          "Hot, fresh wood-fired pizza, burgers, pasta and thick shakes delivered fast in Samalkha, Haryana.",
      },
    ],
  },
  "/menu": {
    title: "Menu — Pizzas, Burgers, Pasta & Shakes | Pizza Ride Samalkha",
    description:
      "Explore the full Pizza Ride menu in Samalkha — wood-fired pizzas, burgers, sandwiches, wraps, pasta, garlic bread, fries, dips and thick shakes. Fresh, made to order, starting ₹40.",
    path: "/menu",
    graph: [breadcrumbList("Menu", "/menu"), menuSchema],
  },
  "/why-us": {
    title: "Why Choose Us — Fresh Ingredients, Fast Delivery | Pizza Ride",
    description:
      "Pizza Ride brings proper, high-quality pizza to Samalkha — fresh ingredients, bold flavors, no cardboard crusts and fast, hot delivery to your door.",
    path: "/why-us",
    graph: [
      breadcrumbList("Why Us", "/why-us"),
      {
        "@type": "AboutPage",
        name: "Why Choose Pizza Ride",
        url: `${BASE}/why-us`,
        description:
          "Fresh ingredients, bold flavors and fast delivery — why Samalkha loves Pizza Ride.",
        about: { "@type": "Restaurant", name: "Pizza Ride" },
      },
    ],
  },
  "/gallery": {
    title: "Gallery — Inside the Pizza Ride Kitchen | Samalkha",
    description:
      "From the fiery oven to the perfect cheese pull — get a glimpse of our kitchen, pizzas, burgers and thick shakes at Pizza Ride, Samalkha.",
    path: "/gallery",
    graph: [
      breadcrumbList("Gallery", "/gallery"),
      {
        "@type": "ImageGallery",
        name: "Pizza Ride Gallery",
        url: `${BASE}/gallery`,
        description:
          "Photos and videos of wood-fired pizzas, stacked burgers and creamy shakes from Pizza Ride Samalkha.",
      },
    ],
  },
  "/location": {
    title: "Location & Contact — Pizza Ride, Jurasi Saraf Khas, Haryana",
    description:
      "Visit Pizza Ride at 6279+3QG, Jurasi Saraf Khas, Haryana. Open Mon–Sun, 12 PM – 12 AM. Call +91 72068 87688. Free delivery for PIET college students.",
    path: "/location",
    graph: [breadcrumbList("Location", "/location"), restaurantSchema],
  },
};

export default function Seo() {
  const [location] = useLocation();
  const path = (location.split("?")[0].replace(/\/$/, "") || "/") as string;
  const data = pages[path] ?? pages["/"];

  useEffect(() => {
    const url = `${BASE}${data.path === "/" ? "/" : data.path}`;

    document.title = data.title;
    setMeta("name", "description", data.description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    setMeta("property", "og:title", data.title);
    setMeta("property", "og:description", data.description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", `${BASE}/og-image.jpg`);
    setMeta("name", "twitter:title", data.title);
    setMeta("name", "twitter:description", data.description);
    setMeta("name", "twitter:image", `${BASE}/og-image.jpg`);

    let script = document.getElementById("route-jsonld") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "route-jsonld";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": data.graph,
    });
  }, [data]);

  return null;
}