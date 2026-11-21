import type { Metadata } from "next";
import { pageUrls } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { Closing, PageHero } from "@/components/Sections";
import { APPLICATIONS } from "@/lib/content";

export const metadata: Metadata = {
  // SEO tekstovi 14.11.2026. (SEO-KLJUCNE-RIJECI.md); bez en i em crtica.
  title: "Primjena hladnog obloga Cool Down",
  description:
    "Hladni oblog nakon operativnih zahvata, nakon ozljeda i nakon fizičkog napora. Cool Down hladi na 7 do 10 °C i nosi se 2 sata i duže.",
  ...pageUrls("/primjena"),
};

export default function Page() {
  return (
    // .page-calm: mirniji tretman; .page-primjena: posebnosti stranica primjene.
    <div className="page-calm page-primjena page-primjena-index">
      <PageHero
        crumbs={[{ label: "Primjena" }]}
        title={
          // Obavezna poruka. Od 21.11.2026. svaka fraza je u svom redu, bez točaka „•” na kraju reda.
          <>
            <span className="title-part">Nakon operativnih zahvata,</span>{" "}
            <span className="title-part">nakon ozljeda</span>{" "}
            <span className="title-part">i nakon fizičkog napora.</span>
          </>
        }
        lead="Hladni oblozi Cool Down koriste se u tri situacije. Indikacije prema proizvođaču su uganuća, nagnječenja, tupe ozljede i istegnuća udova. Za liječnike i fizioterapeute proizvođač navodi i primjenu u ortopediji nakon operacije, u rehabilitaciji, za regeneraciju mišića te kod boli zbog reume i artritisa."
      />
      <section className="sect sect--tight-top sect--uses">
        <div className="wrap">
          <div className="uses">
            {APPLICATIONS.map((a) => (
              <Link key={a.slug} href={`/primjena/${a.slug}`} className="use">
                <div className="use__img">
                  <Image
                    src={a.image}
                    alt={a.imageAlt}
                    fill
                    sizes="(max-width: 820px) 100vw, 58vw"
                    style={{ objectPosition: a.position }}
                  />
                </div>
                <div>
                  <h2 className="use__title">{a.title}</h2>
                  <p className="use__lead">{a.lead}</p>
                  <span className="textlink">Više o primjeni</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Closing variant="calm" />
    </div>
  );
}
