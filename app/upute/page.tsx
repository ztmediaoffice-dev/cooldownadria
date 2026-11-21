import type { Metadata } from "next";
import { pageUrls } from "@/lib/seo";
import { Closing, PageHero, Safety, Steps } from "@/components/Sections";

export const metadata: Metadata = {
  // SEO tekstovi 14.11.2026. (SEO-KLJUCNE-RIJECI.md); bez en i em crtica.
  title: "Kako se stavlja hladni oblog Cool Down",
  description:
    "Kako se stavlja hladni oblog Cool Down: ICE FLUID s vodom u omjeru 1 : 5, pamučni zavoj u jednom sloju prema srcu, preko njega fiksirni zavoj. Upozorenja.",
  ...pageUrls("/upute"),
};

export default function Page() {
  return (
    // .page-calm: mirniji tretman; .page-upute: posebnosti ove stranice (naslov u okviru Safety).
    <div className="page-calm page-upute">
      <PageHero
        crumbs={[{ label: "Upute" }]}
        title="Kako se stavlja hladni oblog"
        lead="Sažetak uputa proizvođača. Prije prve primjene pročitajte upute iz pakiranja."
      >
        <p className="mt-s">
          <a href="#sigurnost" className="textlink">
            Sigurnosne informacije
          </a>
        </p>
      </PageHero>
      <section className="sect sect--tight-top">
        <div className="wrap">
          <Steps />
        </div>
      </section>
      <section className="sect sect--frost">
        <div className="wrap split">
          <div>
            <h2 className="h2">Trajanje i ponavljanje</h2>
          </div>
          <dl className="factlist">
            <div>
              <dt>Trajanje</dt>
              <dd>Optimalno je hladni oblog držati 2 sata. Zavoj hladi 2 do 3 sata, dok se ne osuši.</dd>
            </div>
            <div>
              <dt>Ponavljanje</dt>
              <dd>Koliko god treba. Nakon operacije 2 do 3 puta dnevno. Moguće i preko noći.</dd>
            </div>
            <div>
              <dt>Rane i ekcem</dt>
              <dd>Otvorene rane, ogrebotine, svježe ožiljke i ekcem prije primjene prekrijte folijom (npr. OpSite) ili zavojem. Cool Down ne smije izravno dodirivati ranu.</dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="sect" id="sigurnost" aria-labelledby="sigurnost-h">
        <div className="wrap split">
          <div>
            <h2 className="h2" id="sigurnost-h">
              Sigurnost
            </h2>
          </div>
          <Safety heading="h3" />
        </div>
      </section>
      <Closing variant="calm" />
    </div>
  );
}
