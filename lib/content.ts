// Sav sadržaj je iz briefa i službenih izvora proizvođača (cool-down.ch, cool-down.swiss, IFU v05).
// Ne dodavati medicinske tvrdnje koje nisu na odobrenom popisu.

export type Product = {
  slug: string;
  name: string;
  short: string;
  forWhom: string;
  image: string;
  imageAlt: string;
  contents: string[];
  uses?: string;
  // SEO (14.11.2026., SEO-KLJUCNE-RIJECI.md): naslov za Google i meta opis.
  seoTitle: string;
  seoDescription: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "professional-set",
    name: "PROFESSIONAL SET",
    short: "Za ordinacije, klubove i sve koji hlade često.",
    forWhom:
      "Za fizioterapeute, sportske klubove i za oporavak nakon operacije, kad se hladi više puta dnevno.",
    image: "/img/proizvodi/professional-set.jpg",
    imageAlt: "PROFESSIONAL SET: boca ICE FLUID-a, mješalica, pamučni i fiksirni zavoj",
    contents: [
      "ICE FLUID 250 ml",
      "2 pamučna zavoja 10 × 200 cm",
      "1 fiksirni zavoj",
      "Mješalica 1800 ml",
    ],
    uses: "oko 40 primjena",
    seoTitle: "Cool Down PROFESSIONAL SET za klubove",
    seoDescription:
      "Za fizioterapeute, klubove i oporavak nakon operacije: ICE FLUID 250 ml (oko 40 primjena), 2 pamučna zavoja, fiksirni zavoj i mješalica. Hladi na 7 do 10 °C.",
  },
  {
    slug: "first-aid-set",
    name: "FIRST AID SET",
    short: "Za torbu, kuću i prvu pomoć na terenu.",
    forWhom: "Za kućnu ljekarnu, sportsku torbu i prvu pomoć kod uganuća ili udarca.",
    image: "/img/proizvodi/first-aid-set.jpg",
    imageAlt: "FIRST AID SET: boca ICE FLUID-a 100 ml, posuda, pamučni i fiksirni zavoj",
    contents: [
      "ICE FLUID 100 ml",
      "1 pamučni zavoj 10 × 200 cm",
      "Fiksirni zavoj, oko 27 m",
      "Posuda 400 ml",
    ],
    uses: "oko 15 primjena",
    seoTitle: "Cool Down FIRST AID SET za prvu pomoć",
    seoDescription:
      "Hladni oblog za kućnu ljekarnu, sportsku torbu i prvu pomoć kod uganuća: ICE FLUID 100 ml (oko 15 primjena), pamučni i fiksirni zavoj te posuda.",
  },
  {
    slug: "fix-aid",
    name: "FIX AID",
    short: "Bez miješanja. Otvori, omotaj, gotovo.",
    forWhom: "Kad nema vremena za miješanje: na terenu, u autu, na putu.",
    image: "/img/proizvodi/fix-aid.jpg",
    imageAlt: "FIX AID: vrećica s gotovim natopljenim zavojem",
    contents: ["Gotov natopljeni zavoj 10 cm × 1,5 m"],
    seoTitle: "Cool Down FIX AID, gotov hladni oblog",
    seoDescription:
      "Gotov natopljeni zavoj za hlađenje, 10 cm × 1,5 m. Otvori, omotaj, gotovo: bez miješanja, na terenu, u autu ili na putu. Hladi na 7 do 10 °C.",
  },
];

export const SINGLE_ITEMS = [
  "ICE FLUID 100 ml",
  "ICE FLUID 250 ml",
  "Pamučni zavoj 6 × 150 cm",
  "Pamučni zavoj 10 × 200 cm",
  "Fiksirni zavoj, oko 6,9 cm × 27 m",
  "Mješalica 1800 ml",
  "Posuda 400 ml",
];

// Link „Upit za pojedinačne dijelove” (/narudzba?proizvod=…): isti obrazac, prazan prvi red,
// naslov i uvod za dijelove.
export const PARTS_OPTION = "Pojedinačni dijelovi";

// Katalog za narudžbu s više stavki (17.11.2026.). Nazivi su isti kao u PRODUCTS i SINGLE_ITEMS,
// da stari linkovi /narudzba?proizvod=<naziv> i dalje rade. Opisi su samo podaci koji su već na webu.
// Slike su fotografije proizvođača sa cool-down.ch (dozvola 14.11.2026.), ujednačene na 480 × 480.
export type CatalogItem = {
  id: string;
  name: string;
  group: "set" | "dio";
  image: string;
  desc: string;
};

export const CATALOG_GROUPS = [
  { id: "set", label: "Setovi" },
  { id: "dio", label: "Pojedinačni dijelovi" },
] as const;

export const CATALOG: CatalogItem[] = [
  {
    id: "professional-set",
    name: "PROFESSIONAL SET",
    group: "set",
    image: "/img/katalog/professional-set-k1.jpg",
    desc: "ICE FLUID 250 ml, 2 pamučna zavoja, fiksirni zavoj i mješalica. Oko 40 primjena.",
  },
  {
    id: "first-aid-set",
    name: "FIRST AID SET",
    group: "set",
    image: "/img/katalog/first-aid-set-k1.jpg",
    desc: "ICE FLUID 100 ml, pamučni i fiksirni zavoj te posuda. Oko 15 primjena.",
  },
  {
    id: "fix-aid",
    name: "FIX AID",
    group: "set",
    image: "/img/katalog/fix-aid-k1.jpg",
    desc: "Gotov natopljeni zavoj 10 cm × 1,5 m, bez miješanja.",
  },
  {
    id: "ice-fluid-100",
    name: "ICE FLUID 100 ml",
    group: "dio",
    image: "/img/katalog/ice-fluid-100-k1.jpg",
    desc: "Koncentrat za oko 15 primjena.",
  },
  {
    id: "ice-fluid-250",
    name: "ICE FLUID 250 ml",
    group: "dio",
    image: "/img/katalog/ice-fluid-250-k1.jpg",
    desc: "Koncentrat za oko 40 primjena.",
  },
  {
    id: "pamucni-zavoj-6",
    name: "Pamučni zavoj 6 × 150 cm",
    group: "dio",
    image: "/img/katalog/pamucni-zavoj-6-k1.jpg",
    desc: "100 % pamuk, bez lateksa.",
  },
  {
    id: "pamucni-zavoj-10",
    name: "Pamučni zavoj 10 × 200 cm",
    group: "dio",
    image: "/img/katalog/pamucni-zavoj-10-k1.jpg",
    desc: "100 % pamuk, bez lateksa.",
  },
  {
    id: "fiksirni-zavoj",
    name: "Fiksirni zavoj, oko 6,9 cm × 27 m",
    group: "dio",
    image: "/img/katalog/fiksirni-zavoj-k1.jpg",
    desc: "Ide preko pamučnog zavoja.",
  },
  {
    id: "mjesalica-1800",
    name: "Mješalica 1800 ml",
    group: "dio",
    image: "/img/katalog/mjesalica-1800-k1.jpg",
    desc: "Za miješanje ICE FLUID-a s vodom, kao u PROFESSIONAL SET-u.",
  },
  {
    id: "posuda-400",
    name: "Posuda 400 ml",
    group: "dio",
    image: "/img/katalog/posuda-400-k1.jpg",
    desc: "Za miješanje ICE FLUID-a s vodom, kao u FIRST AID SET-u.",
  },
];

export const catalogById = (id: string) => CATALOG.find((c) => c.id === id);
export const catalogByName = (name: string) => CATALOG.find((c) => c.name === name);

export type Application = {
  slug: string;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  position: string;
  body: string[];
  recommended: string;
  // SEO (14.11.2026., SEO-KLJUCNE-RIJECI.md): naslov za Google, meta opis i naslov sekcije s tekstom.
  seoTitle: string;
  seoDescription: string;
  bodyTitle: string;
};

export const APPLICATIONS: Application[] = [
  {
    slug: "nakon-operativnih-zahvata",
    title: "Nakon operativnih zahvata",
    lead: "Oblog koji pacijent može nositi kod kuće, bez leda iz zamrzivača i bez straha od ozeblina.",
    image: "/img/foto/nakon-operacije.jpg",
    imageAlt: "Osoba s ortozom na koljenu hoda s hodalicom.",
    position: "62% 60%",
    body: [
      "Proizvođač navodi primjenu u ortopediji odmah nakon operacije i tijekom rehabilitacije. Studija koju navodi provedena je na pacijentima nakon operacije prednjeg križnog ligamenta. U tom razdoblju hladi se 2 do 3 puta dnevno.",
      "Pacijent sam stavlja i skida zavoj. Zavoj ostaje na mjestu i ne ograničava pokrete, pa se hlađenje uklapa u svakodnevicu.",
      "Rana od operacije i svjež ožiljak prije hlađenja se prekriju folijom (npr. OpSite), tako da zavoj ne dodiruje ranu. Cool Down se nikad ne stavlja izravno na otvorenu ranu.",
    ],
    recommended: "professional-set",
    seoTitle: "Hladni oblog nakon operacije, bez leda",
    seoDescription:
      "Hladni oblog koji pacijent nakon operacije nosi kod kuće, bez leda iz zamrzivača i bez ozeblina. Hladi na 7 do 10 °C, a stavlja se 2 do 3 puta dnevno.",
    bodyTitle: "Hlađenje nakon operacije, kod kuće",
  },
  {
    slug: "nakon-ozljeda",
    title: "Nakon ozljeda",
    lead: "Uganuće gležnja ili drugog zgloba, nagnječenje, istegnuće ili tupa ozljeda: hladni oblog je spreman odmah, na terenu ili kod kuće.",
    image: "/img/foto/nakon-ozljede.jpg",
    imageAlt: "Sportaš sjedi na atletskoj stazi, a druga osoba mu pridržava koljeno.",
    position: "30% 50%",
    body: [
      "Sve su to indikacije koje proizvođač navodi za ozljede udova.",
      "ICE FLUID ne treba hladnjak ni zamrzivač, pa je hladni oblog za gležanj ili koljeno pri ruci i kad nakon udarca ili uganuća nastane oteklina. Dovoljno ga je pomiješati s vodom, natopiti njime zavoj i omotati zglob. FIX AID je već natopljen.",
      "Zavoj hladi na 7 do 10 °C i, za razliku od leda, ne stvara ozebline.",
    ],
    recommended: "first-aid-set",
    seoTitle: "Hladni oblog za uganuće gležnja i ozljede",
    seoDescription:
      "Uganuće gležnja, nagnječenje, istegnuće ili tupa ozljeda: Cool Down hladni oblog je spreman odmah, bez zamrzivača. Hladi na 7 do 10 °C i ne stvara ozebline.",
    bodyTitle: "Hladni oblozi za uganuće zgloba i udarac",
  },
  {
    slug: "nakon-fizickog-napora",
    title: "Nakon fizičkog napora",
    lead: "Regeneracija mišića prije i nakon natjecanja, u svlačionici, autobusu ili kod kuće.",
    image: "/img/foto/napor-misici.jpg",
    imageAlt: "Ruke obuhvaćaju list noge.",
    position: "50% 40%",
    body: [
      "Tu primjenu proizvođač navodi za sportaše i fizioterapeute.",
      "Zavoj se nosi 2 sata i duže i ne ograničava kretanje. Sportaš se može vratiti u autobus, na sastanak ili kući.",
      "Jedna boca od 250 ml dovoljna je za oko 40 primjena, što je važno za klubove s puno igrača.",
    ],
    recommended: "professional-set",
    seoTitle: "Hladni oblozi za sportaše nakon napora",
    seoDescription:
      "Hladni oblog za sportaše i klubove, u svlačionici ili kod kuće. Nosi se 2 sata i duže i ne ograničava kretanje. Boca od 250 ml dovoljna je za oko 40 primjena.",
    bodyTitle: "Hladni oblozi za sportaše i klubove",
  },
];

export const BENEFITS = [
  {
    title: "Ne stvara ozebline",
    text: "Hladi na 7 do 10 °C. Led pada prema 0 °C i zato se mora skidati.",
    source: false,
  },
  {
    title: "Nosi se 2 sata i duže",
    text: "Hlađenje je ujednačeno dok se zavoj ne osuši. Pokreti nisu ograničeni.",
    source: false,
  },
  {
    title: "Brži oporavak",
    // 21.11.2026.: oslanja se samo na statistički značajne nalaze ACL studije (PMC6579562, vidi brief, stavka 7).
    // Nalaz o lijekovima protiv bolova (nije značajan) ostaje samo u pregledu studije na /kako-djeluje.
    text: "Prema studiji koju navodi proizvođač, 30 dana nakon operacije koljena mišićni presjek uz Cool Down nije se značajno smanjio, a uz hladni paket i bez hlađenja jest.",
    source: true,
  },
  {
    title: "Bolja regeneracija tkiva",
    text: "Nakon 90 dana mišićni presjek uz Cool Down statistički je značajno porastao, jedini od tri skupine u istoj studiji.",
    source: true,
  },
];

export const COMPARISON = [
  { row: "Temperatura", cd: "Hladi na 7 do 10 °C", ice: "Pada prema 0 °C" },
  { row: "Ozebline", cd: "Ne stvara ozebline", ice: "Rizik ako se drži predugo" },
  { row: "Trajanje", cd: "2 sata i duže", ice: "Kratko, uz pauze" },
  { row: "Priprema", cd: "Spreman odmah, bez zamrzivača", ice: "Treba zamrzivač" },
  { row: "Kretanje", cd: "Bez ograničenja pokretljivosti", ice: "Oblog se drži ili veže" },
];

// img: službene ilustracije proizvođača (Upute, Primjena, Proizvodi).
// img3d: naše web ilustracije iz 3D rendera videa (samo prikaz koraka na početnoj).
// Nisu nove službene upute proizvođača; ispravnost prikaza potvrđuje se prije objave.
export const STEPS = [
  { img: "/img/koraci/korak-1.png", img3d: "/img/koraci-3d/korak-1.jpg", text: "Ulijte ICE FLUID u posudu." },
  { img: "/img/koraci/korak-2.png", img3d: "/img/koraci-3d/korak-2.jpg", text: "Dodajte vodu u omjeru 1 : 5." },
  { img: "/img/koraci/korak-3.png", img3d: "/img/koraci-3d/korak-3.jpg", text: "Natopite pamučni zavoj." },
  { img: "/img/koraci/korak-4.png", img3d: "/img/koraci-3d/korak-4-cijedenje.jpg", text: "Lagano ga iscijedite." },
  { img: "/img/koraci/korak-5.png", img3d: "/img/koraci-3d/korak-5.jpg", text: "Omotajte njime zglob u jednom sloju, prema srcu." },
  { img: "/img/koraci/korak-6.png", img3d: "/img/koraci-3d/korak-6.jpg", text: "Prekrijte fiksirnim zavojem." },
];

export const PARTNER_SEGMENTS = [
  {
    title: "Fizioterapeuti i ordinacije",
    text: "Hlađenje u tretmanu, a nakon njega i kod kuće.",
  },
  {
    title: "Sportski klubovi",
    text: "Spreman u torbi, bez leda i hladnjaka. Jedna boca za oko 40 primjena.",
  },
  {
    title: "Ljekarne i veledrogerije",
    text: "Švicarski medicinski proizvod za kućnu ljekarnu i prvu pomoć.",
  },
  {
    title: "Teretane i poslovni korisnici",
    text: "Prva pomoć i regeneracija za članove i zaposlenike.",
  },
];

export const PARTNER_MODELS = [
  {
    title: "Koristite ga u tretmanu",
    text: "Cool Down postaje dio vaše terapije, a pacijent ga upozna već u ordinaciji.",
  },
  {
    title: "Prodajete ga za kućnu uporabu",
    text: "Pacijent odlazi sa setom i nastavlja hlađenje kod kuće, kako ste mu pokazali.",
  },
  {
    title: "Preporučujete ga",
    text: "Pacijent naručuje preko weba, a vaša preporuka se bilježi.",
  },
];

export const REFERENCES = {
  sport: [
    "Thömus maxon",
    "Njemačka reprezentacija u hokeju na travi",
    "SCOTT-SRAM MTB",
    "Swiss Cycling",
    "HC Thurgau",
    "Rugby Club St. Gallen",
  ],
  clinics: [
    "medbase Abtwil",
    "Spital Muri",
    "ALTIUS",
    "Gelenkzentrum Winterthur",
    "Berit Klinik",
    "Orthopädie St. Gallen",
  ],
};

export const SAFETY = {
  contraindications: [
    "otvorenih rana, ogrebotina, svježih ožiljaka i ekcema, osim preko folije ili zavoja",
    "trudnoće i dojenja",
    "dojenčadi i djece lakše od 10 kg",
  ],
  sideEffects: "Rijetko se može pojaviti lokalna iritacija kože ili kontaktna alergija.",
  composition: "Sadrži mentol i kamfor. Pamučni zavoj je 100 % pamuk, bez lateksa.",
  flammable:
    "ICE FLUID je lako zapaljiv. Čuvajte ga na sobnoj temperaturi, dalje od topline i otvorenog plamena.",
};

// id: stabilni identifikator pitanja (npr. za izbor pitanja na početnoj), neovisan o redoslijedu.
export const FAQ = [
  {
    id: "led",
    q: "Je li Cool Down isto što i led?",
    a: "Nije. Led hladi naglo i pada prema 0 °C, pa se mora skidati. Cool Down hladi na 7 do 10 °C i ne stvara ozebline, pa se može nositi 2 sata i duže.",
  },
  {
    id: "trajanje",
    q: "Koliko dugo se drže hladni oblozi?",
    a: "2 sata i duže. Zavoj hladi dok se ne osuši. Hlađenje se može ponavljati koliko treba, a nakon operacije 2 do 3 puta dnevno.",
  },
  {
    id: "preko-noci",
    q: "Mogu li ga nositi preko noći?",
    a: "Prema uputama proizvođača, da. Prije prve primjene pročitajte upute iz pakiranja.",
  },
  {
    id: "hladnjak",
    q: "Treba li ga držati u hladnjaku?",
    a: "Ne. ICE FLUID se čuva na sobnoj temperaturi i spreman je odmah. Hladi isparavanjem.",
  },
  {
    id: "odabir-seta",
    q: "Koji set odabrati?",
    a: "PROFESSIONAL SET je za ordinacije, klubove i oporavak nakon operacije, kad se hladi često. FIRST AID SET je za kuću i sportsku torbu. FIX AID je gotov zavoj za brzu primjenu. Ako niste sigurni, pošaljite upit.",
  },
  {
    id: "kontraindikacije",
    q: "Kada se ne smije koristiti?",
    a: "U trudnoći i dojenju te kod dojenčadi i djece lakše od 10 kg. Na otvorene rane, ogrebotine, svježe ožiljke i ekcem ne stavlja se izravno, nego samo preko folije ili zavoja.",
  },
  {
    id: "sastav",
    q: "Što je u boci?",
    a: "ICE FLUID je koncentrat koji se miješa s vodom u omjeru 1 : 5. Sadrži mentol i kamfor i ne isušuje kožu. Lako je zapaljiv, pa ga čuvajte dalje od topline.",
  },
  {
    // Dodano 14.11.2026. (ljudi pretražuju „gel za hlađenje” i „cool down gel”); samo činjenice iz uputa.
    id: "gel",
    q: "Je li Cool Down gel?",
    a: "Nije. ICE FLUID je tekući koncentrat kojim se natapa pamučni zavoj, a preko njega ide fiksirni zavoj.",
  },
  {
    id: "kupnja",
    q: "Gdje mogu kupiti Cool Down i kolika je cijena?",
    a: "Pošaljite narudžbu ili upit preko ove stranice. Cijenu i uvjete dostave šaljemo na upit.",
  },
];

export const SPORT = [
  {
    img: "/img/sport/thoemus-maxon.jpg",
    alt: "Biciklist tima Thömus maxon na utrci brdskog biciklizma",
    team: "Thömus maxon",
    note: "Svjetski prvaci u brdskom biciklizmu 2023.",
    position: "55% 40%",
  },
  {
    img: "/img/sport/hokej-reprezentacija.jpg",
    alt: "Njemačka reprezentacija u hokeju na travi slavi sa svjetskim trofejem",
    team: "Njemačka reprezentacija u hokeju na travi",
    note: "Svjetski prvaci 2023.",
    position: "50% 35%",
  },
  {
    img: "/img/sport/scott-sram.jpg",
    alt: "SCOTT-SRAM MTB tim s biciklima u planinama",
    team: "SCOTT-SRAM MTB",
    note: "Profesionalni tim u brdskom biciklizmu",
    position: "50% 40%",
  },
];
