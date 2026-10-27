export interface SubCategory {
  id: number;
  title: string;
  slug: string;
}

export interface Category {
  id: number;
  title: string;
  Catslug: string;
  img: string;
  subcategories: SubCategory[];
}

export const categories: Category[] = [
  {
    id: 1,
    title: "Guitars",
    Catslug: "guitars",
    img: "/acoustic-guitar.jpg",
    subcategories: [
      { id: 101, title: "Acoustic Guitars", slug: "acoustic-guitars" },
      { id: 102, title: "Electric Guitars", slug: "electric-guitars" },
      { id: 103, title: "Bass Guitars", slug: "bass-guitars" },
      { id: 104, title: "Classical Guitars", slug: "classical-guitars" },
      { id: 105, title: "Electro-Acoustic", slug: "electro-acoustic" },
    ],
  },
  {
    id: 2,
    title: "Violins",
    Catslug: "violins",
    img: "/violin.png",
    subcategories: [
      { id: 201, title: "Acoustic Violins", slug: "acoustic-violins" },
      { id: 202, title: "Electric Violins", slug: "electric-violins" },
      { id: 203, title: "Violas & Cellos", slug: "violas-cellos" },
      { id: 204, title: "Student Outfits", slug: "student-outfits" },
    ],
  },
  {
    id: 3,
    title: "Keyboards",
    Catslug: "keyboards",
    img: "/piano.webp",
    subcategories: [
      { id: 301, title: "Digital Pianos", slug: "digital-pianos" },
      { id: 302, title: "Synthesizers", slug: "synthesizers" },
      { id: 303, title: "MIDI Controllers", slug: "midi-controllers" },
      { id: 304, title: "Portable Keyboards", slug: "portable-keyboards" },
    ],
  },
  {
    id: 4,
    title: "Drums",
    Catslug: "drums",
    img: "/drums.png",
    subcategories: [
      { id: 401, title: "Acoustic Drum Kits", slug: "acoustic-drum-kits" },
      { id: 402, title: "Electronic Drums", slug: "electronic-drums" },
      { id: 403, title: "Cymbals", slug: "cymbals" },
      { id: 404, title: "Percussion & Hardware", slug: "percussion-hardware" },
    ],
  },
  {
    id: 5,
    title: "Darbuka",
    Catslug: "darbuka",
    img: "/darbuka.jpg",
    subcategories: [
      { id: 501, title: "Egyptian Darbukas", slug: "egyptian-darbukas" },
      { id: 502, title: "Turkish Darbukas", slug: "turkish-darbukas" },
      { id: 503, title: "Replacement Heads", slug: "replacement-heads" },
      { id: 504, title: "Cases & Bags", slug: "cases-bags" },
    ],
  },
{
    id: 6,
    title: "Accessories",
    Catslug: "accessories",
    img: "/acc-trans.png",
    subcategories: [
      { id: 601, title: "Guitar Accessories", slug: "guitar-accessories" },
      { id: 602, title: "Drum Accessories", slug: "drum-accessories" },
      { id: 603, title: "Violin Accessories", slug: "violin-accessories" },
      { id: 604, title: "Keyboard Accessories", slug: "keyboard-accessories" },
      { id: 605, title: "Cables, Stands & Cases", slug: "cables-stands-cases" },
      { id: 606, title: "Care & Maintenance", slug: "care-maintenance" },
    ],
  },
  {
    id: 7,
    title: "Tabla",
    Catslug: "tabla",
    img: "/tabla.png",
    subcategories: [
      { id: 701, title: "Professional Tabla Sets", slug: "professional-tabla-sets" },
      { id: 702, title: "Student / Practice Tabla Sets", slug: "student-practice-tabla-sets" },
      { id: 703, title: "Brass & Copper Tabla Drums", slug: "brass-copper-tabla-drums" },
      { id: 704, title: "Tabla Rings & Covers", slug: "tabla-rings-covers" },
      { id: 705, title: "Tabla Hammers & Tuning Tools", slug: "tabla-hammers-tuning-tools" },
      { id: 706, title: "Puri / Tabla Heads", slug: "puri-tabla-heads" },
    ],
  },
  {
    id: 8,
    title: "Dholak",
    Catslug: "dholak",
    img: "/dholak.png",
    subcategories: [
      { id: 801, title: "Folk / Traditional Dholak", slug: "folk-traditional-dholak" },
      { id: 802, title: "Bolt-Tuned Dholak", slug: "bolt-tuned-dholak" },
      { id: 803, title: "Padded / Stage Dholak", slug: "padded-stage-dholak" },
      { id: 804, title: "Dholak Bags & Cases", slug: "dholak-bags-cases" },
      { id: 805, title: "Dholak Tuning Spanners", slug: "dholak-tuning-spanners" },
    ],
  },
];