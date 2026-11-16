// Osnovni podaci o stranici.
// E-mail i pravni podaci su potvrđeni (14.11.2026.). Telefon je dostavljen 15.11.2026. (isti kao na Google profilu); WhatsApp na istom broju potvrđen 16.11.2026.
// Dok je `phone` prazan, gumbi za poziv i WhatsApp se ne prikazuju.

type Site = {
  name: string;
  url: string;
  email: string;
  phone: string;
  whatsapp: string;
  delivery: string;
  company: { name: string; oib: string; address: string };
  indexable: boolean;
};

export const SITE: Site = {
  name: "Cooldown Adria",
  url: "https://cooldownadria.com",
  email: "info@cooldownadria.com", // potvrđeno 14.11.2026.
  phone: "+385 91 217 4000", // 15.11.2026., isti broj kao na Google Business Profilu
  whatsapp: "385912174000", // 16.11.2026., isti broj kao telefon; korisnik je potvrdio da ima WhatsApp
  delivery: "Dostava u Hrvatskoj",
  // Pravni podaci tvrtke (dostavio Milan, 14.11.2026.).
  company: {
    name: "COOL DOWN ADRIA d.o.o. za trgovinu i usluge",
    oib: "56989887484",
    address: "Zadarska ulica 7/E, 21300 Makarska",
  },
  // Dok je false, stranica ima noindex. Na dan lansiranja postaviti na true.
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === "true",
};

export const CLAIM_TEMP = "Hladi na 7 do 10 °C";

// Profili na mrežama (potvrdio korisnik 15.11.2026.). Prikazuju se u footeru.
export const SOCIAL = [
  { id: "facebook", name: "Facebook", url: "https://www.facebook.com/cooldownadria" },
  { id: "instagram", name: "Instagram", url: "https://www.instagram.com/cooldownadria" },
  { id: "linkedin", name: "LinkedIn", url: "https://www.linkedin.com/company/cooldownadria" },
  { id: "x", name: "X", url: "https://x.com/cooldownadria" },
  { id: "youtube", name: "YouTube", url: "https://www.youtube.com/@cooldownadria" },
] as const;

// Link za WhatsApp s unaprijed upisanom porukom (kupac je može izmijeniti prije slanja).
export function waLink(text?: string) {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
