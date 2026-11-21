import type { Metadata } from "next";
import { pageUrls } from "@/lib/seo";
import { PageHero } from "@/components/Sections";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pravila privatnosti",
  description: "Kako Cooldown Adria prikuplja, koristi i čuva osobne podatke iz narudžbi, zahtjeva i poruka te koja su vaša prava.",
  ...pageUrls("/privatnost") };

export default function Page() {
  const company = SITE.company.name || "Cooldown Adria";
  return (
    <div className="page-calm">
      <PageHero crumbs={[{ label: "Privatnost" }]} title="Pravila privatnosti" />
      <section className="sect sect--tight-top">
        <div className="wrap">
          <div className="prose">
            <p>
              Voditelj obrade je {company}
              {SITE.company.address ? `, ${SITE.company.address}` : ""}. Za pitanja o osobnim podacima pišite na{" "}
              <a className="textlink" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              .
            </p>
            <h2>Koje podatke prikupljamo</h2>
            <p>
              Kad pošaljete narudžbu, zahtjev ili poruku, prikupljamo podatke koje upišete: ime i prezime, e-mail,
              telefon, grad, naziv ustanove i sadržaj poruke. Uz upit bilježimo i stranicu s koje je poslan te izvor
              dolaska na stranicu, na primjer oglas ili tiskani materijal.
            </p>
            <h2>Zašto</h2>
            <p>
              Podatke koristimo samo da odgovorimo na vaš upit, pošaljemo ponudu i dogovorimo isporuku ili
              demonstraciju. Pravna osnova je vaša privola i poduzimanje radnji prije sklapanja ugovora.
            </p>
            <h2>Koliko dugo</h2>
            <p>
              Podatke čuvamo dok je to potrebno za obradu upita i poslovni odnos te onoliko koliko to zahtijevaju propisi.
            </p>
            <h2>Tko ih još vidi</h2>
            <p>
              Upit se dostavlja e-poštom preko pružatelja usluge slanja e-pošte. Podatke ne prodajemo i ne dajemo
              trećima za njihov marketing.
            </p>
            <h2>Vaša prava</h2>
            <p>
              Možete zatražiti uvid u podatke, njihov ispravak ili brisanje, ograničenje obrade i prijenos podataka te povući
              privolu u bilo kojem trenutku. Pritužbu možete podnijeti Agenciji za zaštitu osobnih podataka (AZOP).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
