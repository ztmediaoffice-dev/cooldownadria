import type { Metadata } from "next";
import { pageUrls } from "@/lib/seo";
import { PageHero } from "@/components/Sections";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Impressum", ...pageUrls("/impressum") };

const missing = "[podatak u pripremi]";

export default function Page() {
  return (
    <div className="page-calm">
      <PageHero crumbs={[{ label: "Impressum" }]} title="Impressum" />
      <section className="sect sect--tight-top">
        <div className="wrap">
          <dl className="factlist" style={{ maxWidth: 860 }}>
            <div>
              <dt>Tvrtka</dt>
              <dd>{SITE.company.name || missing}</dd>
            </div>
            <div>
              <dt>Sjedište</dt>
              <dd>{SITE.company.address || missing}</dd>
            </div>
            <div>
              <dt>OIB</dt>
              <dd>{SITE.company.oib || missing}</dd>
            </div>
            <div>
              <dt>E-mail</dt>
              <dd>{SITE.email}</dd>
            </div>
            <div>
              <dt>Djelatnost</dt>
              <dd>Generalni distributer Cool Down AG za Hrvatsku i Sloveniju</dd>
            </div>
            <div>
              <dt>Proizvođač</dt>
              <dd>Cool Down AG, Gaswerkstrasse 15, CH-8570 Weinfelden, Švicarska</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
