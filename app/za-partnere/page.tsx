import type { Metadata } from "next";
import { pageUrls } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { InquiryForm } from "@/components/InquiryForm";
import { Crumbs, References } from "@/components/Sections";
import { PARTNER_MODELS, PARTNER_SEGMENTS } from "@/lib/content";

export const metadata: Metadata = {
  // SEO tekstovi 14.11.2026. (SEO-KLJUCNE-RIJECI.md); bez en i em crtica.
  title: "Hladni oblozi za fizioterapeute i klubove",
  description:
    "Cool Down za fizioterapeute, sportske klubove, klinike, ljekarne i teretane. Zatražite demonstraciju, uzorak ili poslovnu ponudu za hlađenje bez leda.",
  ...pageUrls("/za-partnere"),
};

export default function Page() {
  return (
    // .page-calm: mirniji tretman; .page-partneri: posebnosti ove stranice.
    <div className="page-calm page-partneri">
      {/* Redizajn 16.11.2026.: hero s fotografijom proizvoda (umjesto banera preko cijele širine),
          kartice umjesto lista, reference prije obrasca, obrazac na kraju. Tekstovi su isti. */}
      <section className="page-hero kd-hero">
        <div className="wrap">
          <Crumbs items={[{ label: "Za partnere" }]} />
          <div className="kd-hero__grid">
            <div>
              <h1 className="page-title">Hlađenje koje pacijent nastavlja kod kuće.</h1>
              <p className="lead">
                Cool Down je nov na hrvatskom tržištu. Demonstraciju održavamo kod vas, u ordinaciji, klubu ili
                ljekarni, a model suradnje dogovaramo prema vašim potrebama.
              </p>
              <div className="actions">
                {/* Donja traka se pojavljuje tek kad je ovaj CTA prošao (postojeći mehanizam MobileBar). */}
                <Link href="#zahtjev" className="btn" data-mobilebar-hide="">
                  Zatražite demonstraciju
                </Link>
                <Link href="/kako-djeluje#studija" className="btn btn--ghost">
                  Studija proizvođača
                </Link>
              </div>
            </div>
            <div className="kd-hero__img kd-hero__img--product">
              <Image
                src="/img/proizvodi/professional-set.jpg"
                alt="Cool Down PROFESSIONAL SET: boca ICE FLUID-a, pamučni i fiksirni zavoj te mješalica"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="sect" aria-labelledby="kome">
        <div className="wrap">
          <div className="kd-head">
            <h2 className="h2" id="kome">
              Za koga
            </h2>
          </div>
          <ul className="zp-cards">
            {PARTNER_SEGMENTS.map((s) => (
              <li className="zp-card" key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sect sect--ink sect--partners" aria-labelledby="modeli">
        <div className="wrap">
          <div className="sect-head">
            <h2 className="h2" id="modeli">
              Tri načina suradnje
            </h2>
            <p className="lead">
              Nabavne uvjete, početni paket i edukaciju dogovaramo osobno, prema modelu koji odaberete.
            </p>
          </div>
          <ul className="models">
            {PARTNER_MODELS.map((m, i) => (
              <li className="model" key={m.title}>
                <p className="zp-num" aria-hidden="true">
                  0{i + 1}
                </p>
                <h3 className="model__title">{m.title}</h3>
                <p className="model__text">{m.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sect sect--frost" aria-labelledby="sto-dobivate">
        <div className="wrap">
          <div className="kd-head">
            <h2 className="h2" id="sto-dobivate">
              Što dobivate
            </h2>
          </div>
          <dl className="zp-cards">
            {[
              ["Demonstraciju", "Primjenu demonstriramo na licu mjesta, vama i vašem timu."],
              ["Uzorak", "Isprobajte Cool Down u svom radu prije prve narudžbe."],
              ["Edukaciju", "Primjena, indikacije, kontraindikacije i kako proizvod objasniti pacijentu."],
              ["Materijale", "Upute i materijale za pacijente i prodajno mjesto na hrvatskom."],
            ].map(([t, d]) => (
              <div className="zp-card zp-card--white" key={t}>
                <dt>{t}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="sect sect--refs" aria-label="Reference">
        <div className="wrap">
          <References />
        </div>
      </section>

      {/* Dok je obrazac na ekranu, donja traka se ne prikazuje (ista akcija). */}
      <section className="sect sect--frost" id="zahtjev" aria-labelledby="zahtjev-h" data-mobilebar-hide-visible="">
        <div className="wrap split">
          <div>
            <h2 className="h2" id="zahtjev-h">
              Zatražite demonstraciju
            </h2>
            <p className="lead mt-s">Ili uzorak, ili poslovnu ponudu.</p>
            {/* Opis prati izabranu vrstu u obrascu (CSS :has, isto kao na /zahtjev). */}
            <p className="mt-s next__item next__item--demonstracija">
              <strong>Što slijedi:</strong> javimo se da dogovorimo termin. Demonstracija je kod vas, u ordinaciji,
              klubu ili ljekarni.
            </p>
            <p className="mt-s next__item next__item--uzorak">
              <strong>Što slijedi:</strong> javimo se da dogovorimo pojedinosti oko uzorka.
            </p>
            <p className="mt-s next__item next__item--ponuda">
              <strong>Što slijedi:</strong> javimo se da razjasnimo što vam treba i dogovorimo pojedinosti ponude.
            </p>
          </div>
          <InquiryForm mode="zahtjev" />
        </div>
      </section>

    </div>
  );
}
