"use client";

import { useRef, useState } from "react";

/**
 * Puni video s glasom i natpisima. Ne kreće sam: posjetitelj ga pokreće
 * i tada se čuje zvuk. Nakon pokretanja ostaju ugrađene kontrole preglednika,
 * u kojima se mogu uključiti hrvatski titlovi.
 */
export function FilmVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  function start() {
    const v = ref.current;
    if (!v) return;
    setStarted(true);
    v.muted = false;
    v.play().catch(() => {});
    v.focus();
  }

  return (
    <div className="film__frame">
      <video
        ref={ref}
        src="/video/cooldown-adria-hr.mp4"
        poster="/video/cooldown-adria-hr-poster.jpg"
        playsInline
        preload="metadata"
        controls={started}
        tabIndex={started ? 0 : -1}
        aria-label="Video: primjena Cool Down seta u šest koraka, s glasom i natpisima na hrvatskom"
      >
        <track kind="captions" src="/video/cooldown-adria-hr.vtt" srcLang="hr" label="Hrvatski" />
      </video>
      {!started ? (
        <button type="button" className="film__play" onClick={start}>
          <span className="film__play-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
            </svg>
          </span>
          <span className="sr-only">Pokrenite video (41 s)</span>
        </button>
      ) : null}
    </div>
  );
}
