import Link from "next/link";
import { categories } from "@/lib/categories";

export default function NotFound() {
  return (
    <div className="shell notfound">
      <div>
        <h1 className="t-h1">Тази страница не съществува</h1>
        <p>Може би продуктът е преместен. Разгледайте каталога по категории.</p>
        <div className="cat-links" style={{ justifyContent: "center" }}>
          <Link className="btn btn-primary btn-sm" href="/">Към началото</Link>
          {categories.map((c) => (
            <Link key={c.slug} className="btn btn-glass btn-sm" href={`/${c.slug}`}>
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
