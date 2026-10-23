import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import InquiryButton from "@/components/InquiryButton";
import { JsonLd, ProductCard } from "@/components/ui";
import { categories, getCategory } from "@/lib/categories";
import { productImage } from "@/lib/images";
import { productsIn } from "@/lib/products";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  const first = productsIn(c.slug)[0];
  return {
    title: c.seoTitle,
    description: c.seoDescription,
    alternates: { canonical: `/${c.slug}` },
    openGraph: {
      title: c.seoTitle,
      description: c.seoDescription,
      url: `/${c.slug}`,
      images: first ? [{ url: productImage(first), width: first.imageWidth, height: first.imageHeight, alt: first.name }] : [],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  const items = productsIn(c.slug);
  const min = Math.min(...items.map((p) => p.price));

  return (
    <>
      <div className="shell cat-hero">
        <nav className="crumbs" aria-label="Навигационна пътека" style={{ paddingTop: 0, marginBottom: 18 }}>
          <ol>
            <li><Link href="/">Начало</Link></li>
            <li aria-current="page">{c.name}</li>
          </ol>
        </nav>
        <h1 className="t-display">{c.name}</h1>
        <p className="t-lede">
          {c.tagline} {items.length > 1 ? `${items.length} модела, от ${min} €.` : ""}
        </p>
      </div>

      <section className="shell" aria-label={`Продукти – ${c.name}`} style={{ paddingBottom: 56 }}>
        <div className="grid">
          {items.map((p, i) => (
            <ProductCard key={p.id} p={p} priority={i < 3} sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 440px" />
          ))}
        </div>
      </section>

      <section className="shell section" style={{ paddingTop: 24 }} aria-labelledby="about-h">
        <div className="cat-intro">
          <div>
            <h2 id="about-h" className="t-h2">{c.seoTitle.split(" – ")[0]}</h2>
            <div style={{ marginTop: 24 }}>
              <InquiryButton />
            </div>
          </div>
          <div className="prose">
            {c.intro.map((t) => (
              <p key={t.slice(0, 24)}>{t}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="shell" aria-labelledby="more-h" style={{ paddingBottom: 40 }}>
        <h2 id="more-h" className="t-h3" style={{ marginBottom: 14 }}>Разгледайте още</h2>
        <div className="cat-links">
          {categories
            .filter((x) => x.slug !== c.slug)
            .map((x) => (
              <Link key={x.slug} className="btn btn-glass btn-sm" href={`/${x.slug}`}>
                {x.name}
              </Link>
            ))}
        </div>
      </section>

      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Начало", path: "/" },
            { name: c.name, path: `/${c.slug}` },
          ]),
          itemListJsonLd(c, items),
        ]}
      />
    </>
  );
}
