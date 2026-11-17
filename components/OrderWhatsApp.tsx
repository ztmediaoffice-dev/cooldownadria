"use client";

import { useSyncExternalStore } from "react";
import { linesText } from "@/lib/inquiry";
import { orderStore } from "@/lib/order-store";
import { waLink } from "@/lib/site";

// WhatsApp link pored obrasca: poruka sadrži popis iz obrasca (npr. „2 × PROFESSIONAL SET, 1 × ICE FLUID 250 ml”).
// Dok popis nije poznat (prvi prikaz, prazan popis), koristi se zadana poruka sa stranice.
export function OrderWhatsApp({ fallback }: { fallback: string }) {
  const lines = useSyncExternalStore(orderStore.subscribe, orderStore.get, orderStore.getServer);
  const list = linesText(lines);
  const text = list ? `Pozdrav, želim naručiti: ${list}.` : fallback;
  return (
    <a className="btn btn--ghost" href={waLink(text)} rel="noopener" target="_blank">
      Naručite preko WhatsAppa
    </a>
  );
}
