import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Closing, Crumbs, ProductCard, Safety, Steps, orderCta } from "@/components/Sections";
import { PRODUCTS } from "@/lib/content";
import { Advantages } from "@/components/Advantages";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.seoTitle,
    description: p.seoDescription,
    alternates: { canonical: `/proizvodi/${p.slug}` },
    openGraph: { url: `/proizvodi/${p.slug}`, images: [{ url: p.image, width: 1080, height: 1080, alt: p.imageAlt }] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) notFound();
  const others = PRODUCTS.filter((x) => x.slug !== p.slug);
  const cta = orderCta(p);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Cool Down ${p.name}`,
    image: `${SITE.url}${p.image}`,
    description: `${p.short} ${p.contents.join(", ")}.`,
    brand: { "@type": "Brand", name: "Cool Down" },
    manufacturer: { "@type": "Organization", name: "Cool Down AG" },
  };

  return (
    <div className="page-calm">
      <section className="page-hero">
        <div className="wrap">
          <Crumbs items={[{ href: "/proizvodi", label: "Proizvodi" }, { label: p.name }]} />
          <div className="pd">
            <div className="pd__img">
              <Image src={p.image} alt={p.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
            <div>
              <h1 className="page-title">{p.name}</h1>
              <p className="lead">{p.forWhom}</p>
              <p className="pd__claim mt-m">Hladi na 7 do 10&nbsp;°C</p>
              <dl className="factlist mt-m">
                <div>
                  <dt>Sadržaj</dt>
                  <dd>
                    <ul>
                      {p.contents.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                {p.uses ? (
                  <div>
                    <dt>Dovoljno za</dt>
                    <dd>{p.uses}</dd>
                  </div>
                ) : null}
                <div>
                  <dt>Nošenje</dt>
                  <dd>2 sata i duže, bez ograničenja pokretljivosti</dd>
                </div>
                <div>
                  <dt>Cijena</dt>
                  <dd>Na upit, zajedno s uvjetima dostave</dd>
                </div>
              </dl>
              <div className="actions mt-m">
                <Link
                  href={`/narudzba?proizvod=${encodeURIComponent(p.name)}`}
                  className="btn"
                  aria-label={cta.ariaLabel}
                >
                  {cta.text}
                </Link>
                <Link href="/zahtjev" className="btn btn--ghost">
                  Zatražite demonstraciju
                </Link>
              </div>
              <div className="mt-l">
                <Safety heading="h2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sect sect--adv" aria-labelledby="prednosti">
        <div className="wrap">
          <h2 className="h2" id="prednosti">
            Prednosti prema proizvođaču
          </h2>
          <Advantages p={p} />
        </div>
      </section>

      {p.slug !== "fix-aid" ? (
        <section className="sect sect--frost" aria-labelledby="koraci">
          <div className="wrap">
            <h2 className="h2" id="koraci" style={{ marginBottom: 40 }}>
              Kako se stavlja
            </h2>
            <Steps />
          </div>
        </section>
      ) : (
        <section className="sect sect--frost">
          <div className="wrap split">
            <h2 className="h2">Otvori, omotaj, gotovo.</h2>
            <p className="lead">
              FIX AID je već natopljen. Izvadite zavoj iz vrećice i omotajte ga u jednom sloju, prema srcu.
            </p>
          </div>
        </section>
      )}

      <section className="sect">
        <div className="wrap">
          <h2 className="h2" style={{ marginBottom: 40 }}>
            Ostali proizvodi
          </h2>
          <div className="products products--pair">
            {others.map((o) => (
              <ProductCard key={o.slug} p={o} />
            ))}
          </div>
        </div>
      </section>
      <Closing variant="calm" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
