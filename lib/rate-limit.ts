// Umjereno ograničenje broja upita po IP adresi, u memoriji servera.
//
// Napomena za Vercel: memorija postoji samo unutar jedne instance funkcije.
// Više istovremenih instanci ima odvojena brojila, a hladni start ih briše.
// Zato je ovo zaštita od očiglednog spama s jedne adrese, ne strogo jamstvo.

const WINDOW_MS = 10 * 60 * 1000; // 10 minuta
const MAX_REQUESTS = 5; // upita po IP adresi u tom razdoblju
const MAX_TRACKED = 5000; // gornja granica memorije

const hits = new Map<string, number[]>();

/** IP adresa klijenta iz zaglavlja koja postavlja Vercel (ili lokalni proxy). */
export function clientIp(req: Request): string | null {
  const real = req.headers.get("x-real-ip")?.trim();
  if (real) return real;
  const fwd = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return fwd || null;
}

/** true ako je zahtjev dopušten; false ako je ta IP adresa premašila limit. */
export function allowRequest(ip: string | null, now = Date.now()): boolean {
  // Bez poznate adrese ne ograničavamo, da ne bismo sve takve korisnike stavili u isto brojilo.
  if (!ip) return true;
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > MAX_TRACKED) {
    // Najprije se brišu adrese bez nedavnih zahtjeva, a zatim najstarije upisane.
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
    while (hits.size > MAX_TRACKED) {
      const oldest = hits.keys().next().value;
      if (oldest === undefined) break;
      hits.delete(oldest);
    }
  }
  return true;
}
