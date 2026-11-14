import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Hvala",
  robots: { index: false, follow: false },
};

const TEXT: Record<string, { title: string; text: string }> = {
  narudzba: {
    title: "Narudžba je poslana.",
    text: "Javit ćemo vam se s cijenom i uvjetima dostave. Narudžbu potvrđujete tek tada.",
  },
  demonstracija: {
    title: "Zahtjev za demonstraciju je poslan.",
    text: "Javit ćemo vam se da dogovorimo termin.",
  },
  uzorak: { title: "Zahtjev za uzorak je poslan.", text: "Javit ćemo vam se uskoro." },
  ponuda: { title: "Zahtjev za ponudu je poslan.", text: "Pripremit ćemo ponudu i javiti vam se." },
  kontakt: { title: "Poruka je poslana.", text: "Odgovorit ćemo vam uskoro." },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ vrsta?: string }> }) {
  const { vrsta } = await searchParams;
  const t = TEXT[vrsta ?? ""] ?? TEXT.kontakt;
  return (
    <div className="page-calm">
      <section className="page-hero" style={{ minHeight: "60vh" }}>
        <div className="wrap">
          <Crumbs items={[{ label: "Hvala" }]} />
          <h1 className="page-title">{t.title}</h1>
          <p className="lead">{t.text}</p>
          <div className="actions mt-m">
            <Link href="/kako-djeluje" className="btn">
              Pogledajte kako djeluje
            </Link>
            <Link href="/" className="btn btn--ghost">
              Na početnu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
