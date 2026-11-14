"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { ORDER_OPTIONS, PARTS_OPTION } from "@/lib/content";
import { REQUEST_TYPES, needsQty, validateInquiry, type ErrorKey, type Errors, type Mode } from "@/lib/inquiry";

const ORG_TYPES = [
  "Fizioterapija ili ordinacija",
  "Sportski klub",
  "Klinika ili bolnica",
  "Ljekarna ili veledrogerija",
  "Teretana",
  "Tvrtka",
  "Drugo",
];

// Polje u obrascu na koje ide fokus za pojedinu grešku.
const FIELD_OF: Record<ErrorKey, string> = {
  product: "product",
  qty: "qty",
  type: "type",
  org: "org",
  name: "name",
  contact: "email",
  email: "email",
  message: "message",
  consent: "consent",
};

export function InquiryForm({
  mode,
  defaultProduct,
  defaultType,
}: {
  mode: Mode;
  defaultProduct?: string;
  defaultType?: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  // Programska zaštita od ponovnog slanja (klik, Enter, submit), neovisno o stanju dugmeta.
  const sendingRef = useRef(false);
  // Odabrani proizvod u narudžbi. Bez poznatog parametra izbor je prazan.
  // Kod upita za dijelove nema količine, a napomena služi za popis dijelova.
  const [product, setProduct] = useState(defaultProduct ?? "");
  const parts = mode === "narudzba" && product === PARTS_OPTION;
  const showQty = mode === "narudzba" && needsQty(product);

  function tracking() {
    const p = new URLSearchParams(window.location.search);
    const utm = ["utm_source", "utm_medium", "utm_campaign"]
      .map((k) => p.get(k))
      .filter(Boolean)
      .join(" / ");
    let stored = "";
    try {
      stored = sessionStorage.getItem("cd_source") ?? "";
    } catch {}
    return { source: utm || stored || "izravno", page: window.location.pathname };
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (sendingRef.current) return;
    const form = ev.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    const e = validateInquiry(mode, data);
    setErrors(e);
    const keys = Object.keys(e) as ErrorKey[];
    if (keys.length) {
      // Fokus na prvo neispravno polje po stvarnom redoslijedu u obrascu.
      const names = new Set(keys.map((k) => FIELD_OF[k]));
      const first = Array.from(form.elements).find(
        (el): el is HTMLElement => el instanceof HTMLElement && names.has((el as HTMLInputElement).name),
      );
      first?.focus();
      return;
    }
    sendingRef.current = true;
    setStatus("sending");
    try {
      const res = await fetch("/api/upit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ...tracking(), mode }),
      });
      if (!res.ok) throw new Error();
      const kind = mode === "zahtjev" ? String(data.type ?? "zahtjev") : mode;
      router.push(`/hvala?vrsta=${encodeURIComponent(kind)}`);
    } catch {
      sendingRef.current = false;
      setStatus("error");
    }
  }

  const err = (k: ErrorKey) =>
    errors[k] ? (
      <p className="field__err" id={`${k}-err`}>
        {errors[k]}
      </p>
    ) : null;
  // aria-invalid i opis greške; extra su dodatni opisi (npr. napomena o kontaktu).
  const inv = (keys: ErrorKey[], extra: string[] = []) => {
    const bad = keys.filter((k) => errors[k]);
    const ids = [...extra, ...bad.map((k) => `${k}-err`)];
    return {
      "aria-invalid": bad.length ? true : undefined,
      "aria-describedby": ids.length ? ids.join(" ") : undefined,
    };
  };
  const req: ReactNode = <span className="opt">(obavezno)</span>;
  const sending = status === "sending";

  return (
    <form className="form" onSubmit={onSubmit} noValidate aria-busy={sending || undefined}>
      {mode === "zahtjev" && (
        <fieldset className="field">
          <legend>Što trebate?</legend>
          <div className="segctl">
            {REQUEST_TYPES.map((t) => (
              <label key={t.value}>
                <input
                  type="radio"
                  name="type"
                  value={t.value}
                  defaultChecked={(defaultType ?? "demonstracija") === t.value}
                />
                <span>{t.label}</span>
              </label>
            ))}
          </div>
          {err("type")}
        </fieldset>
      )}

      {mode === "narudzba" && (
        <div className="form__row">
          <div className="field">
            <label htmlFor="product">Proizvod {req}</label>
            <select
              id="product"
              name="product"
              required
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              {...inv(["product"])}
            >
              <option value="">Odaberite proizvod</option>
              {ORDER_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            {err("product")}
          </div>
          {showQty ? (
            <div className="field">
              <label htmlFor="qty">Količina {req}</label>
              <input
                id="qty"
                name="qty"
                type="number"
                min={1}
                step={1}
                required
                defaultValue={1}
                inputMode="numeric"
                {...inv(["qty"])}
              />
              {err("qty")}
            </div>
          ) : null}
        </div>
      )}

      {mode === "zahtjev" && (
        <div className="form__row">
          <div className="field">
            <label htmlFor="org">Ustanova ili klub {req}</label>
            <input id="org" name="org" autoComplete="organization" required {...inv(["org"])} />
            {err("org")}
          </div>
          <div className="field">
            <label htmlFor="orgType">Vrsta</label>
            <select id="orgType" name="orgType" defaultValue={ORG_TYPES[0]}>
              {ORG_TYPES.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="form__row">
        <div className="field">
          <label htmlFor="name">Ime i prezime {req}</label>
          <input id="name" name="name" autoComplete="name" required {...inv(["name"])} />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor="city">
            Grad <span className="opt">(neobavezno)</span>
          </label>
          <input id="city" name="city" autoComplete="address-level2" />
        </div>
      </div>

      <div className="field">
        <p className="field__hint" id="contact-hint">
          Unesite e-mail ili telefon — dovoljan je jedan kontakt.
        </p>
        <div className="form__row">
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              {...inv(["contact", "email"], ["contact-hint"])}
            />
            {err("email")}
          </div>
          <div className="field">
            <label htmlFor="phone">Telefon</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              {...inv(["contact"], ["contact-hint"])}
            />
          </div>
        </div>
        {err("contact")}
      </div>

      <div className="field">
        <label htmlFor="message">
          {mode === "kontakt" ? "Poruka" : parts ? "Koji dijelovi i koliko" : "Napomena"}{" "}
          {mode === "kontakt" ? req : <span className="opt">(neobavezno)</span>}
        </label>
        <textarea
          id="message"
          name="message"
          required={mode === "kontakt" || undefined}
          placeholder={
            parts
              ? "Na primjer: 2 × ICE FLUID 250 ml, 4 pamučna zavoja 10 × 200 cm."
              : mode === "narudzba"
                ? "Na primjer: za što vam treba, adresa za dostavu ili pitanje."
                : mode === "zahtjev"
                  ? "Na primjer: broj pacijenata ili sportaša, termin koji vam odgovara."
                  : ""
          }
          {...inv(["message"])}
        />
        {err("message")}
      </div>

      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Ne ispunjavajte ovo polje</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field">
        <label className="consent">
          <input type="checkbox" name="consent" value="da" required {...inv(["consent"])} />
          <span>
            Pristajem da Cooldown Adria koristi ove podatke kako bi odgovorila na moj upit. Više u{" "}
            <Link href="/privatnost" className="textlink">
              pravilima privatnosti
            </Link>
            . {req}
          </span>
        </label>
        {err("consent")}
      </div>

      <div className="actions">
        {/* aria-disabled umjesto disabled: dugme zadržava fokus tokom slanja,
            a ponovno slanje sprječava sendingRef u onSubmit. */}
        <button className="btn" type="submit" aria-disabled={sending || undefined}>
          {sending
            ? "Šaljem…"
            : mode === "narudzba"
              ? "Pošaljite narudžbu"
              : mode === "zahtjev"
                ? "Pošaljite zahtjev"
                : "Pošaljite poruku"}
        </button>
      </div>
      {/* Jedina živa regija: najavljuje samo neuspjeh, a stanje slanja nosi tekst dugmeta. */}
      <p className={`form__status${status === "error" ? " form__status--err" : ""}`} role="status" aria-live="polite">
        {status === "error"
          ? "Slanje nije uspjelo. Provjerite vezu i pokušajte ponovno ili nam pišite na e-mail."
          : ""}
      </p>
    </form>
  );
}
