import type { Metadata } from "next";
import { pageUrls } from "@/lib/seo";
import { Closing, PageHero, Safety, Steps } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Upute za primjenu",
  description:
    "Kako se stavlja Cool Down: ICE FLUID s vodom u omjeru 1 : 5, pamučni zavoj u jednom sloju prema srcu, preko njega fiksirni zavoj. Kontraindikacije i upozorenja.",
  ...pageUrls("/upute"),
};

export default function Page() {
  return (
    // .page-calm: mirniji tretman; .page-upute: posebnosti ove stranice (naslov u okviru Safety).
    <div className="page-calm page-upute">
      <PageHero
        crumbs={[{ label: "Upute" }]}
        title="Upute za primjenu"
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
            <h2 className="h2">Detaljno</h2>
          </div>
          <dl className="factlist">
            <div>
              <dt>Omjer</dt>
              <dd>ICE FLUID i voda u omjeru 1 : 5.</dd>
            </div>
            <div>
              <dt>Zavoj</dt>
              <dd>Pamučni zavoj se natopi, lagano iscijedi i stavi u jednom sloju, u smjeru prema srcu.</dd>
            </div>
            <div>
              <dt>Fiksiranje</dt>
              <dd>Preko pamučnog zavoja ide fiksirni zavoj.</dd>
            </div>
            <div>
              <dt>Trajanje</dt>
              <dd>Optimalno 2 sata. Zavoj hladi 2 do 3 sata, dok se ne osuši.</dd>
            </div>
            <div>
              <dt>Ponavljanje</dt>
              <dd>Koliko god treba. Nakon operacije 2 do 3 puta dnevno. Moguće i preko noći.</dd>
            </div>
            <div>
              <dt>Svježe rane</dt>
              <dd>Prije primjene prekrijte ih folijom.</dd>
            </div>
            <div>
              <dt>Čuvanje</dt>
              <dd>Na sobnoj temperaturi, zaštićeno od topline.</dd>
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
