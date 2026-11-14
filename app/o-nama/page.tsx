import type { Metadata } from "next";
import { pageUrls } from "@/lib/seo";
import { Closing, PageHero, References } from "@/components/Sections";

export const metadata: Metadata = {
  title: "O nama",
  description: "Cooldown Adria je generalni distributer švicarskog proizvođača Cool Down AG za Hrvatsku i Sloveniju.",
  ...pageUrls("/o-nama"),
};

export default function Page() {
  return (
    <div className="page-calm">
      <PageHero
        crumbs={[{ label: "O nama" }]}
        title="Švicarski proizvod, lokalna podrška."
        lead="Cooldown Adria je generalni distributer švicarskog proizvođača Cool Down AG za Hrvatsku i Sloveniju."
      />
      <section className="sect sect--tight-top">
        <div className="wrap split">
          <div>
            <h2 className="h2">Proizvođač</h2>
          </div>
          <dl className="factlist">
            <div>
              <dt>Tvrtka</dt>
              <dd>Cool Down AG</dd>
            </div>
            <div>
              <dt>Sjedište</dt>
              <dd>Gaswerkstrasse 15, CH-8570 Weinfelden, Švicarska</dd>
            </div>
            <div>
              <dt>Proizvod</dt>
              <dd>Medicinski proizvod za hlađenje i ublažavanje boli kod ozljeda udova</dd>
            </div>
            <div>
              <dt>Web proizvođača</dt>
              <dd>
                <a className="textlink" href="https://cool-down.swiss" rel="noopener" target="_blank">
                  cool-down.swiss
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="sect sect--frost">
        <div className="wrap split">
          <div>
            <h2 className="h2">Cooldown Adria</h2>
          </div>
          <div className="prose">
            <p>
              Za Hrvatsku i Sloveniju vodimo prodaju, demonstracije i podršku partnerima i kupcima. Fizioterapeutima,
              klubovima, klinikama i ljekarnama pokazujemo proizvod uživo, a kupcima pomažemo odabrati pravi set.
            </p>
          </div>
        </div>
      </section>
      <section className="sect">
        <div className="wrap">
          <References />
        </div>
      </section>
      <Closing variant="calm" />
    </div>
  );
}
