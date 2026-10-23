import fs from "node:fs";
import path from "node:path";
import type { Product } from "./products";

/**
 * Product photos are self-hosted from /public/products/<id>.jpg
 * (downloaded from alo.bg by `scripts/fetch-images.mjs`, which runs
 * automatically before every build). If a file is missing, we fall back
 * to the original alo.bg URL so the site never shows a broken image.
 */
const cache = new Map<string, string>();

export function productImage(p: Product): string {
  const hit = cache.get(p.id);
  if (hit) return hit;
  const local = path.join(process.cwd(), "public", "products", `${p.id}.jpg`);
  const src = fs.existsSync(local)
    ? `/products/${p.id}.jpg`
    : `https://www.alo.bg/user_files/e/evgenigyurovtech/${p.imageKey}_big.jpg`;
  cache.set(p.id, src);
  return src;
}
