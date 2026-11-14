import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  BENEFITS,
  COMPARISON,
  FAQ,
  PARTNER_MODELS,
  PRODUCTS,
  REFERENCES,
  SAFETY,
  SPORT,
  STEPS,
  type Product,
} from "@/lib/content";

export function SectHead({ title, lead, id }: { title: ReactNode; lead?: ReactNode; id?: string }) {
  return (
    <div className="sect-head">
      <h2 className="h2" id={id}>
        {title}
      </h2>
      {lead ? <p className="lead">{lead}</p> : null}
    </div>
  );
}

export function Crumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Putanja">
      <ol className="crumbs">
        <li>
          <Link href="/">Početna</Link>
        </li>
        {items.map((i) =>
          i.href ? (
            <li key={i.label}>
              <Link href={i.href}>{i.label}</Link>
            </li>
          ) : (
            <li key={i.label} aria-current="page">
              {i.label}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}

export function PageHero({
  crumbs,
  title,
  lead,
  children,
}: {
  crumbs: { href?: string; label: string }[];
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <Crumbs items={crumbs} />
        <h1 className="page-title">{title}</h1>
        {lead ? <p className="lead">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}

export function Benefits() {
  return (
    <ul className="benefits">
      {BENEFITS.map((b) => (
        <li className="benefit" key={b.title}>
          <h3 className="benefit__title">{b.title}</h3>
          <p className="benefit__text">{b.text}</p>
          {b.source ? (
            <Link href="/kako-djeluje#studija" className="source">
              Prema proizvođaču
            </Link>
          ) : (
            <span />
          )}
        </li>
      ))}
    </ul>
  );
}

export function Comparison() {
  // Eksplicitne ARIA uloge čuvaju semantiku tabele i kad se na mobitelu prikazuje
  // kao blokovi. Vidljive oznake stupaca u ćelijama su aria-hidden, jer čitač ekrana
  // stupac već dobiva iz zaglavlja (koje je na mobitelu samo vizualno skriveno).
  return (
    <table className="compare" role="table">
      <caption className="sr-only">Usporedba Cool Down zavoja i leda ili gel obloge</caption>
      <thead role="rowgroup">
        <tr role="row">
          <th scope="col" role="columnheader">
            <span className="sr-only">Svojstvo</span>
          </th>
          <th scope="col" role="columnheader" className="cd">
            Cool Down
          </th>
          <th scope="col" role="columnheader" className="ice">
            Led ili gel obloga
          </th>
        </tr>
      </thead>
      <tbody role="rowgroup">
        {COMPARISON.map((r) => (
          <tr key={r.row} role="row">
            <th scope="row" role="rowheader">
              {r.row}
            </th>
            <td className="cd" role="cell">
              <span className="compare__lbl" aria-hidden="true">
                Cool Down:{" "}
              </span>
              {r.cd}
            </td>
            <td className="ice" role="cell">
              <span className="compare__lbl" aria-hidden="true">
                Led ili gel obloga:{" "}
              </span>
              {r.ice}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Steps() {
  return (
    <ol className="steps">
      {STEPS.map((s) => (
        <li className="step" key={s.img}>
          <Image src={s.img} alt="" width={333} height={333} />
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

// Kartica za izbor seta na početnoj: fotografija i naziv su JEDAN link na stranicu
// proizvoda, a CTA je izvan njega. Red "Preporučeno za vas" (ispod naziva, izvan linka)
// ima rezerviran prostor i vidljiv je samo na preporučenoj kartici, pa se sadržaj ne pomiče.
export function ChooserCard({ p, recommended }: { p: Product; recommended: boolean }) {
  const ctaText = p.slug === "fix-aid" ? "Naručite FIX AID" : "Naručite svoj set";
  return (
    <article className={`product product--chooser${recommended ? " product--feature" : ""}`}>
      <Link href={`/proizvodi/${p.slug}`} className="product__head">
        <div className="product__img">
          <Image src={p.image} alt="" fill sizes="(max-width: 960px) 90vw, 30vw" />
        </div>
        <div className="product__head-text">
          <h3 className="product__name">{p.name}</h3>
        </div>
      </Link>
      <div className="product__body">
        <p className="product__rec" aria-hidden={!recommended}>
          Preporučeno za vas
        </p>
        <p className="product__short">{p.short}</p>
        <ul className="product__list">
          {p.contents.map((c) => (
            <li key={c}>{c}</li>
          ))}
          {p.uses ? <li className="product__uses">Dovoljno za {p.uses}</li> : null}
        </ul>
        <div className="actions">
          <Link
            href={`/narudzba?proizvod=${encodeURIComponent(p.name)}`}
            className="btn"
            aria-label={p.slug === "fix-aid" ? undefined : `${ctaText}, ${p.name}`}
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </article>
  );
}

// Tekst i pristupačni naziv CTA-a za narudžbu proizvoda. FIX AID nije set, pa ima vlastiti
// tekst; kod setova pristupačni naziv počinje vidljivim tekstom i dodaje naziv proizvoda.
export function orderCta(p: Product) {
  const text = p.slug === "fix-aid" ? "Naručite FIX AID" : "Naručite svoj set";
  return { text, ariaLabel: p.slug === "fix-aid" ? undefined : `${text}, ${p.name}` };
}

export function ProductCard({ p, feature }: { p: Product; feature?: boolean }) {
  const cta = orderCta(p);
  return (
    <article className={`product${feature ? " product--feature" : ""}`}>
      <Link href={`/proizvodi/${p.slug}`} className="product__img" aria-label={`${p.name}, detalji`}>
        <Image src={p.image} alt={p.imageAlt} fill sizes="(max-width: 960px) 90vw, 30vw" />
      </Link>
      <div className="product__body">
        <h3 className="product__name">
          <Link href={`/proizvodi/${p.slug}`} style={{ textDecoration: "none" }}>
            {p.name}
          </Link>
        </h3>
        <p className="product__short">{p.short}</p>
        <ul className="product__list">
          {p.contents.map((c) => (
            <li key={c}>{c}</li>
          ))}
          {p.uses ? <li className="product__uses">Dovoljno za {p.uses}</li> : null}
        </ul>
        <div className="actions">
          <Link href={`/narudzba?proizvod=${encodeURIComponent(p.name)}`} className="btn" aria-label={cta.ariaLabel}>
            {cta.text}
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid() {
  return (
    <div className="products">
      {PRODUCTS.map((p, i) => (
        <ProductCard key={p.slug} p={p} feature={i === 0} />
      ))}
    </div>
  );
}

export function PartnerBand() {
  return (
    <section className="sect sect--ink sect--partners" aria-labelledby="partneri">
      <div className="wrap">
        <div className="sect-head">
          <h2 className="h2" id="partneri">
            Za fizioterapeute, klubove i klinike
          </h2>
          <p className="lead">
            Pokažemo vam Cool Down uživo, u vašoj ordinaciji ili klubu. Vi birate kako ga uvodite.
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
        <div className="actions partners__actions">
          <Link href="/zahtjev" className="btn btn--light">
            Zatražite demonstraciju
          </Link>
          <Link href="/za-partnere" className="btn btn--ghost-light">
            Sve o suradnji
          </Link>
        </div>
      </div>
    </section>
  );
}

export function References({
  title = "Koriste ga profesionalci",
  lead = "Sportski timovi i klinike u Švicarskoj i Njemačkoj, prema proizvođaču.",
  skipSportPhotos = false,
}: {
  title?: string;
  lead?: string | null;
  skipSportPhotos?: boolean;
}) {
  const sport = skipSportPhotos
    ? REFERENCES.sport.filter((r) => !SPORT.some((t) => t.team === r))
    : REFERENCES.sport;
  return (
    <div className="refs">
      <div>
        <h2 className="h2">{title}</h2>
        {lead ? <p className="lead mt-s">{lead}</p> : null}
      </div>
      <div className="refs__cols">
        <div className="refs__group">
          <h3>{skipSportPhotos ? "Ostali klubovi i savezi" : "Sport"}</h3>
          <ul>
            {sport.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
        <div className="refs__group">
          <h3>Klinike i ortopedija</h3>
          <ul>
            {REFERENCES.clinics.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Raspon temperature ("7–10 °C") ne smije se prelomiti preko crtice.
const RANGE = /(\d+–\d+\s°C)/;
function keepRanges(text: string) {
  return text.split(RANGE).map((part, i) =>
    RANGE.test(part) ? (
      <span key={i} className="nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

// ids: izbor pitanja po stabilnom id-u (redoslijed prema ids). Bez ids: sva pitanja.
export function Faq({ ids }: { ids?: string[] }) {
  const items = ids
    ? ids.map((id) => FAQ.find((f) => f.id === id)).filter((f): f is (typeof FAQ)[number] => Boolean(f))
    : FAQ;
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.id}>
          <summary>{f.q}</summary>
          <p className="answer">{keepRanges(f.a)}</p>
        </details>
      ))}
    </div>
  );
}

export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function Safety({ heading = "h2" }: { heading?: "h2" | "h3" }) {
  const H = heading;
  return (
    <aside className="safety" aria-label="Sigurnosne informacije">
      <H>Prije uporabe</H>
      <p>
        Cool Down je <strong>medicinski proizvod</strong>. Pročitajte upute iz pakiranja.
      </p>
      <div>
        <p>
          <strong>Ne koristite kod:</strong>
        </p>
        <ul>
          {SAFETY.contraindications.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
      <p>{SAFETY.sideEffects}</p>
      <p>{SAFETY.composition}</p>
      <p>
        <strong>Upozorenje:</strong> {SAFETY.flammable}
      </p>
    </aside>
  );
}

export function Closing({
  title = "Hlađenje bez leda.",
  text = "Pošaljite narudžbu ili upit. Javit ćemo vam se s cijenom i uvjetima dostave.",
  primary = { href: "/narudzba", label: "Naručite svoj set" },
  secondary = { href: "/zahtjev", label: "Zatražite demonstraciju" },
  variant = "default",
  secondaryFirst = false,
}: {
  title?: string;
  text?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string } | null;
  // "calm": mirnija varijanta (početna i /kako-djeluje): manja tipografija, primarna akcija prva,
  // donja traka na mobitelu se skriva dok je primarni CTA na ekranu).
  variant?: "default" | "calm";
  // Samo za varijantu "calm": sporedna akcija ostaje prva (npr. /pitanja). Zadano: primarna prva.
  secondaryFirst?: boolean;
}) {
  const home = variant === "calm";
  const primaryLink = (
    <Link href={primary.href} className="btn" data-mobilebar-hide-visible={home ? "" : undefined}>
      {primary.label}
    </Link>
  );
  const secondaryLink = secondary ? (
    <Link href={secondary.href} className="btn btn--ghost">
      {secondary.label}
    </Link>
  ) : null;
  return (
    <section className={`sect sect--frost${home ? " sect--closing-calm" : ""}`}>
      <div className="wrap closing">
        <div>
          <h2 className="h2">{title}</h2>
          <p className="lead mt-s">{text}</p>
        </div>
        <div className="actions">
          {home && !secondaryFirst ? (
            <>
              {primaryLink}
              {secondaryLink}
            </>
          ) : (
            <>
              {secondaryLink}
              {primaryLink}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export function SportProof() {
  return (
    <div className="sport">
      <div className="sport__head">
        <h2 className="h2">Iz vrhunskog sporta</h2>
        <p className="lead">
          Prema proizvođaču, Cool Down koriste svjetski prvaci i profesionalni timovi u Švicarskoj i Njemačkoj.
        </p>
      </div>
      <ul className="sport__grid">
        {SPORT.map((t, i) => (
          <li key={t.team} className={`sport__item${i === 0 ? " sport__item--lead" : ""}`}>
            <div className="sport__img">
              <Image
                src={t.img}
                alt={t.alt}
                fill
                sizes={i === 0 ? "(max-width: 860px) 100vw, 60vw" : "(max-width: 860px) 100vw, 40vw"}
                style={{ objectPosition: t.position }}
              />
            </div>
            <p className="sport__team">{t.team}</p>
            <p className="sport__note">{t.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
