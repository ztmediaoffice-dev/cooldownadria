import type { Metadata } from "next";
import { pageUrls } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { InquiryForm } from "@/components/InquiryForm";
import { PageHero, References } from "@/components/Sections";
import { PARTNER_MODELS, PARTNER_SEGMENTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Za poslovne partnere",
  description:
    "Za fizioterapeute, sportske klubove, klinike, ljekarne i teretane. Zatražite demonstraciju, uzorak ili poslovnu ponudu za Cool Down.",
  ...pageUrls("/za-partnere"),
};

export default function Page() {
  return (
    // .page-calm: mirniji tretman; .page-partneri: posebnosti ove stranice.
    <div className="page-calm page-partneri">
      <PageHero
        crumbs={[{ label: "Za partnere" }]}
        title="Hlađenje koje pacijent nastavlja kod kuće."
        lead="Cool Down je nov na hrvatskom tržištu. Pokažemo vam ga uživo, u vašoj ordinaciji, klubu ili ljekarni, i dogovorimo model suradnje koji vam odgovara."
      >
        <div className="actions">
          {/* Donja traka se pojavljuje tek kad je ovaj CTA prošao (postojeći mehanizam MobileBar). */}
          <Link href="#zahtjev" className="btn" data-mobilebar-hide="">
            Zatražite demonstraciju
          </Link>
          <Link href="/kako-djeluje#studija" className="btn btn--ghost">
            Studija proizvođača
          </Link>
        </div>
      </PageHero>

      <div className="banner-img">
        <Image
          src="/img/foto/fizioterapija.jpg"
          alt="Osoba izvodi vježbu s elastičnom trakom dok joj druga osoba pridržava ruku."
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: "50% 40%" }}
        />
      </div>

      <section className="sect" aria-labelledby="kome">
        <div className="wrap">
          <h2 className="h2" id="kome" style={{ marginBottom: 40 }}>
            Za koga
          </h2>
          <ul className="segments">
            {PARTNER_SEGMENTS.map((s) => (
              <li className="segment" key={s.title}>
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
            {PARTNER_MODELS.map((m) => (
              <li className="model" key={m.title}>
                <h3 className="model__title">{m.title}</h3>
                <p className="model__text">{m.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sect" aria-labelledby="sto-dobivate">
        <div className="wrap split">
          <div>
            <h2 className="h2" id="sto-dobivate">
              Što dobivate
            </h2>
          </div>
          <dl className="factlist">
            <div>
              <dt>Demonstraciju</dt>
              <dd>Pokažemo primjenu na licu mjesta, vama i vašem timu.</dd>
            </div>
            <div>
              <dt>Uzorak</dt>
              <dd>Isprobajte Cool Down u svom radu prije prve narudžbe.</dd>
            </div>
            <div>
              <dt>Edukaciju</dt>
              <dd>Primjena, indikacije, kontraindikacije i kako proizvod objasniti pacijentu.</dd>
            </div>
            <div>
              <dt>Materijale</dt>
              <dd>Upute i materijale za pacijente i prodajno mjesto na hrvatskom.</dd>
            </div>
          </dl>
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

      <section className="sect">
        <div className="wrap">
          <References />
        </div>
      </section>
    </div>
  );
}
