import Image from "next/image";
import Link from "next/link";
import { TempCurve } from "@/components/TempCurve";
import {
  Benefits,
  Closing,
  Comparison,
  Faq,
  PartnerBand,
  References,
  SectHead,
  SportProof,
} from "@/components/Sections";
import { StepPlayer } from "@/components/StepPlayer";
import { HeroVideo } from "@/components/HeroVideo";
import { FilmVideo } from "@/components/FilmVideo";
import { ProductChooser } from "@/components/ProductChooser";
import { APPLICATIONS } from "@/lib/content";
import type { Metadata } from "next";
import { pageUrls } from "@/lib/seo";

// Naslov i opis dolaze iz layouta; ovdje se dodaju samo canonical i og:url.
export const metadata: Metadata = { ...pageUrls("/") };

export default function Home() {
  return (
    <>
      {/* 1. Hero: redoslijed u HTML-u je naslov, video, primjene i akcije (tako ide i na mobitelu) */}
      <section className="hero">
        <div className="wrap">
          <div className="hero__grid">
            <div className="hero__intro">
              <h1 className="display hero__title">
                Hlađenje
                <br />
                bez leda.
              </h1>
              <p className="hero__sub">Ciljano hlađenje za podršku oporavku.</p>
            </div>
            <div className="hero__visual">
              <HeroVideo />
              <p className="hero__note">Hladi na 7–10 °C.</p>
            </div>
            <div className="hero__more">
              <p className="hero__uses">
                <span className="hero__use">
                  Nakon operativnih zahvata<span className="hero__sep" aria-hidden="true">•</span>
                </span>
                <span className="sr-only">,</span>{" "}
                <span className="hero__use">
                  Nakon ozljeda<span className="hero__sep" aria-hidden="true">•</span>
                </span>
                <span className="sr-only">,</span>{" "}
                <span className="hero__use">Nakon fizičkog napora</span>
              </p>
              <div className="actions" data-mobilebar-hide>
                <Link href="/narudzba" className="btn">
                  Naručite svoj set
                </Link>
                <a href="#video" className="textlink">
                  Pogledajte kako djeluje
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1a. Led naspram Cool Down */}
      <section className="curve-sect" aria-labelledby="krivulja-naslov">
        <div className="wrap">
          <div className="curve-sect__head">
            <h2 className="curve-sect__title" id="krivulja-naslov">
              Led naspram Cool Down
            </h2>
            <p className="curve-sect__lead">Kako se temperatura obloge mijenja tijekom tri sata.</p>
          </div>
          <TempCurve />
        </div>
      </section>

      {/* 1b. Video s glasom */}
      <section className="film" id="video" aria-labelledby="film-naslov">
        <div className="wrap">
          <div className="film__head">
            <h2 className="h2" id="film-naslov">
              Pogledajte kako djeluje
            </h2>
            <p className="film__lead">Od boce do omotanog koljena u šest koraka. Uključite zvuk.</p>
          </div>
          <FilmVideo />
          <p className="film__meta">Video upute · 41 s</p>
        </div>
      </section>

      {/* 2. Izbor puta */}
      <section className="paths" aria-label="Odaberite svoj put">
        <Link href="/proizvodi" className="path" style={{ textDecoration: "none" }}>
          <div className="path__img path__img--ozljeda">
            <Image src="/img/foto/nakon-ozljede.jpg" alt="" fill sizes="(max-width: 820px) 100vw, 50vw" />
          </div>
          <div className="path__panel">
            <p className="path__who">Za vas i vašu obitelj</p>
            <p className="path__title">Hlađenje kod kuće, na terenu i nakon operacije</p>
            <p className="path__text">Bez zamrzivača i bez ozeblina. Zavoj stavite i skinete sami.</p>
            <div className="actions">
              <span className="btn btn--light">Naručite svoj set</span>
            </div>
          </div>
        </Link>
        <Link href="/za-partnere" className="path path--alt" style={{ textDecoration: "none" }}>
          <div className="path__img path__img--fizio">
            <Image src="/img/foto/fizioterapija.jpg" alt="" fill sizes="(max-width: 820px) 100vw, 50vw" />
          </div>
          <div className="path__panel">
            <p className="path__who">Za fizioterapeute, klubove, klinike i ljekarne</p>
            <p className="path__title">Hlađenje koje pacijent nastavlja kod kuće</p>
            <p className="path__text">Pokažemo vam ga uživo i dogovorimo model suradnje koji vam odgovara.</p>
            <div className="actions">
              <span className="btn">Zatražite demonstraciju</span>
            </div>
          </div>
        </Link>
      </section>

      {/* 3. Prednosti */}
      <section className="sect sect--benefits" aria-labelledby="prednosti">
        <div className="wrap">
          <SectHead
            id="prednosti"
            title="Zašto ne led"
            lead="Led hladi prejako i prekratko. Cool Down hladi umjereno, ali dugo, i to je cijela razlika."
          />
          <Benefits />
        </div>
      </section>

      {/* 4. Usporedba */}
      <section className="sect sect--frost sect--compare" aria-labelledby="usporedba">
        <div className="wrap">
          <div className="compare-head">
            <h2 className="h2" id="usporedba">
              Cool Down ili led
            </h2>
            <p className="lead">Proizvođač uspoređuje Cool Down s ledom i gel oblogama. Ovo su razlike.</p>
          </div>
          <Comparison />
        </div>
      </section>

      {/* 5. Kako se koristi */}
      <section className="sect sect--steps" aria-labelledby="koraci">
        <div className="wrap">
          <SectHead
            id="koraci"
            title="Šest koraka do hlađenja"
            lead="ICE FLUID se miješa s vodom. Pamučni zavoj se natopi i omota, a preko njega ide fiksirni zavoj."
          />
          <StepPlayer />
          <div className="actions mt-m">
            <Link href="/upute" className="btn btn--ghost">
              Detaljne upute
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Primjena */}
      <section className="sect sect--tight-top sect--uses" aria-labelledby="primjena">
        <div className="wrap">
          <h2 className="sr-only" id="primjena">
            Primjena
          </h2>
          <div className="uses">
            {APPLICATIONS.map((a) => (
              <Link key={a.slug} href={`/primjena/${a.slug}`} className="use">
                <div className="use__img">
                  <Image
                    src={a.image}
                    alt=""
                    fill
                    sizes="(max-width: 820px) 100vw, 58vw"
                    style={{ objectPosition: a.position }}
                  />
                </div>
                <div>
                  <h3 className="use__title">{a.title}</h3>
                  <p className="use__lead">{a.lead}</p>
                  <span className="textlink">Više o primjeni</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Proizvodi */}
      <section className="sect sect--frost sect--products" aria-labelledby="proizvodi">
        <div className="wrap">
          <SectHead
            id="proizvodi"
            title="Odaberite svoj set"
            lead="Cijenu i uvjete dostave šaljemo na upit. Ako niste sigurni koji set trebate, pomoći ćemo vam odabrati."
          />
          <ProductChooser />
        </div>
      </section>

      {/* 8. Partneri */}
      <PartnerBand />

      {/* 9. Vrhunski sport i reference */}
      <section className="sect sect--refs" aria-label="Reference">
        <div className="wrap">
          <SportProof />
          <div className="refs-wrap">
            <References title="Klinike i klubovi" lead={null} skipSportPhotos />
          </div>
        </div>
      </section>

      {/* 10. Pitanja */}
      <section className="sect sect--faq" aria-labelledby="pitanja">
        <div className="wrap split">
          <div>
            <h2 className="h2" id="pitanja">
              Česta pitanja
            </h2>
            <p className="mt-s">
              <Link href="/pitanja" className="textlink">
                Sva pitanja
              </Link>
            </p>
          </div>
          <Faq ids={["led", "trajanje", "preko-noci", "kontraindikacije", "odabir-seta"]} />
        </div>
      </section>

      <Closing variant="calm" />
    </>
  );
}
