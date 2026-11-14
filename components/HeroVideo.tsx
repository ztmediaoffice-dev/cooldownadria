"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Petlja u heroju: 3D kadrovi bez natpisa i bez zvuka, kreće sama.
 * Gumb za pauzu je tu zbog pristupačnosti (WCAG 2.2.2). Uz smanjeno
 * kretanje petlja ne kreće sama.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.play().catch(() => setPlaying(false));
    }
  }, []);

  function togglePlay() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }

  return (
    <div className="hero__video">
      <video
        ref={ref}
        src="/video/cooldown-adria-petlja.mp4"
        poster="/video/cooldown-adria-petlja-poster.jpg"
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div className="hero__video-controls">
        <button type="button" className="hero__video-btn" onClick={togglePlay}>
          {playing ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
            </svg>
          )}
          <span className="sr-only">{playing ? "Zaustavi animaciju" : "Pokreni animaciju"}</span>
        </button>
      </div>
    </div>
  );
}
