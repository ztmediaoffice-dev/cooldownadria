"use client";

import { useEffect, useRef, useState } from "react";
import { catalogById } from "@/lib/content";
import { MAX_QTY, MAX_ROWS, type OrderLine, type RowError } from "@/lib/inquiry";
import { ProductSelect, type ProductSelectHandle } from "@/components/ProductSelect";

// Popis proizvoda u narudžbi (17.11.2026.): red = izbornik sa slikom, količina (− n +) i ukloni.
// Isti proizvod ne može biti u dva reda: kad se odabere ponovno, količina se pribraja postojećem redu.

export type Row = OrderLine & { key: number };

let nextKey = 1;
export const newRow = (id = "", qty = "1"): Row => ({ id, qty, key: nextKey++ });

type Props = {
  rows: Row[];
  setRows: (rows: Row[]) => void;
  errors: RowError[];
  preferGroup?: "set" | "dio";
};

export function OrderItems({ rows, setRows, errors, preferGroup }: Props) {
  const selects = useRef(new Map<number, ProductSelectHandle | null>());
  const addRef = useRef<HTMLButtonElement>(null);
  const [say, setSay] = useState("");
  // Nakon promjene popisa fokus ide na zadani element (novi red, prethodni red…), poslije iscrtavanja.
  const pendingFocus = useRef<{ key: number; open?: boolean } | null>(null);
  const setFocusTo = (f: { key: number; open?: boolean }) => {
    pendingFocus.current = f;
  };

  useEffect(() => {
    const f = pendingFocus.current;
    if (!f) return;
    pendingFocus.current = null;
    const s = selects.current.get(f.key);
    if (f.open) s?.open();
    else s?.focus();
  });

  const label = (i: number) => (rows.length > 1 ? `Proizvod ${i + 1}` : "Proizvod");
  const nameOf = (id: string) => catalogById(id)?.name ?? "";

  function update(key: number, patch: Partial<OrderLine>) {
    setRows(rows.map((r) => (r.key === key ? { ...r, ...patch } : r)));
  }

  function choose(row: Row, id: string) {
    const other = rows.find((r) => r.key !== row.key && r.id === id);
    if (!other) return update(row.key, { id });
    // Spajanje: količina ovog reda se dodaje postojećem, a ovaj red nestaje.
    const sum = Math.min(MAX_QTY, (Number(other.qty) || 1) + (Number(row.qty) || 1));
    setRows(rows.filter((r) => r.key !== row.key).map((r) => (r.key === other.key ? { ...r, qty: String(sum) } : r)));
    setSay(`${nameOf(id)} je već na popisu. Količina je sada ${sum}.`);
    setFocusTo({ key: other.key });
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
    setFocusTo({ key: next[Math.max(0, i - 1)].key });
  }

  function add() {
    const r = newRow();
    setRows([...rows, r]);
    setSay("");
    setFocusTo({ key: r.key, open: true });
  }

  return (
    <div className="orderlist">
      <ul className="orderlist__rows">
        {rows.map((r, i) => {
          const e = errors[i] ?? {};
          const errId = `row-${r.key}-err`;
          const name = nameOf(r.id);
          return (
            <li className="orow" key={r.key}>
              <div className="orow__product">
                <ProductSelect
                  ref={(h) => {
                    selects.current.set(r.key, h);
                  }}
                  value={r.id}
                  onChange={(id) => choose(r, id)}
                  taken={rows.filter((x) => x.key !== r.key).map((x) => x.id)}
                  label={label(i)}
                  invalid={Boolean(e.product)}
                  describedBy={e.product ? errId : undefined}
                  preferGroup={preferGroup}
                />
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
                  aria-label={name ? `Količina: ${name}` : "Količina"}
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
                    aria-label={`Ukloni ${name || `${label(i).toLowerCase()} (prazan red)`}`}
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
        <button type="button" ref={addRef} className="orderlist__add" onClick={add}>
          <span aria-hidden="true">+</span> Dodaj još proizvod
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
