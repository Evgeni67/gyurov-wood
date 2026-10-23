import Image from "next/image";
import Link from "next/link";
import { formatPrice, productPath, type Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { site, telHref, viberHref } from "@/lib/site";
import { ChatIcon, PhoneIcon } from "./Icons";

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be raw JSON; "<" is escaped to keep it safe inside <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function ProductCard({ p, priority = false, sizes }: { p: Product; priority?: boolean; sizes?: string }) {
  return (
    <Link href={productPath(p)} className="card on-photo" aria-label={`${p.name} – ${formatPrice(p.price)}`}>
      <div className="card-media">
        <Image
          src={productImage(p)}
          alt={p.name}
          fill
          priority={priority}
          sizes={sizes ?? "(max-width: 720px) 82vw, (max-width: 1320px) 31vw, 420px"}
        />
      </div>
      <div className="card-body">
        <div>
          <h3 className="card-name">{p.name}</h3>
          <div className="card-sub">{p.highlights[0]}</div>
        </div>
        <span className="card-price">{formatPrice(p.price)}</span>
      </div>
    </Link>
  );
}

export function ProductRow({ items }: { items: Product[] }) {
  return (
    <div className="row" role="list">
      {items.map((p) => (
        <div role="listitem" key={p.id}>
          <ProductCard p={p} />
        </div>
      ))}
    </div>
  );
}

/** Call / Viber buttons when a phone is configured, otherwise a link to the alo.bg profile. */
export function DirectContact({ compact = false }: { compact?: boolean }) {
  const tel = telHref();
  const viber = viberHref();
  const cls = `btn btn-glass${compact ? " btn-sm" : ""}`;
  if (!tel) {
    return (
      <a className={cls} href={site.aloProfile} target="_blank" rel="noopener">
        <ChatIcon /> Пиши ни в alo.bg
      </a>
    );
  }
  return (
    <>
      <a className={cls} href={tel}>
        <PhoneIcon /> Обади се
      </a>
      {viber && (
        <a className={cls} href={viber}>
          <ChatIcon /> Viber
        </a>
      )}
    </>
  );
}
