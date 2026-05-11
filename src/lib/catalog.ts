export type ProductCategory = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  image: string;
  sports: string[];
  seo: {
    title: string;
    description: string;
  };
};

export type Product = {
  slug: string;
  categorySlug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  priceLabel: string;
  minimumOrderQuantity: number;
  leadTime: string;
  sport: string;
  fabric: string;
  fit: "Regular" | "Athletic" | "Relaxed";
  tags: string[];
  features: string[];
};

export const categories: ProductCategory[] = [
  {
    slug: "cricket-jerseys",
    name: "Cricket Jerseys",
    eyebrow: "Sublimated cricket kits",
    description:
      "Custom cricket jerseys for clubs, academies, tournaments, and corporate leagues with names, numbers, sponsors, and team crests.",
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1400&q=85",
    sports: ["Cricket"],
    seo: {
      title: "Custom Cricket Jerseys | The Duel",
      description:
        "Design custom sublimated cricket jerseys for teams, academies, tournaments, and corporate leagues."
    }
  },
  {
    slug: "football-jerseys",
    name: "Football Jerseys",
    eyebrow: "Match-ready football kits",
    description:
      "Lightweight football jerseys with club branding, player rosters, sponsor panels, and repeat-order friendly team records.",
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1400&q=85",
    sports: ["Football", "Futsal"],
    seo: {
      title: "Custom Football Jerseys | The Duel",
      description:
        "Create custom football jerseys and team kits with logos, names, numbers, and sponsor placements."
    }
  },
  {
    slug: "polo-t-shirts",
    name: "Polo T-Shirts",
    eyebrow: "Premium team polos",
    description:
      "Custom polo t-shirts for travel days, corporate teams, staff uniforms, events, academies, and dealer programs.",
    image:
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1400&q=85",
    sports: ["Corporate", "Academy"],
    seo: {
      title: "Custom Polo T-Shirts | The Duel",
      description:
        "Order premium custom polo t-shirts for teams, companies, academies, events, and uniforms."
    }
  },
  {
    slug: "tracksuits",
    name: "Tracksuits",
    eyebrow: "Coordinated warm-up sets",
    description:
      "Team tracksuits for academies, clubs, schools, institutions, and corporate sports programs.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
    sports: ["Multi-sport", "Training"],
    seo: {
      title: "Custom Tracksuits | The Duel",
      description:
        "Manufacture custom tracksuits for teams, academies, schools, companies, and sports clubs."
    }
  },
  {
    slug: "hoodies",
    name: "Hoodies",
    eyebrow: "Team and brand drops",
    description:
      "Custom hoodies for teams, esports squads, college groups, events, fanwear, and branded merchandise drops.",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1400&q=85",
    sports: ["Lifestyle", "Esports"],
    seo: {
      title: "Custom Hoodies | The Duel",
      description:
        "Create custom hoodies for teams, esports, events, institutions, clubs, and branded merchandise."
    }
  },
  {
    slug: "corporate-uniforms",
    name: "Corporate Uniforms",
    eyebrow: "Uniform programs",
    description:
      "Scalable corporate uniform systems with department-wise ordering, repeat SKUs, sizing control, and branding consistency.",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=85",
    sports: ["Corporate"],
    seo: {
      title: "Corporate Uniforms | The Duel",
      description:
        "Build scalable corporate uniform programs with custom polos, t-shirts, jackets, and staff apparel."
    }
  },
  {
    slug: "cycling-jerseys",
    name: "Cycling Jerseys",
    eyebrow: "Performance cycling apparel",
    description:
      "Custom cycling jerseys for clubs, races, endurance communities, corporate rides, and event merchandise.",
    image:
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1400&q=85",
    sports: ["Cycling"],
    seo: {
      title: "Custom Cycling Jerseys | The Duel",
      description:
        "Order custom cycling jerseys for clubs, races, events, communities, and corporate cycling teams."
    }
  },
  {
    slug: "esports-jerseys",
    name: "Esports Jerseys",
    eyebrow: "Competitive gaming kits",
    description:
      "Esports jerseys and hoodies for gaming teams, streamers, tournaments, college clubs, and merchandise stores.",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=85",
    sports: ["Esports"],
    seo: {
      title: "Custom Esports Jerseys | The Duel",
      description:
        "Design custom esports jerseys and team apparel for gaming teams, streamers, tournaments, and clubs."
    }
  }
];

export const products: Product[] = [
  {
    slug: "pro-elite-cricket-jersey",
    categorySlug: "cricket-jerseys",
    name: "Pro Elite Cricket Jersey",
    shortDescription: "Lightweight sublimated cricket jersey for full team orders.",
    description:
      "A premium cricket match jersey with sublimated graphics, breathable mesh zones, sponsor placements, player names, and roster numbers.",
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=85"
    ],
    priceLabel: "Quote based",
    minimumOrderQuantity: 15,
    leadTime: "10-18 days",
    sport: "Cricket",
    fabric: "Performance Polyester",
    fit: "Athletic",
    tags: ["Sublimated", "Team roster", "Sponsors"],
    features: ["Full sublimation print", "Player name and number", "Moisture-wicking fabric", "Artwork approval"]
  },
  {
    slug: "club-football-match-jersey",
    categorySlug: "football-jerseys",
    name: "Club Football Match Jersey",
    shortDescription: "Breathable football kit for clubs, schools, and tournaments.",
    description:
      "A fast-drying football jersey engineered for team identity, sponsor visibility, and repeatable tournament production.",
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=85"
    ],
    priceLabel: "Quote based",
    minimumOrderQuantity: 15,
    leadTime: "9-16 days",
    sport: "Football",
    fabric: "Micro Mesh",
    fit: "Athletic",
    tags: ["Sublimated", "Lightweight", "Club kits"],
    features: ["Front and back sponsor zones", "Roster numbering", "Ribbed collar option", "Bulk team packing"]
  },
  {
    slug: "executive-team-polo",
    categorySlug: "polo-t-shirts",
    name: "Executive Team Polo",
    shortDescription: "Premium branded polo for staff, travel, and event teams.",
    description:
      "A clean polo t-shirt system for companies and academies with embroidery, print branding, and repeat-order size records.",
    image:
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85"
    ],
    priceLabel: "Quote based",
    minimumOrderQuantity: 25,
    leadTime: "7-14 days",
    sport: "Corporate",
    fabric: "Pique Knit",
    fit: "Regular",
    tags: ["Embroidery", "Corporate", "Staff"],
    features: ["Embroidered logo option", "Department-wise size matrix", "Multiple collar options", "Repeat-order ready"]
  },
  {
    slug: "academy-tracksuit-set",
    categorySlug: "tracksuits",
    name: "Academy Tracksuit Set",
    shortDescription: "Coordinated jacket and track pant set for squads.",
    description:
      "A full team tracksuit set for travel, warm-ups, academy programs, and institution-wide sportswear needs.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85"
    ],
    priceLabel: "Quote based",
    minimumOrderQuantity: 20,
    leadTime: "14-24 days",
    sport: "Training",
    fabric: "Interlock Polyester",
    fit: "Regular",
    tags: ["Set", "Academy", "Travel"],
    features: ["Jacket and pant set", "Zipper and pocket options", "Team crest placement", "Size-wise packing"]
  },
  {
    slug: "team-drop-hoodie",
    categorySlug: "hoodies",
    name: "Team Drop Hoodie",
    shortDescription: "Heavyweight custom hoodie for teams, events, and drops.",
    description:
      "A premium hoodie for team merchandise, college groups, esports squads, events, and branded apparel drops.",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=1200&q=85"
    ],
    priceLabel: "Quote based",
    minimumOrderQuantity: 30,
    leadTime: "12-22 days",
    sport: "Lifestyle",
    fabric: "Fleece",
    fit: "Relaxed",
    tags: ["Merch", "Heavyweight", "Drops"],
    features: ["Print or embroidery", "Kangaroo pocket", "Ribbed cuffs", "Drop-ready size packs"]
  },
  {
    slug: "enterprise-uniform-program",
    categorySlug: "corporate-uniforms",
    name: "Enterprise Uniform Program",
    shortDescription: "Managed uniform system for companies and institutions.",
    description:
      "A structured uniform program for companies needing consistent branding, reliable reorders, and department-wise fulfilment.",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=85"
    ],
    priceLabel: "Quote based",
    minimumOrderQuantity: 50,
    leadTime: "14-30 days",
    sport: "Corporate",
    fabric: "Program Specific",
    fit: "Regular",
    tags: ["Corporate", "Uniforms", "Managed"],
    features: ["SKU-based uniform system", "Department-wise ordering", "Brand guidelines", "Reorder tracking"]
  },
  {
    slug: "aero-cycling-jersey",
    categorySlug: "cycling-jerseys",
    name: "Aero Cycling Jersey",
    shortDescription: "Custom cycling jersey for clubs, races, and endurance teams.",
    description:
      "A close-fit cycling jersey with full sublimation, pocket options, race branding, and community merchandise support.",
    image:
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=85"
    ],
    priceLabel: "Quote based",
    minimumOrderQuantity: 20,
    leadTime: "12-20 days",
    sport: "Cycling",
    fabric: "Aero Stretch",
    fit: "Athletic",
    tags: ["Race fit", "Sublimated", "Clubs"],
    features: ["Full sublimation", "Rear pocket option", "Zip options", "Race sponsor layout"]
  },
  {
    slug: "pro-esports-jersey",
    categorySlug: "esports-jerseys",
    name: "Pro Esports Jersey",
    shortDescription: "Bold esports jersey for competitive teams and creators.",
    description:
      "A lightweight esports jersey built for gaming teams, creators, tournaments, and fan merchandise programs.",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=85"
    ],
    priceLabel: "Quote based",
    minimumOrderQuantity: 15,
    leadTime: "9-18 days",
    sport: "Esports",
    fabric: "Performance Polyester",
    fit: "Regular",
    tags: ["Gaming", "Creators", "Sublimated"],
    features: ["Streamer name option", "Sponsor panels", "Full-color graphics", "Merch drop support"]
  }
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((product) => product.categorySlug === categorySlug);
}

export function getProduct(categorySlug: string, productSlug: string) {
  return products.find(
    (product) => product.categorySlug === categorySlug && product.slug === productSlug
  );
}

export function getFilterOptions(categoryProducts: Product[]) {
  return {
    sports: Array.from(new Set(categoryProducts.map((product) => product.sport))).sort(),
    fabrics: Array.from(new Set(categoryProducts.map((product) => product.fabric))).sort(),
    fits: Array.from(new Set(categoryProducts.map((product) => product.fit))).sort()
  };
}
