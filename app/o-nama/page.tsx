import type { Metadata } from "next";
import { pageUrls } from "@/lib/seo";
import Image from "next/image";
import { Closing, Crumbs, References } from "@/components/Sections";

export const metadata: Metadata = {
  // SEO tekstovi 14.11.2026. (SEO-KLJUCNE-RIJECI.md); bez en i em crtica.
  title: { absolute: "Cool Down Hrvatska i Slovenija | Cooldown Adria" },
  description:
    "Cooldown Adria je generalni distributer švicarskog proizvođača Cool Down AG za Hrvatsku i Sloveniju: prodaja, demonstracije i podrška partnerima i kupcima.",
  ...pageUrls("/o-nama"),
};

export default function Page() {
  return (
    <div className="page-calm">
      {/* 21.11.2026.: hero s fotografijom (ranije prazna desna polovina). Fotografija je referenca
          proizvođača (dozvoljeno 14.11.2026.), a potpis kaže čija je. */}
      <section className="page-hero kd-hero">
        <div className="wrap">
          <Crumbs items={[{ label: "O nama" }]} />
          <div className="kd-hero__grid">
            <div>
              <h1 className="page-title">Švicarski proizvod, lokalna podrška.</h1>
              <p className="lead">
                Cooldown Adria je generalni distributer švicarskog proizvođača Cool Down AG za Hrvatsku i Sloveniju.
              </p>
            </div>
            <figure className="onama-fig">
              <div className="kd-hero__img">
                <Image
                  src="/img/sport/scott-sram.jpg"
                  alt="SCOTT-SRAM MTB tim s biciklima u planinama"
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 45vw"
                />
              </div>
              <figcaption>SCOTT-SRAM MTB, profesionalni tim koji prema proizvođaču koristi Cool Down.</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section className="sect sect--tight-top">
        <div className="wrap split">
          <div>
            <h2 className="h2">Proizvođač</h2>
          </div>
          <dl className="factlist">
            <div>
              <dt>Tvrtka</dt>
              <dd>Cool Down AG</dd>
            </div>
            <div>
              <dt>Sjedište</dt>
              <dd>Gaswerkstrasse 15, CH-8570 Weinfelden, Švicarska</dd>
            </div>
            <div>
              <dt>Proizvod</dt>
              <dd>Medicinski proizvod za hlađenje i ublažavanje boli kod ozljeda udova</dd>
            </div>
            <div>
              <dt>Web proizvođača</dt>
              <dd>
                <a className="textlink" href="https://cool-down.swiss" rel="noopener" target="_blank">
                  cool-down.swiss
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="sect sect--frost">
        <div className="wrap split">
          <div>
            <h2 className="h2">Cool Down u Hrvatskoj i Sloveniji</h2>
          </div>
          <div className="prose">
            <p>
              U Hrvatskoj i Sloveniji prodajemo Cool Down i pomažemo partnerima i kupcima. Za fizioterapeute,
              klubove, klinike i ljekarne organiziramo demonstracije, a kupcima pomažemo odabrati pravi set.
            </p>
          </div>
        </div>
      </section>
      <section className="sect">
        <div className="wrap">
          <References />
        </div>
      </section>
      <Closing variant="calm" />
    </div>
  );
}
