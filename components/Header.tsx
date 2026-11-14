"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const NAV = [
  { href: "/kako-djeluje", label: "Kako djeluje" },
  { href: "/primjena", label: "Primjena" },
  { href: "/proizvodi", label: "Proizvodi" },
  { href: "/upute", label: "Upute" },
  { href: "/za-partnere", label: "Za partnere" },
  { href: "/pitanja", label: "Pitanja" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Uži raspored (izbornik umjesto pune navigacije) kad puna navigacija ne stane,
  // npr. pri većem osnovnom fontu. Uski ekrani to dobiju već preko CSS-a.
  const [compact, setCompact] = useState(false);
  const inRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(false);
  // Zašto se izbornik zatvara: o tome ovisi kamo ide fokus nakon zatvaranja.
  const closeRef = useRef<{ reason: "escape" | "button" | "link" | "auto"; focusInMenu: boolean; href: string | null } | null>(
    null,
  );

  const closeMenu = (reason: "escape" | "button" | "link" | "auto") => {
    if (!openRef.current) return;
    const ae = document.activeElement;
    closeRef.current = {
      reason,
      focusInMenu: !!ae && (ae === btnRef.current || !!drawerRef.current?.contains(ae)),
      href: ae instanceof HTMLAnchorElement && drawerRef.current?.contains(ae) ? ae.getAttribute("href") : null,
    };
    openRef.current = false;
    setOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    openRef.current = open;
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu("escape");
    };
    if (open) window.addEventListener("keydown", onKey);
    // Dok je izbornik otvoren, sadržaj ispod njega (i skip link koji vodi u njega)
    // nije dostupan tastaturi, da Tab ne ode na elemente koje izbornik prekriva.
    const covered = [
      document.querySelector<HTMLElement>("main"),
      document.querySelector<HTMLElement>("footer.footer"),
      document.querySelector<HTMLElement>(".skip"),
    ];
    const bar = document.querySelector<HTMLElement>(".mobilebar");
    if (open) {
      covered.forEach((el) => el && (el.inert = true));
      if (bar) bar.inert = true;
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      if (open) {
        covered.forEach((el) => el && (el.inert = false));
        // Traka sama vodi inert prema tome je li prikazana (data-shown).
        if (bar) bar.inert = bar.dataset.shown !== "true";
      }
    };
  }, [open]);

  // Fokus pri otvaranju i nakon zatvaranja izbornika.
  useEffect(() => {
    if (open) {
      // Fokus ulazi u otvoreni izbornik, na prvi link.
      drawerRef.current?.querySelector<HTMLElement>("a")?.focus();
      return;
    }
    const closed = closeRef.current;
    closeRef.current = null;
    // Klik na link: korisnik odlazi na novu stranicu, fokus se ne vraća.
    if (!closed || closed.reason === "link") return;
    if (closed.reason === "auto" && !closed.focusInMenu) return;
    const btn = btnRef.current;
    if (btn && btn.getClientRects().length > 0) {
      btn.focus();
      return;
    }
    // Dugme više nije vidljivo (širina se promijenila i puna navigacija stane):
    // fokus ide na isti cilj u headeru, a ako ga nema, na logo.
    const hi = inRef.current;
    const visible = (a: HTMLElement) => a.getClientRects().length > 0 && getComputedStyle(a).visibility !== "hidden";
    const links = hi ? Array.from(hi.querySelectorAll<HTMLAnchorElement>("a")).filter(visible) : [];
    const same = closed.href ? links.find((a) => a.getAttribute("href") === closed.href) : undefined;
    (same ?? hi?.querySelector<HTMLElement>(".header__logo"))?.focus();
  }, [open]);

  useEffect(() => {
    const hi = inRef.current;
    const logo = hi?.querySelector<HTMLElement>(".header__logo");
    const nav = hi?.querySelector<HTMLElement>(".nav");
    const cta = hi?.querySelector<HTMLElement>(".header__cta");
    if (!hi || !logo || !nav || !cta) return;
    const narrow = window.matchMedia("(max-width: 75.5em)");
    const check = () => {
      if (narrow.matches) {
        setCompact(false);
        return;
      }
      // .nav i .header__cta su uvijek široki koliko im treba (flex: none,
      // a u užem rasporedu width: max-content), pa se mjere jednako u oba stanja.
      const cs = getComputedStyle(hi);
      const avail = hi.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const gap = parseFloat(cs.columnGap) || 0;
      const need = logo.offsetWidth + nav.scrollWidth + cta.scrollWidth + 2 * gap;
      const tooWide = need > avail;
      setCompact(tooWide);
      if (!tooWide) closeMenu("auto");
    };
    const ro = new ResizeObserver(check);
    [hi, logo, nav, cta].forEach((el) => ro.observe(el));
    narrow.addEventListener("change", check);
    document.fonts?.ready.then(check);
    check();
    return () => {
      ro.disconnect();
      narrow.removeEventListener("change", check);
    };
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="header" data-scrolled={scrolled || open} data-nav={compact ? "compact" : undefined} data-open={open}>
      <div className="wrap header__in" ref={inRef}>
        <Link href="/" className="header__logo" aria-label="Cooldown Adria, početna" onClick={() => closeMenu("link")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Cooldown Adria" width={66} height={38} />
        </Link>
        <nav className="nav" aria-label="Glavna navigacija">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header__cta">
          <Link href="/zahtjev" className="header__link">
            Zatražite demonstraciju
          </Link>
          <Link href="/narudzba" className="btn btn--s">
            Naručite svoj set
          </Link>
        </div>
        <button
          type="button"
          ref={btnRef}
          className="menu-btn"
          aria-expanded={open}
          aria-controls="drawer"
          aria-label={open ? "Zatvori izbornik" : "Otvori izbornik"}
          onClick={() => (openRef.current ? closeMenu("button") : setOpen(true))}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>
      <div
        id="drawer"
        className="drawer"
        ref={drawerRef}
        data-open={open}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) closeMenu("link");
        }}
      >
        <nav aria-label="Izbornik">
          <Link href="/">Početna</Link>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/kontakt">Kontakt</Link>
          <Link href="/zahtjev">Zatražite demonstraciju</Link>
          <Link href="/narudzba">Naručite svoj set</Link>
        </nav>
      </div>
    </header>
  );
}
