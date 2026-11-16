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
    forWhom: "Za kućnu ljekarnu, sportsku torbu i prvu pomoć nakon ozljede.",
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
      "Hladni oblog za kućnu ljekarnu, sportsku torbu i prvu pomoć nakon ozljede: ICE FLUID 100 ml (oko 15 primjena), pamučni i fiksirni zavoj te posuda.",
  },
  {
    slug: "fix-aid",
    name: "FIX AID",
    short: "Gotov natopljeni zavoj. Otvori, omotaj, gotovo.",
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

// Upit za pojedinačne dijelove: kategorija bez odabira seta, a dijelovi se navode u napomeni.
export const PARTS_OPTION = "Pojedinačni dijelovi";

export const ORDER_OPTIONS = [
  "PROFESSIONAL SET",
  "FIRST AID SET",
  "FIX AID",
  PARTS_OPTION,
  ...SINGLE_ITEMS,
  "Nisam siguran, trebam savjet",
];

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
    lead: "Hlađenje koje pacijent može nositi kod kuće, bez leda iz zamrzivača i bez straha od ozeblina.",
    image: "/img/foto/nakon-operacije.jpg",
    imageAlt: "Osoba s ortozom na koljenu hoda uz hodalicu.",
    position: "62% 60%",
    body: [
      "Proizvođač navodi primjenu u ortopediji odmah nakon operacije i tijekom rehabilitacije. Studija proizvođača rađena je nakon operacije koljena (prednji križni ligament). Nakon operacije hladi se 2 do 3 puta dnevno.",
      "Pacijent sam stavlja i skida zavoj. Zavoj ostaje na mjestu i ne ograničava pokrete, pa se hlađenje uklapa u svakodnevicu.",
      "Svježe rane se prije primjene prekriju folijom. Na otvorenu ranu Cool Down se ne stavlja.",
    ],
    recommended: "professional-set",
    seoTitle: "Hladni oblog nakon operacije, bez leda",
    seoDescription:
      "Hladni oblog koji pacijent nakon operacije nosi kod kuće, bez leda iz zamrzivača i bez ozeblina. Hladi na 7 do 10 °C. Nakon operacije hladi se 2 do 3 puta dnevno.",
    bodyTitle: "Hlađenje nakon operacije, kod kuće",
  },
  {
    slug: "nakon-ozljeda",
    title: "Nakon ozljeda",
    lead: "Uganuće gležnja ili zgloba, nagnječenje, istegnuće ili tupa ozljeda: hladni oblog je spreman odmah, na terenu ili kod kuće.",
    image: "/img/foto/nakon-ozljede.jpg",
    imageAlt: "Sportaš sjedi na atletskoj stazi, a druga osoba mu pridržava koljeno.",
    position: "30% 50%",
    body: [
      "Indikacije prema proizvođaču su uganuća, nagnječenja, tupe ozljede i istegnuća udova.",
      "ICE FLUID ne treba hladnjak ni zamrzivač, pa je hladni oblog pri ruci i kad nakon udarca ili uganuća nastane oteklina. Pomiješa se s vodom, natopi zavoj i omota. FIX AID je već natopljen.",
      "Zavoj hladi na 7 do 10 °C i ne ide u minus, pa ne stvara ozebline kao led.",
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
      "Proizvođač navodi regeneraciju mišića prije i nakon natjecanja kao jednu od primjena za sportaše i fizioterapeute.",
      "Zavoj se nosi 2 sata i duže i ne ograničava kretanje. Sportaš se može vratiti u autobus, na sastanak ili kući.",
      "Jedna boca od 250 ml dovoljna je za oko 40 primjena, što je važno za klubove s puno igrača.",
    ],
    recommended: "professional-set",
    seoTitle: "Hladni oblozi za sportaše nakon napora",
    seoDescription:
      "Hladni oblog za sportaše i klubove, u svlačionici ili kod kuće. Nosi se 2 sata i duže i ne ograničava kretanje. Boca od 250 ml dovoljna je za oko 40 primjena.",
    bodyTitle: "Za sportaše i klubove",
  },
];

export const BENEFITS = [
  {
    title: "Ne stvara ozebline",
    text: "Hladi na 7 do 10 °C i ne ide u minus. Led pada prema 0 °C i zato se mora skidati.",
    source: false,
  },
  {
    title: "Nosi se 2 sata i duže",
    text: "Hlađenje je ujednačeno dok se zavoj ne osuši. Pokreti nisu ograničeni.",
    source: false,
  },
  {
    title: "Brži oporavak",
    text: "Prema studiji proizvođača, nakon operacije bila je potrebna manja potrošnja lijekova protiv bolova.",
    source: true,
  },
  {
    title: "Bolja regeneracija tkiva",
    text: "Prema studiji proizvođača, mišićni presjek nakon operacije nije se značajno smanjio, a nakon 90 dana statistički je značajno porastao.",
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
  { img: "/img/koraci/korak-5.png", img3d: "/img/koraci-3d/korak-5.jpg", text: "Omotajte u jednom sloju, prema srcu." },
  { img: "/img/koraci/korak-6.png", img3d: "/img/koraci-3d/korak-6.jpg", text: "Prekrijte fiksirnim zavojem." },
];

export const PARTNER_SEGMENTS = [
  {
    title: "Fizioterapeuti i ordinacije",
    text: "Hlađenje u tretmanu i nakon njega, koje pacijent nastavlja kod kuće.",
  },
  {
    title: "Sportski klubovi",
    text: "Spremno u torbi bez leda i hladnjaka. Jedna boca za oko 40 primjena.",
  },
  {
    title: "Ljekarne i veledrogerije",
    text: "Medicinski proizvod iz Švicarske, nov na hrvatskom tržištu.",
  },
  {
    title: "Teretane i poslovni korisnici",
    text: "Prva pomoć i regeneracija za članove i zaposlene.",
  },
];

export const PARTNER_MODELS = [
  {
    title: "Koristite ga u tretmanu",
    text: "Cool Down postaje dio vaše terapije. Pacijent osjeti razliku već u ordinaciji.",
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
    "Njemačka hokejaška reprezentacija",
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
    "otvorene rane",
    "ekcem",
    "trudnoća i dojenje",
    "dojenčad i djeca ispod 10 kg",
  ],
  sideEffects: "Rijetko se mogu pojaviti lokalna iritacija kože ili kontaktna alergija.",
  composition: "Sadrži mentol i kamfor. Pamučni zavoj je 100 % pamuk, bez lateksa.",
  flammable:
    "ICE FLUID je lako zapaljiv. Čuvajte ga na sobnoj temperaturi, dalje od topline i otvorenog plamena.",
};

// id: stabilni identifikator pitanja (npr. za izbor pitanja na početnoj), neovisan o redoslijedu.
export const FAQ = [
  {
    id: "led",
    q: "Je li ovo isto kao led?",
    a: "Nije. Led hladi naglo i pada prema 0 °C, pa se mora skidati. Cool Down hladi na 7 do 10 °C, ne ide u minus i ne stvara ozebline. Zato se može nositi 2 sata i duže.",
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
    q: "Koji set da odaberem?",
    a: "PROFESSIONAL SET je za ordinacije, klubove i oporavak nakon operacije, kad se hladi često. FIRST AID SET je za kuću i sportsku torbu. FIX AID je gotov zavoj za brzu primjenu. Ako niste sigurni, pošaljite upit i pomoći ćemo vam odabrati.",
  },
  {
    id: "kontraindikacije",
    q: "Kada se ne smije koristiti?",
    a: "Na otvorenim ranama i ekcemu, u trudnoći i dojenju te kod dojenčadi i djece ispod 10 kg.",
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
    a: "Nije. ICE FLUID je tekući koncentrat. Pomiješa se s vodom u omjeru 1 : 5, njime se natopi pamučni zavoj, a preko njega ide fiksirni zavoj.",
  },
  {
    id: "kupnja",
    q: "Gdje mogu kupiti Cool Down?",
    a: "Pošaljite narudžbu ili upit preko ove stranice. Javit ćemo vam se s cijenom i uvjetima dostave.",
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
    alt: "Njemačka hokejaška reprezentacija slavi s trofejem",
    team: "Njemačka hokejaška reprezentacija",
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
