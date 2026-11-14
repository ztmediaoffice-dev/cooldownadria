import type { Metadata } from "next";
import { pageUrls } from "@/lib/seo";
import { InquiryForm } from "@/components/InquiryForm";
import { PageHero } from "@/components/Sections";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Pišite nam za pitanja o proizvodu, narudžbi ili suradnji.",
  ...pageUrls("/kontakt"),
};

export default function Page() {
  return (
    <div className="page-calm">
      <PageHero crumbs={[{ label: "Kontakt" }]} title="Kontakt" lead="Pitanje o proizvodu, narudžbi ili suradnji? Pišite nam." />
      <section className="sect sect--tight-top">
        <div className="wrap split">
          <div className="aside-card">
            <p>
              <strong>E-mail</strong>
              <br />
              <a className="textlink" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </p>
            {SITE.phone ? (
              <p>
                <strong>Telefon</strong>
                <br />
                <a className="textlink" href={`tel:${SITE.phone.replace(/\s/g, "")}`}>
                  {SITE.phone}
                </a>
              </p>
            ) : null}
            {SITE.whatsapp ? (
              <p>
                <a className="btn btn--ghost" href={`https://wa.me/${SITE.whatsapp}`} rel="noopener" target="_blank">
                  Pišite na WhatsApp
                </a>
              </p>
            ) : null}
          </div>
          <InquiryForm mode="kontakt" />
        </div>
      </section>
    </div>
  );
}
