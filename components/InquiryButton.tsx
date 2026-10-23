"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { site, whatsappHref } from "@/lib/site";
import { CloseIcon } from "./Icons";

type Props = {
  label?: ReactNode;
  className?: string;
  product?: { name: string; price: string; url: string; aloUrl: string };
};

/**
 * "Поискай оферта" – opens a glass dialog, then hands the inquiry to the
 * channel you configured in lib/site.ts: email → WhatsApp → your alo.bg listing.
 */
export default function InquiryButton({ label = "Поискай оферта", className = "btn btn-primary", product }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  const [sent, setSent] = useState(false);

  const channel = site.email ? "email" : site.phone ? "whatsapp" : "alo";
  const submitLabel =
    channel === "email" ? "Изпрати по имейл" : channel === "whatsapp" ? "Изпрати в WhatsApp" : "Продължи към alo.bg";

  function open() {
    setSent(false);
    ref.current?.showModal();
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lines = [
      "Здравейте!",
      product ? `Интересувам се от: ${product.name} (${product.price})` : "Интересувам се от вашите продукти.",
      product ? `Линк: ${product.url}` : "",
      "",
      `Име: ${f.get("name") || ""}`,
      `Телефон: ${f.get("phone") || ""}`,
      f.get("place") ? `Населено място: ${f.get("place")}` : "",
      f.get("message") ? `\n${f.get("message")}` : "",
    ].filter((l, i, a) => l !== "" || a[i - 1] !== "");
    const text = lines.join("\n").trim();

    let href: string;
    if (channel === "email") {
      const subject = product ? `Запитване: ${product.name}` : `Запитване от сайта ${site.name}`;
      href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
      window.location.href = href;
    } else if (channel === "whatsapp") {
      href = whatsappHref(text)!;
      window.open(href, "_blank", "noopener");
    } else {
      navigator.clipboard?.writeText(text).catch(() => {});
      href = product?.aloUrl || site.aloProfile;
      window.open(href, "_blank", "noopener");
    }
    setSent(true);
  }

  return (
    <>
      <button type="button" className={className} onClick={open}>
        {label}
      </button>
      <dialog ref={ref} className="modal" aria-labelledby={`${id}-t`} onClick={(e) => e.target === ref.current && ref.current?.close()}>
        <div className="modal-card glass">
          <div className="modal-head">
            <div>
              <h2 id={`${id}-t`} className="t-h3">Поискай оферта</h2>
              <p>{product ? product.name : "Кажете ни какво търсите – ще ви върнем отговор с цена и срок."}</p>
            </div>
            <button type="button" className="icon-btn" aria-label="Затвори" onClick={() => ref.current?.close()}>
              <CloseIcon className="" />
            </button>
          </div>

          {sent ? (
            <div>
              <p className="t-lede" style={{ margin: "0 0 18px" }}>
                {channel === "alo"
                  ? "Текстът на запитването е копиран. Поставете го в съобщение до нас в alo.bg."
                  : "Готово! Изпратете съобщението от отворения прозорец и ще се свържем с вас."}
              </p>
              <button type="button" className="btn btn-glass" onClick={() => ref.current?.close()}>
                Затвори
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <div className="field">
                <label htmlFor={`${id}-n`}>Име</label>
                <input id={`${id}-n`} name="name" autoComplete="name" required />
              </div>
              <div className="field">
                <label htmlFor={`${id}-p`}>Телефон</label>
                <input id={`${id}-p`} name="phone" type="tel" autoComplete="tel" inputMode="tel" required />
              </div>
              <div className="field">
                <label htmlFor={`${id}-c`}>Населено място (за доставка)</label>
                <input id={`${id}-c`} name="place" autoComplete="address-level2" />
              </div>
              <div className="field">
                <label htmlFor={`${id}-m`}>Размери, цвят или въпроси</label>
                <textarea id={`${id}-m`} name="message" rows={3} />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">{submitLabel}</button>
              </div>
              {channel === "alo" && (
                <p className="modal-hint">Ще копираме запитването и ще отворим обявата ни в alo.bg, откъдето можете да ни пишете.</p>
              )}
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
