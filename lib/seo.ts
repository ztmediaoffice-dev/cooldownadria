import type { Metadata } from "next";

// Zajedničke OG postavke (slika, tip, jezik, naziv weba). Koristi ih layout,
// a stranice ih ponavljaju kad dodaju vlastiti og:url, jer Next.js objekt
// openGraph stranice ne spaja s layoutom nego ga zamjenjuje.
export const OG_BASE = {
  type: "website",
  locale: "hr_HR",
  siteName: "Cooldown Adria",
  images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Cool Down: hlađenje bez leda" }],
} satisfies NonNullable<Metadata["openGraph"]>;

/**
 * Canonical i og:url za javnu stranicu. Putanja je relativna; apsolutna adresa
 * nastaje iz metadataBase (SITE.url u lib/site.ts), jedinog izvora domene.
 */
export function pageUrls(path: string): Pick<Metadata, "alternates" | "openGraph"> {
  return { alternates: { canonical: path }, openGraph: { ...OG_BASE, url: path } };
}
