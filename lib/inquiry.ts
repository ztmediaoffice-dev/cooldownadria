// Zajednička pravila za obrasce narudžbe, zahtjeva i kontakta.
// Koriste ih i obrazac na klijentu (InquiryForm) i /api/upit na serveru,
// da pravila budu ista na obje strane.

import { catalogById } from "@/lib/content";

export const MODES = ["narudzba", "zahtjev", "kontakt"] as const;
export type Mode = (typeof MODES)[number];

export const REQUEST_TYPES = [
  { value: "demonstracija", label: "Demonstracija" },
  { value: "uzorak", label: "Uzorak" },
  { value: "ponuda", label: "Poslovna ponuda" },
] as const;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Narudžba s više stavki (17.11.2026.).
export const MAX_ROWS = 10;
export const MAX_QTY = 99;
export type OrderLine = { id: string; qty: string };

export function isMode(v: string): v is Mode {
  return (MODES as readonly string[]).includes(v);
}

/** Ključ greške; "contact" znači da nedostaje i e-mail i telefon, "items" da popis proizvoda nije ispravan. */
export type ErrorKey = "items" | "type" | "org" | "name" | "contact" | "email" | "message" | "consent";
export type Errors = Partial<Record<ErrorKey, string>>;

export const MESSAGES: Record<ErrorKey, string> = {
  items: "Provjerite popis proizvoda.",
  type: "Odaberite što trebate.",
  org: "Upišite naziv ustanove ili kluba.",
  name: "Upišite ime i prezime.",
  contact: "Upišite e-mail ili telefon, da vam se možemo javiti.",
  email: "E-mail adresa nije ispravna.",
  message: "Napišite poruku.",
  consent: "Potrebna je privola, da bismo mogli odgovoriti na upit.",
};

export const ROW_MESSAGES = {
  product: "Odaberite proizvod.",
  productOrRemove: "Odaberite proizvod ili uklonite ovaj red.",
  qty: `Upišite količinu, cijeli broj od 1 do ${MAX_QTY}.`,
  duplicate: "Ovaj proizvod je već na popisu.",
};

export type RowError = { product?: string; qty?: string };

const s = (v: unknown) => String(v ?? "").trim();

/** Pretvara nepoznat ulaz (JSON sa servera ili stanje obrasca) u popis redova. */
export function toLines(v: unknown): OrderLine[] | null {
  if (!Array.isArray(v) || v.length > MAX_ROWS) return null;
  return v.map((r) => {
    const o = (r ?? {}) as Record<string, unknown>;
    return { id: s(o.id).slice(0, 40), qty: s(o.qty).slice(0, 4) };
  });
}

/**
 * Provjera popisa proizvoda, red po red.
 * Prazan red je dopušten samo kad je jedini i kad kupac traži savjet.
 */
export function validateLines(lines: OrderLine[] | null, advice: boolean): { rows: RowError[]; ok: boolean } {
  if (!lines) return { rows: [{ product: ROW_MESSAGES.product }], ok: false };
  // Samo savjet, bez proizvoda: obrazac šalje prazan popis.
  if (lines.length === 0) return advice ? { rows: [], ok: true } : { rows: [{ product: ROW_MESSAGES.product }], ok: false };
  const seen = new Set<string>();
  const onlyAdvice = advice && lines.length === 1 && !lines[0].id;
  const rows = lines.map((l): RowError => {
    if (onlyAdvice) return {};
    const e: RowError = {};
    if (!l.id) e.product = lines.length > 1 ? ROW_MESSAGES.productOrRemove : ROW_MESSAGES.product;
    else if (!catalogById(l.id)) e.product = ROW_MESSAGES.product;
    else if (seen.has(l.id)) e.product = ROW_MESSAGES.duplicate;
    else seen.add(l.id);
    if (l.id && !(/^[1-9]\d*$/.test(l.qty) && Number(l.qty) <= MAX_QTY)) e.qty = ROW_MESSAGES.qty;
    return e;
  });
  return { rows, ok: rows.every((r) => !r.product && !r.qty) };
}

/**
 * Provjera podataka obrasca. Vraća greške redom kojim se polja pojavljuju u obrascu.
 * Ograničenje dužine, čišćenje znakova i escaping ostaju na serveru.
 */
export function validateInquiry(mode: Mode, d: Record<string, unknown>): Errors {
  const e: Errors = {};
  if (mode === "narudzba") {
    if (!validateLines(toLines(d.items), s(d.advice) === "da").ok) e.items = MESSAGES.items;
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

/** Popis kao tekst: „2 × PROFESSIONAL SET, 1 × ICE FLUID 250 ml”. Preskače prazne i nepoznate redove. */
export function linesText(lines: OrderLine[], sep = ", ") {
  return lines
    .map((l) => {
      const c = catalogById(l.id);
      return c ? `${l.qty || 1} × ${c.name}` : "";
    })
    .filter(Boolean)
    .join(sep);
}
