import type { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { productImage } from "@/lib/images";
import { productPath, products } from "@/lib/products";
import { site } from "@/lib/site";

const abs = (p: string) => (p.startsWith("http") ? p : site.url + p);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...categories.map((c) => ({
      url: abs(`/${c.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...products.map((p) => ({
      url: abs(productPath(p)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [abs(productImage(p))],
    })),
  ];
}
