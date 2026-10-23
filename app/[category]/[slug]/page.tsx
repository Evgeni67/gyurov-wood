import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import InquiryButton from "@/components/InquiryButton";
import { DirectContact, JsonLd, ProductRow } from "@/components/ui";
import { getCategory } from "@/lib/categories";
import { productImage } from "@/lib/images";
import { formatPrice, getProduct, productPath, products, related } from "@/lib/products";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ category: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const p = getProduct(category, slug);
  if (!p) return {};
  const title = `${p.name} – ${formatPrice(p.price)}`;
  const description = p.summary;
  const img = productImage(p);
  return {
    title,
    description,
    alternates: { canonical: productPath(p) },
    openGraph: {
      type: "website",
      title,
      description,
      url: productPath(p),
      images: [{ url: img, width: p.imageWidth, height: p.imageHeight, alt: p.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: [img] },
    other: {
      "product:price:amount": p.price.toFixed(2),
      "product:price:currency": "EUR",
      "product:availability": "preorder",
      "product:condition": "new",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { category, slug } = await params;
  const p = getProduct(category, slug);
  const c = getCategory(category);
  if (!p || !c) notFound();

  const price = formatPrice(p.price);
  const inquiry = { name: p.name, price, url: site.url + productPath(p), aloUrl: p.aloUrl };

  return (
    <div className="has-buybar">
      <nav className="shell crumbs" aria-label="Навигационна пътека">
        <ol>
          <li><Link href="/">Начало</Link></li>
          <li><Link href={`/${c.slug}`}>{c.name}</Link></li>
          <li aria-current="page">{p.name}</li>
        </ol>
      </nav>

      <article>
        <div className="shell pdp">
          <div className="pdp-media">
            <Image
              src={productImage(p)}
              alt={p.title}
              width={p.imageWidth}
              height={p.imageHeight}
              priority
              sizes="(max-width: 960px) 100vw, 760px"
            />
          </div>

          <aside className="pdp-panel glass" aria-label="Цена и поръчка">
            <Link className="pdp-cat" href={`/${c.slug}`}>{c.name}</Link>
            <h1>{p.name}</h1>
            <p className="pdp-summary">{p.summary}</p>
            <div className="pdp-price">
              <strong>{price}</strong>
            </div>
            <p className="pdp-terms">Изработка по поръчка. Доставката се договаря допълнително.</p>
            <div className="pdp-actions">
              <InquiryButton product={inquiry} />
              <div className="pdp-actions-2">
                <DirectContact />
              </div>
            </div>
            <div className="chips">
              {p.highlights.map((h) => (
                <span key={h} className="chip">{h}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="shell pdp-details">
          <section aria-labelledby="desc-h">
            <h2 id="desc-h" className="t-h2">Описание</h2>
            <div className="prose">
              {p.description.map((t) => (
                <p key={t.slice(0, 32)}>{t}</p>
              ))}
            </div>
            {p.advantages && (
              <>
                <h3 className="t-h3" style={{ margin: "28px 0 6px" }}>Предимства</h3>
                <ul className="ticks">
                  {p.advantages.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </>
            )}
            {p.options && (
              <>
                <h3 className="t-h3" style={{ margin: "32px 0 0" }}>Допълнителни опции</h3>
                <div className="options">
                  {p.options.map((o) => (
                    <div key={o.name} className="option">
                      <b>{o.name}</b>
                      <span>{o.text}</span>
                      {o.price && <em>{o.price}</em>}
                    </div>
                  ))}
                </div>
              </>
            )}
            {p.note && <p className="note">{p.note}</p>}
          </section>

          <section aria-labelledby="specs-h">
            <h2 id="specs-h" className="t-h2">Характеристики</h2>
            <dl className="specs glass">
              {p.specs.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </article>

      <section className="row-section" aria-labelledby="rel-h">
        <div className="shell section-head">
          <h2 id="rel-h" className="t-h2">Може да харесате още</h2>
        </div>
        <ProductRow items={related(p)} />
      </section>

      <div className="buybar glass">
        <div>
          <strong>{price}</strong>
          <small>{p.name}</small>
        </div>
        <InquiryButton product={inquiry} className="btn btn-primary btn-sm" />
      </div>

      <JsonLd
        data={[
          productJsonLd(p),
          breadcrumbJsonLd([
            { name: "Начало", path: "/" },
            { name: c.name, path: `/${c.slug}` },
            { name: p.name, path: productPath(p) },
          ]),
        ]}
      />
    </div>
  );
}
