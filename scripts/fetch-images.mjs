// Downloads product photos from alo.bg into /public/products so the site
// serves them from your own domain (faster, better for SEO, no hotlinking).
// Runs automatically before `npm run build`. Safe to run again: existing
// files are skipped. If the download fails, the site falls back to alo.bg URLs.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = await fs.readFile(path.join(root, "lib", "products.ts"), "utf8");
const pairs = [...src.matchAll(/id:\s*"(\d+)"[\s\S]*?imageKey:\s*"([\d_]+)"/g)].map((m) => [m[1], m[2]]);
const outDir = path.join(root, "public", "products");
await fs.mkdir(outDir, { recursive: true });

let ok = 0;
for (const [id, key] of pairs) {
  const file = path.join(outDir, `${id}.jpg`);
  try {
    await fs.access(file);
    ok++;
    continue;
  } catch {}
  const url = `https://www.alo.bg/user_files/e/evgenigyurovtech/${key}_big.jpg`;
  try {
    const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 (site build)" }, signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 2000) throw new Error("file too small");
    await fs.writeFile(file, buf);
    ok++;
    console.log(`✓ ${id}.jpg (${Math.round(buf.length / 1024)} KB)`);
  } catch (e) {
    console.warn(`! ${id}: ${e.message} – will use the alo.bg URL instead`);
  }
}
console.log(`Product images: ${ok}/${pairs.length} available locally.`);
