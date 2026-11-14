import { NextResponse } from "next/server";
import { isMode, needsQty, validateInquiry } from "@/lib/inquiry";
import { allowRequest, clientIp } from "@/lib/rate-limit";

// Prima narudžbe, zahtjeve partnera i poruke.
// Slanje e-maila ide preko Resend API-ja kad su postavljeni RESEND_API_KEY i UPIT_EMAIL.
// Bez njih upit se samo ispisuje u log (razvoj).

const LABELS: Record<string, string> = {
  mode: "Vrsta obrasca",
  type: "Zahtjev",
  product: "Proizvod",
  qty: "Količina",
  org: "Ustanova ili klub",
  orgType: "Vrsta ustanove",
  name: "Ime i prezime",
  city: "Grad",
  email: "E-mail",
  phone: "Telefon",
  message: "Poruka",
  source: "Izvor",
  page: "Stranica",
};

const SUBJECTS: Record<string, string> = {
  narudzba: "Nova narudžba ili upit",
  zahtjev: "Novi zahtjev partnera",
  kontakt: "Nova poruka s weba",
};

function clean(v: unknown, max = 2000) {
  return String(v ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, max);
}

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(req: Request) {
  // Umjereno ograničenje po IP adresi (lib/rate-limit.ts). Odgovor je neutralan.
  if (!allowRequest(clientIp(req))) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // zamka za botove
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const mode = clean(body.mode, 20);
  if (!isMode(mode)) return NextResponse.json({ ok: false }, { status: 400 });

  const data: Record<string, string> = {};
  for (const k of Object.keys(LABELS)) {
    const v = clean(body[k]);
    if (v) data[k] = v;
  }
  // Ista pravila kao u obrascu (lib/inquiry.ts).
  const errors = validateInquiry(mode, { ...data, consent: clean(body.consent, 10) });
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors: Object.keys(errors) }, { status: 422 });
  }
  // Polja koja ne pripadaju ovom načinu se ne prosljeđuju.
  if (mode !== "narudzba" || !needsQty(data.product ?? "")) delete data.qty;
  if (mode !== "narudzba") delete data.product;
  if (mode !== "zahtjev") {
    delete data.type;
    delete data.org;
    delete data.orgType;
  }

  const subject = `${SUBJECTS[mode]}${data.type ? `: ${data.type}` : ""}${data.product ? `: ${data.product}` : ""} (${data.name})`;
  const rows = Object.entries(data)
    .map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#46566d">${LABELS[k]}</td><td style="padding:6px 0"><strong>${esc(v)}</strong></td></tr>`)
    .join("");
  const html = `<div style="font-family:Arial,sans-serif;color:#052655"><h2 style="margin:0 0 16px">${esc(SUBJECTS[mode])}</h2><table>${rows}</table></div>`;
  const text = Object.entries(data)
    .map(([k, v]) => `${LABELS[k]}: ${v}`)
    .join("\n");

  const key = process.env.RESEND_API_KEY;
  const to = process.env.UPIT_EMAIL;
  const from = process.env.UPIT_FROM ?? "Cooldown Adria <web@cooldownadria.com>";

  if (!key || !to) {
    if (process.env.NODE_ENV === "production") {
      console.error("[upit] RESEND_API_KEY ili UPIT_EMAIL nisu postavljeni");
      return NextResponse.json({ ok: false }, { status: 500 });
    }
    console.log(`[upit] ${subject}\n${text}`);
    return NextResponse.json({ ok: true, dev: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      subject,
      html,
      text,
      reply_to: data.email || undefined,
    }),
  });

  if (!res.ok) {
    console.error("[upit] Resend greška", res.status, await res.text());
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
