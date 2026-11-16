import type { Metadata } from "next";
import { pageUrls } from "@/lib/seo";
import { InquiryForm } from "@/components/InquiryForm";
import { PageHero } from "@/components/Sections";
import { ORDER_OPTIONS, PARTS_OPTION } from "@/lib/content";
import { SITE, waLink } from "@/lib/site";

export const metadata: Metadata = {
  // SEO tekstovi 14.11.2026. (SEO-KLJUCNE-RIJECI.md); bez en i em crtica.
  title: "Cool Down cijena i narudžba",
  description:
    "Naručite Cool Down set. Cijenu i uvjete dostave šaljemo na upit, a narudžbu potvrđujete tek tada.",
  ...pageUrls("/narudzba"),
};

export default async function Page({ searchParams }: { searchParams: Promise<{ proizvod?: string }> }) {
  const { proizvod } = await searchParams;
  const product = proizvod && ORDER_OPTIONS.includes(proizvod) ? proizvod : undefined;
  const parts = product === PARTS_OPTION;
  return (
    <div className="page-calm">
      <PageHero
        crumbs={[{ label: "Narudžba" }]}
        title={parts ? "Upit za pojedinačne dijelove" : "Naručite svoj set"}
        lead={
          parts
            ? "Navedite koje dijelove i koliko trebate. Javit ćemo vam se s cijenom i uvjetima dostave, a narudžbu potvrđujete tek tada."
            : "Pošaljite narudžbu ili upit. Javit ćemo vam se s cijenom i uvjetima dostave, a narudžbu potvrđujete tek tada."
        }
      />
      <section className="sect sect--tight-top">
        <div className="wrap split">
          <div className="aside-card">
            <p>
              <strong>Što slijedi:</strong> pregledamo upit i javimo se e-mailom ili telefonom s cijenom i dostavom.
            </p>
            <p>{SITE.delivery}.</p>
            {SITE.whatsapp ? (
              <p>
                <a
                  className="btn btn--ghost"
                  href={waLink(
                    parts
                      ? "Pozdrav, zanimaju me pojedinačni dijelovi za Cool Down."
                      : `Pozdrav, želim naručiti Cool Down ${product ?? "set"}.`,
                  )}
                  rel="noopener"
                  target="_blank"
                >
                  Naručite preko WhatsAppa
                </a>
              </p>
            ) : null}
            <p>
              Radije pišete? <a className="textlink" href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </div>
          <InquiryForm mode="narudzba" defaultProduct={product} />
        </div>
      </section>
    </div>
  );
}
