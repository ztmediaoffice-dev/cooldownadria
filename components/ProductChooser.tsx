"use client";

import { useState } from "react";
import { PRODUCTS } from "@/lib/content";
import { ChooserCard } from "./Sections";

const NEEDS = [
  { id: "ordinacija", label: "Ordinacija ili klub", slug: "professional-set" },
  { id: "operacija", label: "Nakon operacije", slug: "professional-set" },
  { id: "kuca", label: "Kuća i sportska torba", slug: "first-aid-set" },
  { id: "brzo", label: "Brzo, bez miješanja", slug: "fix-aid" },
];

export function ProductChooser() {
  const [need, setNeed] = useState<string | null>(null);
  const pick = NEEDS.find((n) => n.id === need)?.slug ?? null;

  return (
    <div>
      <fieldset className="chooser">
        <legend>Za što vam treba?</legend>
        <div className="segctl">
          {NEEDS.map((n) => (
            <label key={n.id}>
              <input
                type="radio"
                name="need"
                value={n.id}
                checked={need === n.id}
                onChange={() => setNeed(n.id)}
              />
              <span>{n.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="products">
        {PRODUCTS.map((p) => (
          <ChooserCard key={p.slug} p={p} recommended={pick === p.slug} />
        ))}
      </div>
    </div>
  );
}
