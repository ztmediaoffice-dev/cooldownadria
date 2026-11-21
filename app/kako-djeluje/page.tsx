import type { Metadata } from "next";
import { pageUrls } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { TempCurve } from "@/components/TempCurve";
import { Closing, Comparison, Crumbs } from "@/components/Sections";

export const metadata: Metadata = {
  // SEO tekstovi 14.11.2026. (SEO-KLJUCNE-RIJECI.md); bez en i em crtica.
  title: "Led ili hladni oblog: kako djeluje Cool Down",
  description:
    "Led pada prema 0 °C i mora se skidati. Cool Down hladi isparavanjem na 7 do 10 °C, bez ozeblina, 2 sata i duže. Usporedba s ledom i studija.",
  ...pageUrls("/kako-djeluje"),
};

// Redizajn 16.11.2026.: hero s fotografijom, tri ključna podatka umjesto liste od šest redova,
// grafikon, usporedba s ledom i studija kao vremenska linija. Tekstovi i tvrdnje su isti kao prije.
// Lista „Četiri razloga” je uklonjena s ove stranice (ponavljala je tabelu i studiju); ostaje na početnoj.
const FACTS = [
  { value: "7 do 10 °C", label: "Na kojoj temperaturi", text: "Bez ozeblina, za razliku od leda." },
  {
    value: "2 sata i duže",
    label: "Koliko dugo",
    text: "Zavoj hladi dok se ne osuši, a hlađenje se može ponavljati koliko treba.",
  },
  { value: "oko 40", label: "Primjena iz jedne boce", text: "Boca ICE FLUID-a od 250 ml dovoljna je za oko 40 primjena." },
];

const STUDY = [
  { day: "30", text: "Mišićni presjek se nije značajno smanjio." },
  { day: "60", text: "Mišićni presjek je porastao." },
  { day: "90", text: "Mišićni presjek je statistički značajno porastao." },
];

export default function Page() {
  return (
    <div className="page-calm page-kako-djeluje">
      <section className="page-hero kd-hero">
        <div className="wrap">
          <Crumbs items={[{ label: "Kako djeluje" }]} />
          <div className="kd-hero__grid">
            <div>
              <h1 className="page-title">Hladi dugo, a ne prejako.</h1>
              <p className="lead">
                Pamučni zavoj natopljen ICE FLUID-om hladni je oblog koji djeluje isparavanjem. Zavoj hladi na 7 do
                10 °C dok se ne osuši, pa ga možete nositi 2 sata i duže.
              </p>
              <div className="actions">
                <Link href="/narudzba" className="btn">
                  Naručite svoj set
                </Link>
                <Link href="/upute" className="btn btn--ghost">
                  Upute za primjenu
                </Link>
              </div>
            </div>
            <div className="kd-hero__img">
              <Image
                src="/img/foto/priprema.jpg"
                alt="Pamučni zavoj se vadi iz posude s ICE FLUID-om, pokraj boce Cool Downa"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 45vw"
                style={{ objectPosition: "60% 40%" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="sect sect--frost" aria-labelledby="princip">
        <div className="wrap">
          <div className="kd-head">
            <h2 className="h2" id="princip">
              Kako hladi bez leda
            </h2>
            <p className="lead">Prirodno, isparavanjem i aktivacijom receptora za hladnoću.</p>
          </div>
          <dl className="kd-facts">
            {FACTS.map((f) => (
              <div className="kd-fact" key={f.label}>
                <dt>
                  <span className="kd-fact__value">{f.value}</span>
                  <span className="kd-fact__label">{f.label}</span>
                </dt>
                <dd>{f.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="curve-sect" aria-labelledby="krivulja-naslov">
        <div className="wrap">
          <div className="curve-sect__head">
            <h2 className="curve-sect__title" id="krivulja-naslov">
              Led ili Cool Down
            </h2>
            <p className="curve-sect__lead">Kako se temperatura obloga mijenja tijekom tri sata.</p>
          </div>
          <TempCurve />
        </div>
      </section>

      <section className="sect sect--frost sect--compare" aria-labelledby="usporedba">
        <div className="wrap">
          <div className="compare-head">
            <h2 className="h2" id="usporedba">
              Led na oteklinu ili hladni oblog
            </h2>
            {/* SEO 16.11.2026.: led na oteklinu, led na koljeno, led na ozljedu, ledeni oblog.
                Iste tvrdnje kao u tabeli i u pitanju „Je li ovo isto kao led?”. */}
            <p className="lead mt-s">
              Led na koljeno, na ozljedu ili na oteklinu hladi naglo i pada prema 0&nbsp;°C, pa se ledeni oblog mora
              skidati. U tablici je usporedba hladnog obloga Cool Down i leda po pet svojstava.
            </p>
          </div>
          <Comparison />
        </div>
      </section>

      <section className="sect" aria-labelledby="studija-naslov" id="studija">
        <div className="wrap">
          <div className="kd-head">
            <h2 className="h2" id="studija-naslov">
              Studija nakon operacije koljena
            </h2>
            <p className="lead">
              Engelhard, Hofer i Annaheim usporedili su tri skupine pacijenata nakon operacije prednjeg križnog
              ligamenta: s Cool Downom, s hladnim paketom s ledom i bez hlađenja.
            </p>
          </div>
          <ol className="kd-study">
            {STUDY.map((s) => (
              <li className="kd-study__item" key={s.day}>
                <p className="kd-study__day">
                  Nakon <span>{s.day}</span> dana
                </p>
                <p className="kd-study__text">{s.text}</p>
              </li>
            ))}
          </ol>
          <dl className="factlist kd-study__more">
            <div>
              <dt>Lijekovi protiv bolova</dt>
              <dd>Potrošnja je bila manja nego uz led ili bez hlađenja, ali razlika nije statistički značajna.</dd>
            </div>
          </dl>
          <div className="kd-study__source">
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
              . Randomizirana studija na 36 pacijenata, 12 u svakoj skupini.
            </p>
            <p>Podatke navodi proizvođač Cool Down AG, a detalje studije daje na upit.</p>
            <p>
              Fizioterapeuti i liječnici mogu ih{" "}
              <Link href="/zahtjev?vrsta=demonstracija" className="textlink">
                zatražiti uz demonstraciju
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <Closing variant="calm" />
    </div>
  );
}
