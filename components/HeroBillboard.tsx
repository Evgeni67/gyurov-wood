"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState, type CSSProperties } from "react";
import InquiryButton from "./InquiryButton";

export type Slide = {
  id: string;
  name: string;
  summary: string;
  price: string;
  category: string;
  href: string;
  url: string;
  aloUrl: string;
  img: string;
};

const MS = 6500;

/** Netflix-style billboard: full-bleed photos cross-fade, a glass picker switches them. */
export default function HeroBillboard({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  // The progress bar's CSS animation is the timer: when it finishes, show the next product.
  // Pausing uses animation-play-state, so the bar resumes where it stopped instead of restarting.
  const next = useCallback(() => setI((n) => (n + 1) % slides.length), [slides.length]);

  const s = slides[i];

  return (
    <section
      className={`hero on-photo${paused ? " paused" : ""}`}
      aria-roledescription="carousel"
      aria-label="Избрани продукти"
      style={{ "--hero-ms": `${MS}ms` } as CSSProperties}
    >
      {slides.map((sl, n) => (
        <div key={sl.id} className={`hero-slide${n === i ? " on" : ""}`} aria-hidden={n !== i}>
          <Image src={sl.img} alt="" fill priority={n === 0} sizes="100vw" />
        </div>
      ))}

      <div className="shell hero-inner">
        <div className="hero-copy" aria-live="polite">
          <h1 className="hero-kicker">Дървени беседки, перголи и кашпи по поръчка в София</h1>
          <p className="t-display" role="heading" aria-level={2}>
            {s.name}
          </p>
          <div className="hero-meta">
            <span className="hero-price">{s.price}</span>
            <span className="t-small" style={{ maxWidth: "44ch" }}>{s.summary}</span>
          </div>
          <div className="hero-actions">
            <Link className="btn btn-glass" href={s.href}>
              Виж детайли
            </Link>
            <InquiryButton product={{ name: s.name, price: s.price, url: s.url, aloUrl: s.aloUrl }} />
          </div>
        </div>

        <div
          className="hero-picker glass"
          role="group"
          aria-label="Избери продукт"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {slides.map((sl, n) => (
            <div key={sl.id}>
              <button
                type="button"
                className="hero-thumb"
                aria-pressed={n === i}
                aria-label={`${sl.name}, ${sl.price}`}
                onClick={() => setI(n)}
              >
                <div className="hero-thumb-img">
                  <Image src={sl.img} alt="" fill sizes="80px" />
                </div>
                <div>
                  <b>{sl.category}</b>
                  <span>{sl.price}</span>
                </div>
              </button>
              {n === i && (
                <div className="hero-progress" aria-hidden="true">
                  <i key={i} onAnimationEnd={next} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
