import type { Metadata } from "next";
import { pageUrls } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Closing, PageHero, ProductCard, Safety, Steps, orderCta } from "@/components/Sections";
import { APPLICATIONS, PRODUCTS } from "@/lib/content";

export function generateStaticParams() {
  return APPLICATIONS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = APPLICATIONS.find((x) => x.slug === slug);
  if (!a) return {};
  return {
    title: a.seoTitle,
    description: a.seoDescription,
    ...pageUrls(`/primjena/${a.slug}`),
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = APPLICATIONS.find((x) => x.slug === slug);
  if (!a) notFound();
  const product = PRODUCTS.find((p) => p.slug === a.recommended)!;
  const others = APPLICATIONS.filter((x) => x.slug !== a.slug);
  const cta = orderCta(product);

  return (
    // .page-calm: mirniji tretman; .page-primjena: posebnosti stranica primjene.
    <div className="page-calm page-primjena">
      <PageHero crumbs={[{ href: "/primjena", label: "Primjena" }, { label: a.title }]} title={a.title} lead={a.lead}>
        <div className="actions">
          <Link
            href={`/narudzba?proizvod=${encodeURIComponent(product.name)}`}
            className="btn"
            aria-label={cta.ariaLabel}
          >
            {cta.text}
          </Link>
          <Link href="/kako-djeluje" className="btn btn--ghost">
            Pogledajte kako djeluje
          </Link>
        </div>
      </PageHero>

      <div className="banner-img">
        <Image src={a.image} alt={a.imageAlt} fill priority sizes="100vw" style={{ objectPosition: a.position }} />
      </div>

      <section className="sect">
        <div className="wrap split">
          <div>
            <h2 className="h2">{a.bodyTitle}</h2>
          </div>
          <div className="prose">
            {a.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="sect sect--frost" aria-labelledby="koraci">
        <div className="wrap">
          <h2 className="h2" id="koraci" style={{ marginBottom: 40 }}>
            Kako se stavlja
          </h2>
          <Steps />
        </div>
      </section>

      <section className="sect">
        <div className="wrap split">
          <div>
            <h2 className="h2">Preporučeni set</h2>
            <p className="lead mt-s">{product.forWhom}</p>
          </div>
          <div style={{ maxWidth: 520 }}>
            <ProductCard p={product} />
          </div>
        </div>
      </section>

      <section className="sect sect--tight-top">
        <div className="wrap split">
          <div>
            <h2 className="h2">Sigurnost</h2>
          </div>
          <Safety heading="h3" />
        </div>
      </section>

      <section className="sect sect--tight-top" aria-label="Ostale primjene">
        <div className="wrap">
          <ul className="segments">
            {others.map((o) => (
              <li className="segment" key={o.slug}>
                <h3>
                  <Link href={`/primjena/${o.slug}`} className="textlink">
                    {o.title}
                  </Link>
                </h3>
                <p>{o.lead}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Closing variant="calm" />
    </div>
  );
}
