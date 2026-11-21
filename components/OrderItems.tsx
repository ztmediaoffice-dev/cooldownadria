"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CATALOG, CATALOG_GROUPS, catalogById } from "@/lib/content";
import { MAX_QTY, MAX_ROWS, type OrderLine, type RowError } from "@/lib/inquiry";

// Popis proizvoda u narudžbi (17.11.2026.): red = slika odabranog proizvoda, native <select>,
// količina (− n +) i ukloni. Na telefonu select otvara sistemski izbornik (odluka korisnika:
// bez vlastitog dropdowna). Isti proizvod ne može biti u dva reda: kad se odabere ponovno,
// količina se pribraja postojećem redu.

export type Row = OrderLine & { key: number };

let nextKey = 1;
export const newRow = (id = "", qty = "1"): Row => ({ id, qty, key: nextKey++ });

type Props = {
  rows: Row[];
  setRows: (rows: Row[]) => void;
  errors: RowError[];
};

export function OrderItems({ rows, setRows, errors }: Props) {
  const selects = useRef(new Map<number, HTMLSelectElement | null>());
  const [say, setSay] = useState("");
  // Nakon promjene popisa fokus ide na zadani red, poslije iscrtavanja.
  const pendingFocus = useRef<number | null>(null);

  useEffect(() => {
    const key = pendingFocus.current;
    if (key === null) return;
    pendingFocus.current = null;
    selects.current.get(key)?.focus();
  });

  const label = (i: number) => (rows.length > 1 ? `Proizvod ${i + 1}` : "Proizvod");
  const nameOf = (id: string) => catalogById(id)?.name ?? "";

  function update(key: number, patch: Partial<OrderLine>) {
    setRows(rows.map((r) => (r.key === key ? { ...r, ...patch } : r)));
  }

  function choose(row: Row, id: string) {
    const other = id ? rows.find((r) => r.key !== row.key && r.id === id) : undefined;
    if (!other) return update(row.key, { id });
    // Spajanje: količina ovog reda se dodaje postojećem, a ovaj red nestaje.
    const sum = Math.min(MAX_QTY, (Number(other.qty) || 1) + (Number(row.qty) || 1));
    setRows(rows.filter((r) => r.key !== row.key).map((r) => (r.key === other.key ? { ...r, qty: String(sum) } : r)));
    setSay(`${nameOf(id)} je već na popisu. Količina je sada ${sum}.`);
    pendingFocus.current = other.key;
  }

  function step(row: Row, d: 1 | -1) {
    const n = Math.min(MAX_QTY, Math.max(1, (parseInt(row.qty, 10) || 1) + d));
    update(row.key, { qty: String(n) });
  }

  function remove(i: number) {
    const row = rows[i];
    const next = rows.filter((r) => r.key !== row.key);
    setRows(next);
    setSay(`${nameOf(row.id) || "Prazan red"} uklonjen s popisa.`);
    pendingFocus.current = next[Math.max(0, i - 1)].key;
  }

  function add() {
    const r = newRow();
    setRows([...rows, r]);
    setSay("");
    pendingFocus.current = r.key;
  }

  return (
    <div className="orderlist">
      <ul className="orderlist__rows">
        {rows.map((r, i) => {
          const e = errors[i] ?? {};
          const errId = `row-${r.key}-err`;
          const item = catalogById(r.id);
          const taken = new Set(rows.filter((x) => x.key !== r.key).map((x) => x.id));
          return (
            <li className="orow" key={r.key}>
              <span className={`orow__thumb${item ? "" : " orow__thumb--empty"}`} aria-hidden="true">
                {item ? <Image src={item.image} alt="" width={56} height={56} /> : null}
              </span>
              <div className="orow__product">
                <select
                  ref={(el) => {
                    selects.current.set(r.key, el);
                  }}
                  className="orow__select"
                  name={`product-${r.key}`}
                  aria-label={label(i)}
                  value={r.id}
                  onChange={(ev) => choose(r, ev.target.value)}
                  aria-invalid={Boolean(e.product) || undefined}
                  aria-describedby={e.product ? errId : undefined}
                >
                  <option value="">Odaberite proizvod</option>
                  {CATALOG_GROUPS.map((g) => (
                    <optgroup key={g.id} label={g.label}>
                      {CATALOG.filter((c) => c.group === g.id).map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                          {taken.has(c.id) ? " (već na popisu)" : ""}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div className="orow__qty qty" role="group" aria-label={`Količina, ${label(i).toLowerCase()}`}>
                <button
                  type="button"
                  className="qty__btn"
                  aria-label="Manje"
                  aria-disabled={(parseInt(r.qty, 10) || 1) <= 1 || undefined}
                  onClick={() => step(r, -1)}
                >
                  <span aria-hidden="true">−</span>
                </button>
                <input
                  className="qty__input"
                  name={`qty-${r.key}`}
                  inputMode="numeric"
                  autoComplete="off"
                  aria-label={item ? `Količina: ${item.name}` : "Količina"}
                  value={r.qty}
                  maxLength={2}
                  onChange={(ev) => update(r.key, { qty: ev.target.value.replace(/\D/g, "").slice(0, 2) })}
                  onBlur={() => {
                    if (!r.qty || r.qty === "0" || r.qty === "00") update(r.key, { qty: "1" });
                  }}
                  aria-invalid={Boolean(e.qty) || undefined}
                  aria-describedby={e.qty ? errId : undefined}
                />
                <button
                  type="button"
                  className="qty__btn"
                  aria-label="Više"
                  aria-disabled={(parseInt(r.qty, 10) || 1) >= MAX_QTY || undefined}
                  onClick={() => step(r, 1)}
                >
                  <span aria-hidden="true">+</span>
                </button>
              </div>
              <div className="orow__remove">
                {rows.length > 1 ? (
                  <button
                    type="button"
                    className="orow__x"
                    aria-label={`Ukloni ${item?.name ?? `${label(i).toLowerCase()} (prazan red)`}`}
                    onClick={() => remove(i)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                ) : null}
              </div>
              {e.product || e.qty ? (
                <p className="field__err orow__err" id={errId}>
                  {[e.product, e.qty].filter(Boolean).join(" ")}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
      {rows.length < MAX_ROWS ? (
        <button type="button" className="orderlist__add" onClick={add}>
          <span aria-hidden="true">+</span> Dodajte još jedan proizvod
        </button>
      ) : (
        <p className="field__hint">Najviše {MAX_ROWS} stavki. Za više napišite u napomenu.</p>
      )}
      <p className="sr-only" role="status" aria-live="polite">
        {say}
      </p>
    </div>
  );
}
