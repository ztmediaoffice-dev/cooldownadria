// Zajednička pravila za obrasce narudžbe, zahtjeva i kontakta.
// Koriste ih i obrazac na klijentu (InquiryForm) i /api/upit na serveru,
// da pravila budu ista na obje strane.

import { ORDER_OPTIONS, PARTS_OPTION } from "@/lib/content";

export const MODES = ["narudzba", "zahtjev", "kontakt"] as const;
export type Mode = (typeof MODES)[number];

export const REQUEST_TYPES = [
  { value: "demonstracija", label: "Demonstracija" },
  { value: "uzorak", label: "Uzorak" },
  { value: "ponuda", label: "Poslovna ponuda" },
] as const;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isMode(v: string): v is Mode {
  return (MODES as readonly string[]).includes(v);
}

/** Proizvod traži količinu, osim upita za pojedinačne dijelove. */
export function needsQty(product: string) {
  return product !== PARTS_OPTION;
}

/** Ključ greške; "contact" znači da nedostaje i e-mail i telefon. */
export type ErrorKey = "product" | "qty" | "type" | "org" | "name" | "contact" | "email" | "message" | "consent";
export type Errors = Partial<Record<ErrorKey, string>>;

export const MESSAGES: Record<ErrorKey, string> = {
  product: "Odaberite proizvod.",
  qty: "Upišite količinu, cijeli broj od 1 naviše.",
  type: "Odaberite što trebate.",
  org: "Upišite naziv ustanove ili kluba.",
  name: "Upišite ime i prezime.",
  contact: "Upišite e-mail ili telefon, da vam se možemo javiti.",
  email: "E-mail adresa nije ispravna.",
  message: "Napišite poruku.",
  consent: "Potrebna je privola, da bismo mogli odgovoriti na upit.",
};

const s = (v: unknown) => String(v ?? "").trim();

/**
 * Provjera podataka obrasca. Vraća greške redom kojim se polja pojavljuju u obrascu.
 * Ograničenje dužine, čišćenje znakova i escaping ostaju na serveru.
 */
export function validateInquiry(mode: Mode, d: Record<string, unknown>): Errors {
  const e: Errors = {};
  if (mode === "narudzba") {
    const product = s(d.product);
    if (!ORDER_OPTIONS.includes(product)) e.product = MESSAGES.product;
    else if (needsQty(product) && !/^[1-9]\d*$/.test(s(d.qty))) e.qty = MESSAGES.qty;
  }
  if (mode === "zahtjev") {
    if (!REQUEST_TYPES.some((t) => t.value === s(d.type))) e.type = MESSAGES.type;
    if (!s(d.org)) e.org = MESSAGES.org;
  }
  if (!s(d.name)) e.name = MESSAGES.name;
  const email = s(d.email);
  if (!email && !s(d.phone)) e.contact = MESSAGES.contact;
  else if (email && !EMAIL_RE.test(email)) e.email = MESSAGES.email;
  if (mode === "kontakt" && !s(d.message)) e.message = MESSAGES.message;
  if (s(d.consent) !== "da") e.consent = MESSAGES.consent;
  return e;
}
