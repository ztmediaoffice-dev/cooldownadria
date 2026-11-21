// Šest prednosti prema proizvođaču, s ikonama (16.11.2026., po uzoru na cool-down.ch).
// Izvor: brief, „Provjereni podaci proizvođača” → Prednosti. Ne dodavati nove tvrdnje.
// Prikazuje se samo na stranicama proizvoda, da se početna ne ponavlja.
// FIX AID je gotov jednokratni zavoj, pa nema stavke „Višekratna upotreba”.
import type { Product } from "@/lib/content";

const icon = {
  ready: (
    <>
      <circle cx="12" cy="13.5" r="7.5" />
      <path d="M12 13.5V9.5M9.5 2.5h5M12 2.5V6" />
    </>
  ),
  constant: (
    <>
      <path d="M10 14.8V4.5a2 2 0 0 1 4 0v10.3a4 4 0 1 1-4 0Z" />
      <path d="M12 9v7.2" />
    </>
  ),
  simple: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.3 2.7 2.7L16.2 9.4" />
    </>
  ),
  reuse: (
    <>
      <path d="M19.5 12a7.5 7.5 0 0 1-13 5.1M4.5 12a7.5 7.5 0 0 1 13-5.1" />
      <path d="M17.8 3.2v3.9h-3.9M6.2 20.8v-3.9h3.9" />
    </>
  ),
  move: (
    <>
      <circle cx="13.5" cy="4.5" r="1.8" />
      <path d="m9 21 2.6-6.2 3 2.4V21M6.5 12.5l3.2-4.3 4.3.4 2.5 3.4 2.5.8M11.6 14.8l1.2-6.2" />
    </>
  ),
  natural: (
    <>
      <path d="M5 19c0-8.5 5.5-14 15-14 0 9.5-5.5 15-14 15" />
      <path d="M5 19c3-4.5 6-7 10-9" />
    </>
  ),
};

export function Advantages({ p }: { p: Product }) {
  const items = [
    { i: icon.ready, title: "Spreman odmah", text: "Bez prethodnog hlađenja, bez hladnjaka i zamrzivača." },
    { i: icon.constant, title: "Konstantno hlađenje", text: "Ujednačeno i dugotrajno, dok se zavoj ne osuši." },
    { i: icon.simple, title: "Jednostavna primjena", text: "Pacijent ga sam stavlja i skida." },
    ...(p.uses
      ? [{ i: icon.reuse, title: "Višekratna uporaba", text: `Jedna boca ICE FLUID-a dovoljna je za ${p.uses}.` }]
      : []),
    { i: icon.move, title: "Bez ograničenja pokretljivosti", text: "Zavoj ostaje na mjestu dok se krećete." },
    { i: icon.natural, title: "Prirodno hlađenje", text: "Isparavanjem i aktivacijom receptora za hladnoću." },
  ];
  return (
    <ul className="adv">
      {items.map((it) => (
        <li className="adv__item" key={it.title}>
          <svg className="adv__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            {it.i}
          </svg>
          <h3 className="adv__title">{it.title}</h3>
          <p className="adv__text">{it.text}</p>
        </li>
      ))}
    </ul>
  );
}
