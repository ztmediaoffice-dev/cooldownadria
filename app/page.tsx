import Image from "next/image";
import Link from "next/link";
import { TempCurve } from "@/components/TempCurve";
import {
  Benefits,
  Closing,
  Faq,
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

// SEO naslov i opis početne (ključna riječ „hladni oblozi”, vidi SEO-KLJUCNE-RIJECI.md, odobrio korisnik 14.11.2026.).
// Bez en i em crtica u novim tekstovima (odluka korisnika 14.11.2026.).
export const metadata: Metadata = {
  title: { absolute: "Cool Down hladni oblozi: hlađenje bez leda | Cooldown Adria" },
  description:
    "Cool Down je hladni oblog bez leda i zamrzivača: pamučni zavoj s ICE FLUID-om hladi na 7 do 10 °C i nosi se 2 sata i duže. Nakon operacije, ozljede ili napora.",
  ...pageUrls("/"),
};

const LOGOS = [
  { mh: 34, file: "swiss-cycling", name: "Swiss Cycling", w: 480, h: 184 },
  { mh: 46, file: "hockey-deutschland", name: "Njemačka hokejaška reprezentacija (Deutscher Hockey-Bund)", w: 365, h: 200 },
  { mh: 44, file: "thoemus-maxon", name: "Thömus maxon", w: 480, h: 197 },
  { mh: 34, file: "scott-sram", name: "SCOTT-SRAM MTB", w: 480, h: 124 },
  { mh: 54, file: "spital-muri", name: "Spital Muri", w: 239, h: 200 },
  { mh: 44, file: "altius", name: "ALTIUS Swiss Sportmed Center", w: 459, h: 200 },
  { mh: 44, file: "orthopaedie-st-gallen", name: "Orthopädie St. Gallen", w: 432, h: 182 },
  { mh: 30, file: "gelenkzentrum-winterthur", name: "Gelenkzentrum Winterthur", w: 480, h: 115 },
];

export default function Home() {
  return (
    <>
      {/* 1. Hero: redoslijed u HTML-u je naslov s uvodom, video i akcije (tako ide i na mobitelu).
          Obavezna poruka o primjeni je u uvodu kao rečenica (gerilsko testiranje, 14.11.2026.). */}
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
              <p className="hero__lead">
                Cool Down je hladni oblog koji ne treba zamrzivač, za hlađenje nakon operativnih zahvata, nakon
                ozljeda i nakon fizičkog napora. ICE FLUID pomiješate s vodom, natopite pamučni zavoj i omotate
                koljeno, gležanj ili rame. Zavoj se nosi 2 sata i duže i ne ograničava pokrete.
              </p>
            </div>
            <div className="hero__visual">
              <HeroVideo />
              <p className="hero__note">Hladi na 7 do 10&nbsp;°C.</p>
            </div>
            <div className="hero__more">
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

      {/* 1c. Logotipi referenci odmah ispod heroja (16.11.2026., po uzoru na cool-down.ch).
          Reference proizvođača smijemo koristiti (potvrđeno 14.11.2026.); logotipi su sa cool-down.ch. */}
      <section className="logos" aria-labelledby="logos-naslov">
        <div className="wrap">
          <h2 className="logos__title" id="logos-naslov">
            Prema proizvođaču, Cool Down koriste
          </h2>
          <ul className="logos__list">
            {LOGOS.map((l) => (
              <li key={l.file}>
                <Image
                  src={`/img/logos/${l.file}.png`}
                  alt={l.name}
                  width={l.w}
                  height={l.h}
                  sizes="160px"
                  style={{ ["--mh" as string]: `${l.mh}px` }}
                />
              </li>
            ))}
          </ul>
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
            <p className="path__text">Hladni oblog bez zamrzivača i bez ozeblina. Zavoj stavite i skinete sami.</p>
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
            <p className="path__text">Dolazimo na demonstraciju u vašu ordinaciju ili klub i zajedno biramo model suradnje.</p>
            <div className="actions">
              <span className="btn">Zatražite demonstraciju</span>
            </div>
          </div>
        </Link>
      </section>

      {/* 5. Kako se koristi */}
      <section className="sect sect--steps" aria-labelledby="koraci">
        <div className="wrap">
          <SectHead
            id="koraci"
            title="Kako se stavlja: šest koraka"
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
            Hladni oblozi nakon operacije, ozljeda i napora
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

      {/* 3. Zašto ne led: grafikon i prednosti u jednoj sekciji (16.11.2026.). Ranije su to bile
          tri sekcije s istom porukom (prednosti, tabela i grafikon). Tabela je ostala na /kako-djeluje. */}
      <section className="curve-sect" aria-labelledby="krivulja-naslov">
        <div className="wrap">
          <div className="curve-sect__head">
            <h2 className="curve-sect__title" id="krivulja-naslov">
              Zašto ne led
            </h2>
            <p className="curve-sect__lead">
              Led hladi prejako i prekratko. Cool Down hladi umjereno, ali dugo, i to je cijela razlika.
            </p>
          </div>
          <TempCurve />
          <div className="curve-sect__benefits">
            <Benefits />
          </div>
          <p className="mt-m">
            <Link href="/kako-djeluje" className="textlink">
              Usporedba s ledom i studija
            </Link>
          </p>
        </div>
      </section>

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
