import type { Metadata } from "next";
import { pageUrls } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { TempCurve } from "@/components/TempCurve";
import { Benefits, Closing, Comparison, PageHero, SectHead } from "@/components/Sections";

export const metadata: Metadata = {
  // SEO tekstovi 14.11.2026. (SEO-KLJUCNE-RIJECI.md); bez en i em crtica.
  title: "Led ili hladni oblog: kako djeluje Cool Down",
  description:
    "Led pada prema 0 °C i mora se skidati. Cool Down hladi isparavanjem na 7 do 10 °C, bez ozeblina, 2 sata i duže. Usporedba s ledom i studija proizvođača.",
  ...pageUrls("/kako-djeluje"),
};

export default function Page() {
  return (
    // .page-calm: mirniji tretman usklađen s početnom; .page-kako-djeluje: posebnosti ove stranice.
    <div className="page-calm page-kako-djeluje">
      <PageHero
        crumbs={[{ label: "Kako djeluje" }]}
        title="Hladi dugo, a ne prejako."
        lead="Pamučni zavoj natopljen ICE FLUID-om je hladni oblog koji hladi isparavanjem. Temperatura ostaje na 7 do 10 °C dok se zavoj ne osuši, pa se može nositi 2 sata i duže."
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
              Kako hladi bez leda
            </h2>
          </div>
          <dl className="factlist">
            <div>
              <dt>Kako hladi</dt>
              <dd>Prirodno, isparavanjem i aktivacijom receptora za hladnoću.</dd>
            </div>
            <div>
              <dt>Na kojoj temperaturi</dt>
              <dd>Hladi na 7 do 10 °C. Ne ide u minus, pa ne stvara ozebline.</dd>
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
          <SectHead id="prednosti" title="Četiri razloga za hlađenje bez leda" />
          <Benefits />
        </div>
      </section>

      <section className="sect sect--frost sect--compare" aria-labelledby="usporedba">
        <div className="wrap">
          <div className="compare-head">
            <h2 className="h2" id="usporedba">
              Hladni oblog ili led
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
              Studija je usporedila Cool Down s hladnim paketom s ledom i s grupom bez hlađenja, kod pacijenata nakon
              operacije prednjeg križnog ligamenta.
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
              Izvor:{" "}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6579562/"
                className="textlink"
                target="_blank"
                rel="noopener noreferrer"
              >
                Engelhard, Hofer i Annaheim, BMJ Open Sport &amp; Exercise Medicine, 2019
              </a>
              . Randomizirana studija na 36 pacijenata, 12 u svakoj grupi.
            </p>
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
