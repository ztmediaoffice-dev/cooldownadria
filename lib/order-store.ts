// Trenutni popis narudžbe, dijeli ga obrazac (InquiryForm) s WhatsApp linkom pored obrasca.
import type { OrderLine } from "@/lib/inquiry";

const EMPTY: OrderLine[] = [];
let lines: OrderLine[] = EMPTY;
const subs = new Set<() => void>();

export const orderStore = {
  get: () => lines,
  getServer: () => EMPTY,
  set(next: OrderLine[]) {
    lines = next;
    subs.forEach((f) => f());
  },
  subscribe(f: () => void) {
    subs.add(f);
    return () => {
      subs.delete(f);
    };
  },
};
