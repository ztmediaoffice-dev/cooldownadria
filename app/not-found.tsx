import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Stranica ne postoji" };

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: "60vh" }}>
      <div className="wrap">
        <h1 className="page-title">Ova stranica ne postoji.</h1>
        <p className="lead">Možda je adresa promijenjena. Krenite od početne ili pogledajte proizvode.</p>
        <div className="actions mt-m">
          <Link href="/" className="btn">
            Na početnu
          </Link>
          <Link href="/proizvodi" className="btn btn--ghost">
            Proizvodi
          </Link>
        </div>
      </div>
    </section>
  );
}
