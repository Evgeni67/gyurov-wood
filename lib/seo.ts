import { site } from "./site";
import { categories, type Category } from "./categories";
import { products, productPath, type Product } from "./products";
import { productImage } from "./images";

const abs = (p: string) => (p.startsWith("http") ? p : site.url + p);

export const orgId = `${site.url}/#business`;

export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["FurnitureStore", "LocalBusiness"],
    "@id": orgId,
    name: site.name,
    description: site.tagline,
    url: site.url,
    logo: abs("/icon.svg"),
    image: products.filter((p) => p.featured).map((p) => abs(productImage(p))),
    ...(site.phone ? { telephone: site.phone } : {}),
    ...(site.email ? { email: site.email } : {}),
    priceRange: "40 € – 2100 €",
    currenciesAccepted: "EUR",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    areaServed: site.areaServed.map((name) => ({ "@type": "AdministrativeArea", name })),
    openingHours: site.openingHours,
    sameAs: [site.aloProfile, site.social.facebook, site.social.instagram].filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Дървени мебели за градината",
      itemListElement: categories.map((c) => ({
        "@type": "OfferCatalog",
        name: c.name,
        url: abs(`/${c.slug}`),
      })),
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "bg-BG",
    publisher: { "@id": orgId },
  };
}

export function productJsonLd(p: Product) {
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": abs(productPath(p)) + "#product",
    name: p.name,
    description: [p.summary, ...p.description].join(" "),
    image: [abs(productImage(p))],
    sku: `GW-${p.id}`,
    mpn: p.id,
    category: categories.find((c) => c.slug === p.category)?.name,
    brand: { "@type": "Brand", name: site.name },
    material: "Дървесина",
    additionalProperty: p.specs.map(([name, value]) => ({ "@type": "PropertyValue", name, value })),
    offers: {
      "@type": "Offer",
      url: abs(productPath(p)),
      priceCurrency: "EUR",
      price: p.price.toFixed(2),
      priceValidUntil: nextYear.toISOString().slice(0, 10),
      availability: "https://schema.org/MadeToOrder",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": orgId },
      areaServed: site.country,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function itemListJsonLd(c: Category, list: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: c.name,
    itemListElement: list.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: abs(productPath(p)),
      name: p.name,
    })),
  };
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export const faq = [
  {
    q: "От какъв материал се изработват мебелите?",
    a: "Използваме висококачествена суха иглолистна дървесина. Всички елементи се шлайфат и обработват с професионален импрегнант Bochemit, който предпазва от влага, гъбички, вредители и UV лъчи.",
  },
  {
    q: "Мога ли да поръчам продукт по мои размери и цвят?",
    a: "Да. Всички продукти се изработват по индивидуална поръчка, така че размерите и цветът могат да бъдат адаптирани според вашето пространство и предпочитания.",
  },
  {
    q: "Колко време отнема изработката?",
    a: "Срокът зависи от продукта и натовареността. Например перголата с пейки, решетки и кашпи се изработва до 6 работни дни след потвърждаване на поръчката. Свържете се с нас за точен срок.",
  },
  {
    q: "Доставката включена ли е в цената?",
    a: "Доставката не е включена в цената и се договаря допълнително според адреса. Работим в София и областта, а при запитване и в цялата страна.",
  },
  {
    q: "Подходящи ли са беседките за хотели и заведения?",
    a: "Да. Беседките и перголите са подходящи за дворове, вили, хотели, ресторанти, къщи за гости и паркове. Предлагаме и допълнения като маса с пейки, WPC декинг и ветроупорни завеси.",
  },
];
