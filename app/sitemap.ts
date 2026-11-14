import type { MetadataRoute } from "next";
import { APPLICATIONS, PRODUCTS } from "@/lib/content";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/kako-djeluje",
    "/primjena",
    ...APPLICATIONS.map((a) => `/primjena/${a.slug}`),
    "/proizvodi",
    ...PRODUCTS.map((p) => `/proizvodi/${p.slug}`),
    "/upute",
    "/za-partnere",
    "/pitanja",
    "/o-nama",
    "/kontakt",
    "/narudzba",
    "/zahtjev",
  ];
  return pages.map((p) => ({ url: `${SITE.url}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
