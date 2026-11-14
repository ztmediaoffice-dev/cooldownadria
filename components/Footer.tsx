import Link from "next/link";
import { SITE } from "@/lib/site";
import { PRODUCTS } from "@/lib/content";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link href="/" className="footer__logo" aria-label="Cooldown Adria, početna">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-bijeli.svg" alt="Cooldown Adria" width={77} height={44} />
            </Link>
            <p className="footer__about">
              Generalni distributer švicarskog proizvođača Cool Down AG za Hrvatsku i Sloveniju.
            </p>
          </div>
          <div>
            <h2>Proizvodi</h2>
            <ul>
              {PRODUCTS.map((p) => (
                <li key={p.slug}>
                  <Link href={`/proizvodi/${p.slug}`}>{p.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/proizvodi#pojedinacno">Pojedinačni dijelovi</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Informacije</h2>
            <ul>
              <li>
                <Link href="/kako-djeluje">Kako djeluje</Link>
              </li>
              <li>
                <Link href="/primjena">Primjena</Link>
              </li>
              <li>
                <Link href="/upute">Upute i sigurnost</Link>
              </li>
              <li>
                <Link href="/za-partnere">Za poslovne partnere</Link>
              </li>
              <li>
                <Link href="/pitanja">Česta pitanja</Link>
              </li>
              <li>
                <Link href="/o-nama">O nama</Link>
              </li>
            </ul>
          </div>
          <div className="footer__contact">
            <h2>Kontakt</h2>
            <ul>
              <li>
                <a href={`mailto:${SITE.email}`}>
                  {/* prijelom smije ići iza @, da adresa ne širi usku kolonu */}
                  {SITE.email.split("@")[0]}@<wbr />
                  {SITE.email.split("@")[1]}
                </a>
              </li>
              {SITE.phone ? (
                <li>
                  <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
                </li>
              ) : null}
              <li>
                <Link href="/kontakt">Pošaljite poruku</Link>
              </li>
              <li className="footer__static">{SITE.delivery}</li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p>
            Cool Down je medicinski proizvod. Prije uporabe pročitajte upute. Proizvođač: Cool Down AG,
            Weinfelden, Švicarska.
          </p>
          <ul style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <li>
              <Link href="/impressum">Impressum</Link>
            </li>
            <li>
              <Link href="/privatnost">Privatnost</Link>
            </li>
            <li>
              <Link href="/kolacici">Kolačići</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
