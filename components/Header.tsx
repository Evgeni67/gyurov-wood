"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { categories } from "@/lib/categories";
import { site } from "@/lib/site";
import { LogoMark, MenuIcon, CloseIcon } from "./Icons";
import InquiryButton from "./InquiryButton";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="nav-wrap">
      <nav className={`nav ${scrolled || open ? "is-scrolled" : ""}`} aria-label="Основна навигация">
        <Link href="/" className="logo" aria-label={`${site.name} – начало`}>
          <LogoMark className="logo-mark" />
          {site.name}
        </Link>
        <ul className="nav-links">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/${c.slug}`} aria-current={pathname.startsWith(`/${c.slug}`) ? "page" : undefined}>
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="nav-cta">
          <InquiryButton className="btn btn-primary btn-sm" />
        </div>
        <button
          type="button"
          className="nav-burger"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Затвори менюто" : "Отвори менюто"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon className="" /> : <MenuIcon className="" />}
        </button>
      </nav>
      <div id="mobile-menu" className={`nav-sheet glass ${open ? "open" : ""}`}>
        {categories.map((c) => (
          <Link key={c.slug} href={`/${c.slug}`}>
            {c.name}
          </Link>
        ))}
        <InquiryButton />
      </div>
    </header>
  );
}
