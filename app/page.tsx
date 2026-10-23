import Image from "next/image";
import Link from "next/link";
import HeroBillboard, { type Slide } from "@/components/HeroBillboard";
import InquiryButton from "@/components/InquiryButton";
import { DirectContact, JsonLd, ProductRow } from "@/components/ui";
import { categories } from "@/lib/categories";
import { productImage } from "@/lib/images";
import { formatPrice, productPath, products, productsIn } from "@/lib/products";
import { faq, faqJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export default function Home() {
  const featured = products.filter((p) => p.featured);
  const slides: Slide[] = featured.map((p) => ({
    id: p.id,
    name: p.name,
    summary: p.summary,
    price: formatPrice(p.price),
    category: categories.find((c) => c.slug === p.category)!.name,
    href: productPath(p),
    url: site.url + productPath(p),
    aloUrl: p.aloUrl,
    img: productImage(p),
  }));
  const craftImg = products.find((p) => p.id === "11511220")!;
  const singles = categories.filter((c) => productsIn(c.slug).length === 1).flatMap((c) => productsIn(c.slug));

  return (
    <>
      <HeroBillboard slides={slides} />

      {categories
        .filter((c) => productsIn(c.slug).length > 1)
        .map((c) => {
          const items = productsIn(c.slug);
          return (
            <section key={c.slug} className="row-section" aria-labelledby={`row-${c.slug}`}>
              <div className="shell section-head">
                <div>
                  <h2 id={`row-${c.slug}`} className="t-h2">
                    <Link href={`/${c.slug}`}>{c.name}</Link>
                  </h2>
                  <p>{c.tagline}</p>
                </div>
                <Link className="link-quiet" href={`/${c.slug}`}>
                  Всички {c.name.toLowerCase()} ({items.length})
                </Link>
              </div>
              <ProductRow items={items} />
            </section>
          );
        })}

      {singles.length > 0 && (
        <section className="row-section" aria-labelledby="row-more">
          <div className="shell section-head">
            <div>
              <h2 id="row-more" className="t-h2">Люлки и работни маси</h2>
              <p>За почивка в двора и за работа в работилницата.</p>
            </div>
          </div>
          <ProductRow items={singles} />
        </section>
      )}

      <section className="section" aria-labelledby="craft-h">
        <div className="shell">
          <div className="craft on-photo">
            <Image src={productImage(craftImg)} alt="Дървена беседка 3 × 3 м от слепени греди" fill sizes="(max-width: 1320px) 100vw, 1320px" />
            <h2 id="craft-h" className="t-h1">Масивно дърво. Обработено да издържи години навън.</h2>
            <div className="facts">
              <div className="fact glass">
                <b>Суха иглолистна дървесина</b>
                <p>Стабилна, без извиване и пукнатини. При беседките – слепени греди 12 × 12 см.</p>
              </div>
              <div className="fact glass">
                <b>Импрегнант Bochemit</b>
                <p>Всеки елемент се шлайфа и импрегнира срещу влага, гъбички, вредители и UV лъчи.</p>
              </div>
              <div className="fact glass">
                <b>По вашите мерки</b>
                <p>Размерите и цветът се адаптират за вашия двор, тераса, хотел или заведение.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="steps-h" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="section-head">
            <h2 id="steps-h" className="t-h2">Как поръчвате</h2>
          </div>
          <ol className="steps">
            <li>
              <h3 className="t-h3">Запитване</h3>
              <p>Изберете продукт и ни пишете какви размери и цвят търсите.</p>
            </li>
            <li>
              <h3 className="t-h3">Оферта</h3>
              <p>Потвърждаваме цена, срок и детайли като покрив, маса или декинг.</p>
            </li>
            <li>
              <h3 className="t-h3">Изработка</h3>
              <p>Изработваме изделието в нашия цех от подбрана и обработена дървесина.</p>
            </li>
            <li>
              <h3 className="t-h3">Доставка и монтаж</h3>
              <p>Договаряме доставка до вашия адрес. Колоните се анкерират при нужда.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-h" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="section-head">
            <h2 id="faq-h" className="t-h2">Често задавани въпроси</h2>
          </div>
          <div className="faq">
            {faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="kontakti" aria-labelledby="contact-h" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="contact glass">
            <div>
              <h2 id="contact-h" className="t-h2">Имате идея за двора си?</h2>
              <p className="t-lede" style={{ margin: "14px 0 0" }}>
                Пратете ни снимка на мястото и приблизителни размери. Ще предложим решение с цена и срок.
              </p>
            </div>
            <div className="contact-actions">
              <InquiryButton />
              <DirectContact />
            </div>
          </div>
        </div>
      </section>

      <JsonLd data={faqJsonLd(faq)} />
    </>
  );
}
