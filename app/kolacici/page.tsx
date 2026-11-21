import type { Metadata } from "next";
import { pageUrls } from "@/lib/seo";
import { PageHero } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Kolačići",
  description: "Stranica Cooldown Adria ne koristi kolačiće za analitiku ni oglašavanje. Što pamtimo tijekom posjeta i kada se to briše.",
  ...pageUrls("/kolacici") };

export default function Page() {
  return (
    <div className="page-calm">
      <PageHero crumbs={[{ label: "Kolačići" }]} title="Kolačići" />
      <section className="sect sect--tight-top">
        <div className="wrap">
          <div className="prose">
            <p>
              Stranica trenutno ne koristi kolačiće za analitiku ni oglašavanje. Tijekom posjeta u pregledniku pamtimo
              samo izvor dolaska na stranicu, kako bismo znali s kojeg je oglasa ili materijala stigao upit. Taj se podatak
              briše kad zatvorite preglednik.
            </p>
            <p>
              Ako uvedemo analitiku ili oglasne kolačiće, prije toga ćemo vas pitati za pristanak i ažurirati ovu
              stranicu.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
