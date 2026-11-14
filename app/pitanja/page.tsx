import type { Metadata } from "next";
import { pageUrls } from "@/lib/seo";
import { Closing, Faq, FaqJsonLd, PageHero } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Česta pitanja",
  description: "Je li Cool Down isto kao led, koliko dugo se nosi, može li preko noći, koji set odabrati i kada se ne smije koristiti.",
  ...pageUrls("/pitanja"),
};

export default function Page() {
  return (
    <div className="page-calm">
      <PageHero crumbs={[{ label: "Pitanja" }]} title="Česta pitanja" />
      <section className="sect sect--tight-top sect--faq">
        <div className="wrap" style={{ maxWidth: 1000 }}>
          <Faq />
        </div>
      </section>
      <Closing title="Niste našli odgovor?" text="Pošaljite nam pitanje. Odgovaramo osobno." primary={{ href: "/kontakt", label: "Pošaljite pitanje" }} secondary={{ href: "/narudzba", label: "Naručite svoj set" }} variant="calm" secondaryFirst />
      <FaqJsonLd />
    </div>
  );
}
