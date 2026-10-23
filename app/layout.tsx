import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/ui";
import { site } from "@/lib/site";
import { businessJsonLd, websiteJsonLd } from "@/lib/seo";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-onest",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Дървени беседки, перголи и кашпи по поръчка в София | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Дървени градински беседки, перголи, кашпи, люлки и работни маси по поръчка в София. Суха иглолистна дървесина, импрегнант Bochemit, цени от 40 €.",
  applicationName: site.name,
  keywords: [
    "дървена беседка",
    "беседка по поръчка",
    "градинска беседка София",
    "дървена пергола",
    "пергола с пейка",
    "дървена кашпа",
    "градинска люлка",
    "градински мебели",
    "дървени мебели за градина",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    siteName: site.name,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: true },
  other: {
    "geo.region": "BG-22",
    "geo.placename": site.city,
  },
};

export const viewport: Viewport = {
  themeColor: "#eef0e8",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" className={onest.variable}>
      <body>
        <a href="#main" className="sr-only">Към съдържанието</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={[businessJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
