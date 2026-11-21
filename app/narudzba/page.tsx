import type { Metadata } from "next";
import { pageUrls } from "@/lib/seo";
import { InquiryForm } from "@/components/InquiryForm";
import { PageHero } from "@/components/Sections";
import { OrderWhatsApp } from "@/components/OrderWhatsApp";
import { PARTS_OPTION, catalogByName } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  // SEO tekstovi 14.11.2026. (SEO-KLJUCNE-RIJECI.md); bez en i em crtica.
  title: "Cool Down cijena i narudžba",
  description:
    "Naručite Cool Down set. Cijenu i uvjete dostave šaljemo na upit, a narudžbu potvrđujete tek tada.",
  ...pageUrls("/narudzba"),
};

export default async function Page({ searchParams }: { searchParams: Promise<{ proizvod?: string }> }) {
  const { proizvod } = await searchParams;
  // ?proizvod=<naziv> popunjava prvi red; PARTS_OPTION mijenja naslov i uvod (dijelovi).
  const item = proizvod ? catalogByName(proizvod) : undefined;
  const parts = proizvod === PARTS_OPTION;
  return (
    <div className="page-calm">
      <PageHero
        crumbs={[{ label: "Narudžba" }]}
        title={parts ? "Upit za pojedinačne dijelove" : "Naručite svoj set"}
        lead={
          parts
            ? "Odaberite dijelove i količine. Javit ćemo vam se s cijenom i uvjetima dostave, a narudžbu potvrđujete tek tada."
            : "Odaberite jedan ili više proizvoda. Javit ćemo vam se s cijenom i uvjetima dostave, a narudžbu potvrđujete tek tada."
        }
      />
      <section className="sect sect--tight-top">
        <div className="wrap split">
          <div className="aside-card">
            <p>
              <strong>Što slijedi:</strong> pregledat ćemo upit i javiti vam se e-mailom ili telefonom.
            </p>
            <p>{SITE.delivery}.</p>
            {SITE.whatsapp ? (
              <p>
                <OrderWhatsApp
                  fallback={
                    parts
                      ? "Pozdrav, zanimaju me pojedinačni dijelovi za Cool Down."
                      : `Pozdrav, želim naručiti Cool Down ${item?.name ?? "set"}.`
                  }
                />
              </p>
            ) : null}
            <p>
              Radije pišete? <a className="textlink" href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </div>
          <InquiryForm mode="narudzba" defaultItems={item ? [item.id] : undefined} />
        </div>
      </section>
    </div>
  );
}
