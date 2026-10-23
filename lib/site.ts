/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE to set your business details.
 *  Everything on the site (header, footer, buttons, SEO, Google
 *  structured data) reads from here.
 * ─────────────────────────────────────────────────────────────
 */
export const site = {
  /** Brand name shown in the logo, titles and Google results */
  name: "Gyurov Wood",
  /** Short brand line */
  tagline: "Дървени мебели за градината, изработени по поръчка",
  /** Your domain – set NEXT_PUBLIC_SITE_URL in hosting env vars */
  // On Vercel or Netlify this falls back to the live site address automatically.
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
    process.env.URL || // set by Netlify
    "https://www.example.bg"
  ).replace(/\/$/, ""),

  /**
   * Phone in international format, e.g. "+359888123456".
   * Leave empty and the site falls back to your alo.bg profile for contact.
   * When set, "Обади се", Viber and WhatsApp buttons appear automatically.
   */
  phone: "",
  /** Email for inquiries (the "Поискай оферта" form opens a pre-filled email). Optional. */
  email: "",

  city: "София",
  region: "област София",
  country: "BG",
  /** Areas you deliver/install to – used in Google structured data */
  areaServed: ["София", "Софийска област", "България"],
  openingHours: "Mo-Sa 09:00-18:00",

  aloProfile: "https://www.alo.bg/users/evgenigyurovtech",
  social: {
    facebook: "",
    instagram: "",
  },
};

export const telHref = () => (site.phone ? `tel:${site.phone}` : null);
export const viberHref = () =>
  site.phone ? `viber://chat?number=${site.phone.replace(/\s/g, "").replace(/^\+/, "%2B")}` : null;
export const whatsappHref = (text?: string) =>
  site.phone
    ? `https://wa.me/${site.phone.replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`
    : null;
