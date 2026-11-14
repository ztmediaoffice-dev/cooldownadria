import type { Metadata } from "next";
import { pageUrls } from "@/lib/seo";
import { InquiryForm } from "@/components/InquiryForm";
import { PageHero } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Zatražite demonstraciju",
  description: "Za fizioterapeute, klubove, klinike, ljekarne i teretane: demonstracija, uzorak ili poslovna ponuda.",
  ...pageUrls("/zahtjev"),
};

const TYPES = ["demonstracija", "uzorak", "ponuda"];

export default async function Page({ searchParams }: { searchParams: Promise<{ vrsta?: string }> }) {
  const { vrsta } = await searchParams;
  return (
    <div className="page-calm">
      <PageHero
        crumbs={[{ href: "/za-partnere", label: "Za partnere" }, { label: "Zahtjev" }]}
        title="Zatražite demonstraciju"
        lead="Za fizioterapeute, sportske klubove, klinike, ljekarne i teretane. Možete zatražiti i uzorak ili poslovnu ponudu."
      />
      <section className="sect sect--tight-top">
        <div className="wrap split">
          {/* Opis prati izabranu vrstu u obrascu (CSS :has); bez podrške prikazuje se opis demonstracije. */}
          <div className="aside-card next">
            <p className="next__item next__item--demonstracija">
              <strong>Što slijedi:</strong> javimo se da dogovorimo termin. Demonstracija je kod vas, u ordinaciji,
              klubu ili ljekarni.
            </p>
            <p className="next__item next__item--uzorak">
              <strong>Što slijedi:</strong> javimo se da dogovorimo pojedinosti oko uzorka.
            </p>
            <p className="next__item next__item--ponuda">
              <strong>Što slijedi:</strong> javimo se da razjasnimo što vam treba i dogovorimo pojedinosti ponude.
            </p>
          </div>
          <InquiryForm mode="zahtjev" defaultType={vrsta && TYPES.includes(vrsta) ? vrsta : undefined} />
        </div>
      </section>
    </div>
  );
}
