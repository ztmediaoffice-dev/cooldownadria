"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  REQUEST_TYPES,
  validateInquiry,
  validateLines,
  type ErrorKey,
  type Errors,
  type Mode,
  type RowError,
} from "@/lib/inquiry";
import { OrderItems, newRow, type Row } from "@/components/OrderItems";
import { orderStore } from "@/lib/order-store";

const ORG_TYPES = [
  "Fizioterapija ili ordinacija",
  "Sportski klub",
  "Klinika ili bolnica",
  "Ljekarna ili veledrogerija",
  "Teretana",
  "Tvrtka",
  "Drugo",
];

export function InquiryForm({
  mode,
  defaultItems,
  partsFirst,
  defaultType,
}: {
  mode: Mode;
  /** Narudžba: id proizvoda za prvi red (iz ?proizvod=). */
  defaultItems?: string[];
  /** Narudžba: izbornik se otvara na grupi pojedinačnih dijelova. */
  partsFirst?: boolean;
  defaultType?: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  // Programska zaštita od ponovnog slanja (klik, Enter, submit), neovisno o stanju dugmeta.
  const sendingRef = useRef(false);
  // Narudžba s više stavki (17.11.2026.). Bez poznatog parametra prvi red je prazan.
  const [rows, setRowsState] = useState<Row[]>(() =>
    defaultItems?.length ? defaultItems.map((id) => newRow(id)) : [newRow()],
  );
  const [rowErrors, setRowErrors] = useState<RowError[]>([]);
  const [advice, setAdvice] = useState(false);
  // Nakon neuspjele provjere fokus ide na prvo neispravno polje, redom u obrascu.
  const [focusError, setFocusError] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  // Greške redova vrijede za red, ne za indeks: kad se popis promijeni, brišu se.
  function setRows(next: Row[]) {
    setRowsState(next);
    setRowErrors([]);
  }

  useEffect(() => {
    if (mode === "narudzba") orderStore.set(rows.map(({ id, qty }) => ({ id, qty })));
  }, [mode, rows]);

  useEffect(() => {
    if (!focusError) return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [focusError]);

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
    const data: Record<string, unknown> = Object.fromEntries(
      Array.from(fd.entries()).filter(([k]) => !k.startsWith("qty-")),
    );
    if (mode === "narudzba") {
      data.items = rows.map(({ id, qty }) => ({ id, qty }));
      if (advice) data.advice = "da";
      // Prazan jedini red uz savjet ne šaljemo kao stavku.
      if (advice && rows.length === 1 && !rows[0].id) data.items = [];
    }
    const e = validateInquiry(mode, { ...data, items: mode === "narudzba" ? rows : undefined });
    const re = mode === "narudzba" ? validateLines(rows, advice).rows : [];
    setErrors(e);
    setRowErrors(re);
    if (Object.keys(e).length) {
      setFocusError((n) => n + 1);
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
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate aria-busy={sending || undefined}>
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
        <fieldset className="field">
          <legend>Proizvodi {req}</legend>
          <OrderItems rows={rows} setRows={setRows} errors={rowErrors} preferGroup={partsFirst ? "dio" : undefined} />
          <label className="consent orderlist__advice">
            <input
              type="checkbox"
              checked={advice}
              onChange={(ev) => {
                setAdvice(ev.target.checked);
                setRowErrors([]);
              }}
            />
            <span>Ne znam što trebam, savjetujte me.</span>
          </label>
        </fieldset>
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
          Unesite e-mail ili telefon. Dovoljan je jedan kontakt.
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
          {mode === "kontakt" ? "Poruka" : "Napomena"}{" "}
          {mode === "kontakt" ? req : <span className="opt">(neobavezno)</span>}
        </label>
        <textarea
          id="message"
          name="message"
          required={mode === "kontakt" || undefined}
          placeholder={
            mode === "narudzba"
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
