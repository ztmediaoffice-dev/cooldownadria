"use client";

import Image from "next/image";
import { forwardRef, useEffect, useId, useImperativeHandle, useRef, useState, type KeyboardEvent } from "react";
import { CATALOG, CATALOG_GROUPS, catalogById } from "@/lib/content";

// Izbornik proizvoda sa slikama (17.11.2026.). Obrazac „select-only combobox” iz WAI-ARIA APG:
// fokus ostaje na polju, a aktivna opcija se najavljuje preko aria-activedescendant.
// Tipkovnica: strelice, Home/End, Enter/razmak, Escape, Tab (bira i ide dalje) i traženje upisom slova.

export type ProductSelectHandle = { focus: () => void; open: () => void };

type Props = {
  value: string;
  onChange: (id: string) => void;
  /** Proizvodi koji su već u drugim redovima (označeni su, ali se mogu odabrati). */
  taken: string[];
  label: string;
  invalid?: boolean;
  describedBy?: string;
  /** Grupa na kojoj se izbornik otvara kad ništa nije odabrano. */
  preferGroup?: "set" | "dio";
};

const ORDER = CATALOG_GROUPS.flatMap((g) => CATALOG.filter((c) => c.group === g.id));

export const ProductSelect = forwardRef<ProductSelectHandle, Props>(function ProductSelect(
  { value, onChange, taken, label, invalid, describedBy, preferGroup },
  ref,
) {
  const uid = useId();
  const listId = `${uid}-list`;
  const optId = (i: number) => `${uid}-opt-${i}`;
  const boxRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const typed = useRef({ text: "", at: 0 });
  const selected = catalogById(value);
  const selIndex = ORDER.findIndex((c) => c.id === value);

  function startIndex() {
    if (selIndex >= 0) return selIndex;
    if (preferGroup) return Math.max(0, ORDER.findIndex((c) => c.group === preferGroup));
    return 0;
  }
  function show(at = startIndex()) {
    setActive(at);
    setOpen(true);
  }
  function pick(i: number) {
    onChange(ORDER[i].id);
    setOpen(false);
  }

  useImperativeHandle(ref, () => ({
    focus: () => boxRef.current?.focus(),
    open: () => {
      boxRef.current?.focus();
      show();
    },
  }));

  // Aktivna opcija uvijek vidljiva u listi.
  useEffect(() => {
    if (!open) return;
    document.getElementById(optId(active))?.scrollIntoView({ block: "nearest" });
  }, [open, active]); // eslint-disable-line react-hooks/exhaustive-deps

  // Klik izvan izbornika ga zatvara.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const root = boxRef.current?.parentElement;
      if (root && !root.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  function typeahead(ch: string) {
    const now = Date.now();
    const t = typed.current;
    t.text = now - t.at > 700 ? ch : t.text + ch;
    t.at = now;
    const q = t.text.toLocaleLowerCase("hr");
    const from = open ? active + (t.text.length === 1 ? 1 : 0) : startIndex();
    for (let k = 0; k < ORDER.length; k++) {
      const i = (from + k) % ORDER.length;
      if (ORDER[i].name.toLocaleLowerCase("hr").startsWith(q)) return i;
    }
    return -1;
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const last = ORDER.length - 1;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        show();
      } else if (e.key === "Home" || e.key === "End") {
        e.preventDefault();
        show(e.key === "Home" ? 0 : last);
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const i = typeahead(e.key);
        if (i >= 0) show(i);
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => Math.min(last, a + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (e.altKey) pick(active);
        else setActive((a) => Math.max(0, a - 1));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(last);
        break;
      case "PageDown":
        e.preventDefault();
        setActive((a) => Math.min(last, a + 5));
        break;
      case "PageUp":
        e.preventDefault();
        setActive((a) => Math.max(0, a - 5));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        pick(active);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        pick(active);
        break;
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          const i = typeahead(e.key);
          if (i >= 0) setActive(i);
        }
    }
  }

  return (
    <div className={`psel${open ? " psel--open" : ""}`}>
      <div
        ref={boxRef}
        className="psel__box"
        role="combobox"
        tabIndex={0}
        aria-label={label}
        aria-controls={listId}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-activedescendant={open ? optId(active) : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
        onBlur={(e) => {
          // Fokus ostaje na polju i kad se klikne opcija; zatvaramo samo kad fokus ode drugdje.
          if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) setOpen(false);
        }}
      >
        {selected ? (
          <>
            <span className="psel__thumb">
              <Image src={selected.image} alt="" width={48} height={48} />
            </span>
            <span className="psel__text">
              <span className="psel__name">{selected.name}</span>
              <span className="psel__desc">{selected.desc}</span>
            </span>
          </>
        ) : (
          <>
            <span className="psel__thumb psel__thumb--empty" aria-hidden="true" />
            <span className="psel__text">
              <span className="psel__placeholder">Odaberite proizvod</span>
            </span>
          </>
        )}
        <span className="psel__chev" aria-hidden="true" />
      </div>

      {/* Lista je uvijek u DOM-u (aria-controls pokazuje na postojeći element), a skrivena je dok je zatvorena. */}
      <div ref={listRef} id={listId} role="listbox" aria-label={label} className="psel__list" hidden={!open}>
        {CATALOG_GROUPS.map((g) => (
          <div role="group" aria-labelledby={`${uid}-g-${g.id}`} key={g.id}>
            <div className="psel__group" id={`${uid}-g-${g.id}`} role="presentation">
              {g.label}
            </div>
            {ORDER.map((c, i) =>
              c.group !== g.id ? null : (
                <div
                  key={c.id}
                  id={optId(i)}
                  role="option"
                  aria-selected={c.id === value}
                  className={`psel__opt${i === active ? " is-active" : ""}`}
                  onPointerMove={() => i !== active && setActive(i)}
                  // mousedown ne smije maknuti fokus s polja
                  onPointerDown={(e) => e.preventDefault()}
                  onClick={() => {
                    pick(i);
                    boxRef.current?.focus();
                  }}
                >
                  <span className="psel__thumb">
                    {open ? <Image src={c.image} alt="" width={56} height={56} /> : null}
                  </span>
                  <span className="psel__text">
                    <span className="psel__name">{c.name}</span>
                    <span className="psel__desc">{c.desc}</span>
                    {c.id !== value && taken.includes(c.id) ? (
                      <span className="psel__tag">Već na popisu</span>
                    ) : null}
                  </span>
                  <span className="psel__check" aria-hidden="true" />
                </div>
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
