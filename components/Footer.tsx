import Link from "next/link";
import { categories } from "@/lib/categories";
import { site } from "@/lib/site";
import { LogoMark } from "./Icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <Link href="/" className="logo" style={{ marginBottom: 14 }}>
              <LogoMark className="logo-mark" /> {site.name}
            </Link>
            <p style={{ maxWidth: "38ch", margin: "14px 0 0" }}>
              {site.tagline}. Беседки, перголи, кашпи и люлки от суха иглолистна дървесина, обработена с Bochemit.
            </p>
          </div>
          <nav aria-label="Продукти">
            <h2>Продукти</h2>
            <ul>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2>Контакти</h2>
            <ul>
              <li>{site.city}, {site.region}</li>
              {site.phone && (
                <li>
                  <a href={`tel:${site.phone}`}>{site.phone}</a>
                </li>
              )}
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
              )}
              <li>
                <a href={site.aloProfile} target="_blank" rel="noopener">
                  Нашите обяви в alo.bg
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>© {year} {site.name}</span>
          <span>Цените са в евро. Доставката се договаря допълнително.</span>
        </div>
      </div>
    </footer>
  );
}
