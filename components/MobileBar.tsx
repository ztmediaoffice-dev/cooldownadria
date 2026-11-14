"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Donja traka s akcijama na mobitelu. Elementi s data-mobilebar-hide-visible
 * (završni CTA na početnoj) skrivaju traku dok su na ekranu.
 * Ako stranica ima element s atributom
 * data-mobilebar-hide (npr. glavni CTA u heroju), traka se pojavljuje tek kad
 * je korisnik taj element prošao, tj. kad je cijeli iznad ekrana. Dok je CTA
 * na ekranu ili još ispod njega, traka je skrivena, da se ista akcija ne
 * ponavlja. Na stranicama bez tog elementa traka je uvijek vidljiva.
 */
// Na stranicama obrazaca traka ponavlja akciju koju korisnik već obavlja, pa se ne prikazuje.
const HIDDEN_ON = ["/narudzba", "/zahtjev", "/hvala", "/kontakt"];

export function MobileBar() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const hidden = HIDDEN_ON.includes(pathname);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    let want = false;
    const apply = () => {
      // Ako je fokus tastature unutar trake, ne skrivamo je dok fokus ne izađe,
      // da se fokus ne izgubi (inert bi ga maknuo). Fokus ne premještamo.
      const keep = !want && bar.contains(document.activeElement);
      const on = want || keep;
      bar.dataset.shown = String(on);
      bar.inert = !on;
    };
    const passTargets = Array.from(document.querySelectorAll("[data-mobilebar-hide]"));
    const visTargets = Array.from(document.querySelectorAll("[data-mobilebar-hide-visible]"));
    if (passTargets.length === 0 && visTargets.length === 0) {
      want = true;
      apply();
      return;
    }
    // "Prođen": donji rub elementa je iznad donjeg ruba sticky headera.
    // "Vidljiv": bilo koji dio elementa je između headera i dna ekrana. Dno ekrana
    // (a ne vrh trake) je namjerno, da traka nestane prije nego što prekrije taj CTA.
    // Položaj se računa pri svakom skrolanju (jednom po frameu), pa i brzi skok daje točan rezultat.
    const header = document.querySelector(".header");
    let raf = 0;
    const update = () => {
      raf = 0;
      const top = header ? header.getBoundingClientRect().bottom : 0;
      const passed = passTargets.every((t) => t.getBoundingClientRect().bottom <= top);
      const visible = visTargets.some((t) => {
        const r = t.getBoundingClientRect();
        return r.bottom > top && r.top < window.innerHeight;
      });
      want = passed && !visible;
      apply();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onFocusOut = () => requestAnimationFrame(apply);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    bar.addEventListener("focusout", onFocusOut);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      bar.removeEventListener("focusout", onFocusOut);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  // Stvarna visina trake (s safe-area i prelomljenim tekstom dugmadi) ide u
  // --mobilebar-h, iz kojeg CSS računa donji razmak stranice i scroll-padding.
  useEffect(() => {
    const root = document.documentElement;
    // Skrivena traka ne zauzima prostor: donji razmak i scroll-padding padaju na 0.
    if (hidden) {
      root.style.setProperty("--mobilebar-h", "0px");
      return () => root.style.removeProperty("--mobilebar-h");
    }
    const bar = ref.current;
    if (!bar || typeof ResizeObserver === "undefined") return;
    const set = () => root.style.setProperty("--mobilebar-h", `${bar.getBoundingClientRect().height}px`);
    const ro = new ResizeObserver(set);
    ro.observe(bar, { box: "border-box" });
    set();
    return () => {
      ro.disconnect();
      root.style.removeProperty("--mobilebar-h");
    };
  }, [hidden]);

  if (hidden) return null;

  // Do prvog mjerenja traka je skrivena, da ne bljesne preko heroja.
  return (
    <div className="mobilebar" ref={ref} data-shown="false" inert>
      <Link href="/zahtjev" className="btn btn--ghost">
        Zatražite demonstraciju
      </Link>
      <Link href="/narudzba" className="btn">
        Naručite svoj set
      </Link>
    </div>
  );
}
