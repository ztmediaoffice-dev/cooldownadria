import type { Metadata } from "next";
import { pageUrls } from "@/lib/seo";
import Link from "next/link";
import { Closing, PageHero, ProductGrid } from "@/components/Sections";
import { PARTS_OPTION, SINGLE_ITEMS } from "@/lib/content";

export const metadata: Metadata = {
  // SEO tekstovi 14.11.2026. (SEO-KLJUCNE-RIJECI.md); bez en i em crtica.
  title: "Zavoj za hlađenje: Cool Down setovi",
  description:
    "Cool Down zavoj za hlađenje bez leda: PROFESSIONAL SET, FIRST AID SET i FIX AID. ICE FLUID, pamučni i fiksirni zavoji. Cijena na upit, uz uvjete dostave.",
  ...pageUrls("/proizvodi"),
};

export default function Page() {
  return (
    <div className="page-calm">
      <PageHero
        crumbs={[{ label: "Proizvodi" }]}
        title="Cool Down setovi i dijelovi"
        lead="Svaki set sadrži ICE FLUID koncentrat i pamučni zavoj za hlađenje. Cijenu i uvjete dostave šaljemo na upit."
      />
      <section className="sect sect--tight-top">
        <div className="wrap">
          <ProductGrid />
        </div>
      </section>
      <section className="sect sect--frost" id="pojedinacno" aria-labelledby="pojedinacno-h">
        <div className="wrap split">
          <div>
            <h2 className="h2" id="pojedinacno-h">
              Pojedinačni dijelovi
            </h2>
            <p className="lead mt-s">Za dopunu seta ili za ordinacije koje troše više.</p>
          </div>
          <div>
            <ul className="product__list" style={{ marginTop: 0 }}>
              {SINGLE_ITEMS.map((i) => (
                <li key={i} style={{ fontSize: "var(--t-m)", padding: "16px 0" }}>
                  {i}
                </li>
              ))}
            </ul>
            <div className="actions">
              <Link href={`/narudzba?proizvod=${encodeURIComponent(PARTS_OPTION)}`} className="btn">
                Pošaljite upit za dijelove
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Closing variant="calm" />
    </div>
  );
}
