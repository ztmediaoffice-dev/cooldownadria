"use client";

import Image from "next/image";
import { useState } from "react";
import { STEPS } from "@/lib/content";

// Prikaz primjene korak po korak, ručno: korisnik bira korak u listi.
// Nema automatskog vrtenja, tajmera ni animacije.
//
// Pristupačnost:
// - svaki korak je dugme s tekstom koraka; aktivni ima aria-pressed="true",
//   pa čitač ekrana na istom dugmetu najavi promjenu stanja ("pritisnuto");
// - fokus ostaje na aktiviranom dugmetu;
// - slike nemaju live region i imaju prazan alt: svaka prikazuje točno ono što
//   tekst koraka već kaže (procjena po koraku je u briefu), pa bi opis bio dvostruk.
export function StepPlayer() {
  const [active, setActive] = useState(0);

  return (
    <div className="player">
      <div className="player__stage">
        {STEPS.map((s, i) => (
          <Image
            key={s.img3d}
            src={s.img3d}
            alt=""
            fill
            sizes="(max-width: 860px) 100vw, 50vw"
            className="player__img"
            data-active={i === active}
            priority={i === 0}
          />
        ))}
      </div>
      <div className="player__side">
        <ol className="player__list">
          {STEPS.map((s, i) => (
            <li key={s.img3d}>
              <button
                type="button"
                className="player__step"
                data-active={i === active}
                aria-pressed={i === active}
                onClick={() => setActive(i)}
              >
                <span className="player__n num">{i + 1}</span>
                <span className="player__t">{s.text}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
