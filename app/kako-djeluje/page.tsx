import type { Metadata } from "next";
import { pageUrls } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { TempCurve } from "@/components/TempCurve";
import { Benefits, Closing, Comparison, PageHero, SectHead } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Kako djeluje",
  description:
    "Cool Down hladi isparavanjem na temperaturi od 7–10 °C. Ne ide u minus, ne stvara ozebline i nosi se 2 sata i duže. Usporedba s ledom i studija proizvođača.",
  ...pageUrls("/kako-djeluje"),
};

export default function Page() {
  return (
    // .page-calm: mirniji tretman usklađen s početnom; .page-kako-djeluje: posebnosti ove stranice.
    <div className="page-calm page-kako-djeluje">
      <PageHero
        crumbs={[{ label: "Kako djeluje" }]}
        title="Hladi dugo, a ne prejako."
        lead="Pamučni zavoj natopljen ICE FLUID-om hladi isparavanjem. Temperatura ostaje na 7–10 °C dok se zavoj ne osuši, pa se može nositi 2 sata i duže."
      >
        <div className="actions">
          <Link href="/narudzba" className="btn">
            Naručite svoj set
          </Link>
          <Link href="/upute" className="btn btn--ghost">
            Upute za primjenu
          </Link>
        </div>
      </PageHero>

      <section className="sect sect--tight-top" aria-label="Krivulja temperature">
        <div className="wrap">
          <TempCurve />
        </div>
      </section>

      <section className="sect sect--frost" aria-labelledby="princip">
        <div className="wrap split">
          <div>
            <h2 className="h2" id="princip">
              Princip
            </h2>
          </div>
          <dl className="factlist">
            <div>
              <dt>Kako hladi</dt>
              <dd>Prirodno, isparavanjem i aktivacijom receptora za hladnoću.</dd>
            </div>
            <div>
              <dt>Na kojoj temperaturi</dt>
              <dd>Hladi na 7–10 °C. Ne ide u minus, pa ne stvara ozebline.</dd>
            </div>
            <div>
              <dt>Koliko dugo</dt>
              <dd>2 sata i duže. Zavoj hladi dok se ne osuši, a hlađenje se može ponavljati koliko treba.</dd>
            </div>
            <div>
              <dt>Priprema</dt>
              <dd>Spreman odmah. ICE FLUID se čuva na sobnoj temperaturi, bez hladnjaka i zamrzivača.</dd>
            </div>
            <div>
              <dt>Kretanje</dt>
              <dd>Fiksirni zavoj drži oblog na mjestu i ne ograničava pokrete.</dd>
            </div>
            <div>
              <dt>Višekratno</dt>
              <dd>Boca ICE FLUID-a od 250 ml dovoljna je za oko 40 primjena.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="sect sect--benefits" aria-labelledby="prednosti">
        <div className="wrap">
          <SectHead id="prednosti" title="Četiri razloga" />
          <Benefits />
        </div>
      </section>

      <section className="sect sect--frost sect--compare" aria-labelledby="usporedba">
        <div className="wrap">
          <div className="compare-head">
            <h2 className="h2" id="usporedba">
              Cool Down ili led
            </h2>
          </div>
          <Comparison />
        </div>
      </section>

      <section className="sect" aria-labelledby="studija" id="studija">
        <div className="wrap split">
          <div>
            <h2 className="h2">Studija proizvođača</h2>
            <p className="note mt-s">
              Podaci su prema proizvođaču Cool Down AG. Detalje studije proizvođač daje na upit.
            </p>
          </div>
          <div className="prose">
            <p>
              Proizvođač je usporedio hlađenje Cool Down zavojem s hlađenjem ledom i hladnim oblogama kod pacijenata
              nakon operacije.
            </p>
            <dl className="factlist">
              <div>
                <dt className="num">Nakon 30 dana</dt>
                <dd>Mišićni presjek se nije značajno smanjio.</dd>
              </div>
              <div>
                <dt className="num">Nakon 60 dana</dt>
                <dd>Mišićni presjek je porastao.</dd>
              </div>
              <div>
                <dt className="num">Nakon 90 dana</dt>
                <dd>Mišićni presjek je statistički značajno porastao.</dd>
              </div>
              <div>
                <dt>Lijekovi protiv bolova</dt>
                <dd>Potrošnja je bila manja.</dd>
              </div>
            </dl>
            <p>
              Fizioterapeuti i liječnici mogu detalje studije{" "}
              <Link href="/zahtjev?vrsta=demonstracija" className="textlink">
                zatražiti uz demonstraciju
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Priprema zavoja">
        <div className="banner-img">
          <Image
            src="/img/foto/priprema.jpg"
            alt="Pamučni zavoj se vadi iz posude s ICE FLUID-om, pored boce Cool Down"
            fill
            sizes="100vw"
            style={{ objectPosition: "50% 45%" }}
          />
        </div>
      </section>

      <Closing variant="calm" />
    </div>
  );
}
