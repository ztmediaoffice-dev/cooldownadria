import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { SourceTracker } from "@/components/SourceTracker";
import { SITE } from "@/lib/site";
import { OG_BASE } from "@/lib/seo";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Cool Down: hlađenje bez leda | Cooldown Adria",
    template: "%s | Cooldown Adria",
  },
  description:
    "Ciljano hlađenje za podršku oporavku. Cool Down hladi na 7–10 °C, ne stvara ozebline i nosi se 2 sata i duže. Nakon operativnih zahvata, ozljeda i fizičkog napora.",
  applicationName: "Cooldown Adria",
  openGraph: OG_BASE,
  robots: SITE.indexable ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#052655",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cooldown Adria",
  url: SITE.url,
  logo: `${SITE.url}/logo.svg`,
  email: SITE.email,
  description: "Generalni distributer Cool Down AG za Hrvatsku i Sloveniju.",
  areaServed: ["HR", "SI"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hr" className={montserrat.variable}>
      <body>
        <a href="#sadrzaj" className="skip">
          Preskoči na sadržaj
        </a>
        <Header />
        <main id="sadrzaj">{children}</main>
        <Footer />
        <MobileBar />
        <SourceTracker />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
