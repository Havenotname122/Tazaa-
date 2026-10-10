export interface TazaaBrandProduct {
  id: string;
  name: string;
  category: 'bio_cups' | 'fiber_tableware' | 'raw_eco_plastics' | 'botanical_goods' | 'circular_packaging';
  categoryLabel: string;
  tagline: string;
  description: string;
  priceUsd: number;
  packUnit: string;
  circularEcoBadge: string;
  dimensions: string;
  materialComposition: string;
  lifecycleGuide: {
    origin: string;
    inUseDurability: string;
    endOfLifeInstructions: string;
    compostTimeline: string;
  };
  certifications: string[];
  imageUrl: string;
  inStock: boolean;
  minOrderQuantity: number;
  highlighted?: boolean;
}

export const TAZAA_BRAND_CATALOG: TazaaBrandProduct[] = [
  {
    id: 'tazaa-bio-cup-50',
    name: 'Tazaa Bio-Cup',
    category: 'bio_cups',
    categoryLabel: 'Bio-Cups & Drinkware',
    tagline: 'Molded sugarcane & bamboo hot/cold beverage cups with plant carnauba seal',
    description:
      'Engineered from upcycled sugarcane bagasse and bamboo fiber, coated with a heat-resistant natural plant carnauba wax lining. 100% petroleum-free, BPA-free, and certified for hot beverages up to 95°C without softening.',
    priceUsd: 12.99,
    packUnit: 'Pack of 50',
    circularEcoBadge: '100% Home Compostable & Recyclable',
    dimensions: '350 ml (12 oz) • Top Ø 88mm x Base Ø 53mm x Height 110mm',
    materialComposition: '85% Sugarcane Bagasse, 15% Bamboo Fiber, Carnauba Wax Barrier',
    lifecycleGuide: {
      origin: 'Renewable annual agricultural harvest residues with zero deforestation.',
      inUseDurability: 'Leak-resistant for 12+ hours with hot espresso, coffee, or iced beverages.',
      endOfLifeInstructions: 'Place directly in backyard garden soil or food scrap bin; safe for municipal unbleached paper recycling.',
      compostTimeline: 'Decomposes naturally within 45 to 60 days into organic nutrient humus.',
    },
    certifications: ['EN 13432 Home Compost', 'ASTM D6400', 'FDA Food Contact Safe', 'BPI Certified'],
    imageUrl: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    minOrderQuantity: 1,
    highlighted: true,
  },
  {
    id: 'tazaa-fiber-plates-25',
    name: 'Tazaa Molded Fiber Dinner Plates',
    category: 'fiber_tableware',
    categoryLabel: 'Molded Fiber Tableware',
    tagline: 'Hydraulically steam-pressed fallen foliage tableware with beeswax moisture seal',
    description:
      'Manufactured without cutting down trees. Handcrafted strictly from gathered fallen deciduous autumn leaves, bound with food-grade organic potato starch, and waterproofed with purified organic beeswax. Perfect for dining and hospitality.',
    priceUsd: 14.5,
    packUnit: 'Pack of 25',
    circularEcoBadge: '100% Tree-Free Backyard Compostable',
    dimensions: 'Diameter 260mm (10.2 in) • Depth 22mm • Weight 28g per plate',
    materialComposition: '100% Autumn Fallen Foliage + Organic Beeswax Sealing',
    lifecycleGuide: {
      origin: 'Naturally fallen urban and orchard foliage gathered each autumn season.',
      inUseDurability: 'Heavy-duty rigidity; leak-proof against hot soups, gravies, and boiling foods.',
      endOfLifeInstructions: 'Break into pieces and bury in garden soil or compost pile.',
      compostTimeline: 'Breaks down completely within 45 days, returning clean minerals to soil.',
    },
    certifications: ['ASTM D6400 Backyard Compost', 'Zero Deforestation Verified', 'FDA Food Grade'],
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    minOrderQuantity: 1,
    highlighted: true,
  },
  {
    id: 'tazaa-raw-pha-25kg',
    name: 'Tazaa Sustainable Raw Eco-Plastics (PHA Resins)',
    category: 'raw_eco_plastics',
    categoryLabel: 'Sustainable Raw Eco-Plastics',
    tagline: 'Marine & soil biodegradable polyhydroxyalkanoate compound pellets',
    description:
      'Proprietary bacterial fermentation biopolymer pellets engineered for industrial injection molding, thermoforming, and 3D printing. Delivers pristine structural modulus without microplastic persistence.',
    priceUsd: 85.0,
    packUnit: '25 kg Bag',
    circularEcoBadge: 'TÜV Austria OK Biodegradable Marine & Soil',
    dimensions: 'Pellet size 3mm spherical • Bulk density 0.78 g/cm³',
    materialComposition: '100% Bio-Based Polyhydroxyalkanoate (PHA) Compound',
    lifecycleGuide: {
      origin: 'Formed via microbial non-GMO fermentation of organic agricultural sugars.',
      inUseDurability: 'Tensile modulus 3.2 GPa, melting temperature 170°C, high rigidity.',
      endOfLifeInstructions: 'Industrial or backyard compostable; degrades safely in saltwater marine environments.',
      compostTimeline: 'Degrades in ocean water within 180 days and soil in 120 days.',
    },
    certifications: ['TÜV Austria OK Marine', 'ISO 14001:2015', 'EN 13432 Compostable'],
    imageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    minOrderQuantity: 1,
    highlighted: true,
  },
  {
    id: 'tazaa-espresso-tumbler',
    name: 'Tazaa Espresso Upcycled Travel Tumbler',
    category: 'bio_cups',
    categoryLabel: 'Bio-Cups & Drinkware',
    tagline: 'Insulated reusable coffee tumbler crafted from spent espresso grounds',
    description:
      'Crafted from repurposed spent espresso coffee grounds bound with high-performance bio-resins. Features double-wall thermal insulation, a leak-proof twist lid, and a rich, subtle roasted coffee aroma.',
    priceUsd: 16.5,
    packUnit: 'Single Tumbler (360ml)',
    circularEcoBadge: 'Carbon-Negative Grade A (-1.42 kg CO₂/unit)',
    dimensions: '360 ml (12.2 oz) • Height 145mm • Base Ø 68mm',
    materialComposition: '45% Spent Coffee Grounds, 55% Bio-Composite Resin Matrix',
    lifecycleGuide: {
      origin: 'Rescued from local specialty cafes to avert methane landfill emissions.',
      inUseDurability: 'Engineered for 3+ years of daily dishwasher cycles without degradation.',
      endOfLifeInstructions: 'Return via the Tazaa Take-Back Program for pelletizing into new durable goods.',
      compostTimeline: 'Closed-loop industrial circular recycling.',
    },
    certifications: ['Carbon-Negative Certified', 'BPA & Phthalate Free', 'Dishwasher Safe (65°C)'],
    imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    minOrderQuantity: 1,
  },
  {
    id: 'tazaa-seed-cards-100',
    name: 'Tazaa Botanical Seed Stationery Cards',
    category: 'botanical_goods',
    categoryLabel: 'Botanical Living Goods',
    tagline: 'Living plantable greeting & business cards embedded with non-GMO wildflower seeds',
    description:
      'Artisanal handmade deckle-edge cards crafted from recycled cotton fibers and unbleached paper pulp, inoculated with live wildflower seeds. Air-cured strictly below 35°C to preserve 92%+ seed embryo germination viability.',
    priceUsd: 28.0,
    packUnit: 'Box of 100 Cards',
    circularEcoBadge: 'Zero-Waste Living Seed Inoculant',
    dimensions: 'Standard A6 (105 x 148 mm) • 250 gsm heavy texture',
    materialComposition: '95% Recycled Cotton Pulp, 5% Non-GMO Wildflower Seeds (Sweet Alyssum & Clover)',
    lifecycleGuide: {
      origin: 'Textile tailoring cuttings and recycled post-consumer scrap fibers.',
      inUseDurability: 'Crisp writing and printing surface compatible with letterpress, stamp, and ink.',
      endOfLifeInstructions: 'Plant card flat under 1cm moist soil, place in sunlight, and water daily.',
      compostTimeline: 'Card pulps decompose in 7 days as flowers bloom in 10 to 14 days.',
    },
    certifications: ['Non-GMO Verified Seeds', '100% Recycled Cotton Pulp', 'Zero Chemical Bleach'],
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    minOrderQuantity: 1,
  },
  {
    id: 'tazaa-cassava-bags-100',
    name: 'Tazaa Cassava Organic Bio-Bags',
    category: 'circular_packaging',
    categoryLabel: 'Circular Packaging',
    tagline: '100% water-soluble, marine-safe shopping and disposal bags',
    description:
      'Engineered from non-toxic cassava root starch and vegetable oils. Dissolves cleanly in boiling water (80°C) within minutes, posing zero risk to marine or terrestrial wildlife if accidentally dispersed.',
    priceUsd: 11.0,
    packUnit: 'Roll of 100 Bags',
    circularEcoBadge: '100% Water-Soluble Marine Safe',
    dimensions: '300 x 450 mm • Thickness 25 microns • 4 kg load capacity',
    materialComposition: 'Cassava Root Starch Matrix + Organic Vegetable Oils',
    lifecycleGuide: {
      origin: 'Cultivated organic cassava root non-food-grade industrial starch.',
      inUseDurability: 'Tear-resistant carrying up to 4 kg of dry groceries and household items.',
      endOfLifeInstructions: 'Dissolve in a bowl of hot water or compost in household food scraps.',
      compostTimeline: 'Dissolves in hot water in 3 minutes; soil compostable within 90 days.',
    },
    certifications: ['TÜV OK Compost Home', 'Marine Biodegradable ASTM D6691', 'Non-Toxic Food Safe'],
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    minOrderQuantity: 1,
  },
  {
    id: 'tazaa-mycelium-cushion-10',
    name: 'Tazaa Mycelium Protective Packaging Shells',
    category: 'circular_packaging',
    categoryLabel: 'Circular Packaging',
    tagline: 'Mushroom mycelium cushioning blocks replacing petrochemical Styrofoam',
    description:
      'Grown naturally in 6 days using organic agricultural hemp chaff and live fungal mycelium. Delivers drop-test cushioning that matches expanded polystyrene (EPS) while being 100% home compostable.',
    priceUsd: 24.0,
    packUnit: 'Set of 10 Custom Blocks',
    circularEcoBadge: 'Cradle to Cradle Gold Certified',
    dimensions: '150 x 150 x 80 mm custom fit corner and edge blocks',
    materialComposition: 'Upcycled Agricultural Hemp Shives + Living Fungal Mycelium',
    lifecycleGuide: {
      origin: 'Hemp agricultural byproducts bonded via natural fungal organism growth.',
      inUseDurability: 'High impact shock absorption, natural flame-retardant, moisture-resistant.',
      endOfLifeInstructions: 'Break into small chunks and scatter over home garden or compost.',
      compostTimeline: 'Complete home composting in 30 days, enriching soil with mycorrhizae.',
    },
    certifications: ['Cradle to Cradle Gold', '100% Home Compostable', 'Zero Petrochemicals'],
    imageUrl: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    minOrderQuantity: 1,
  },
  {
    id: 'tazaa-rpet-resin-25kg',
    name: 'Tazaa Food-Grade rPET Polymer Pellets',
    category: 'raw_eco_plastics',
    categoryLabel: 'Sustainable Raw Eco-Plastics',
    tagline: 'Decontaminated post-consumer recycled polyester pellets (IV 0.82 dl/g)',
    description:
      'High-clarity, super-cleaned recycled PET resin pellets for bottle-to-bottle preforms and thermoformed circular clamshells. Certified for direct food-contact with acetaldehyde levels below 1.0 ppm.',
    priceUsd: 55.0,
    packUnit: '25 kg Bag',
    circularEcoBadge: 'Global Recycled Standard (GRS) v4.0 Certified',
    dimensions: 'Pellet size 2.5 x 2.5 mm • Intrinsic Viscosity 0.82 dl/g',
    materialComposition: '100% Decontaminated Food-Grade Post-Consumer Recycled PET',
    lifecycleGuide: {
      origin: 'Collected post-consumer beverage bottles decontaminated through SSP technology.',
      inUseDurability: 'High optical clarity (L* > 88), excellent gas barrier properties.',
      endOfLifeInstructions: '100% mechanically recyclable across global curbside recycling streams.',
      compostTimeline: 'Infinitely recyclable in closed-loop polymer recycling systems.',
    },
    certifications: ['GRS v4.0 Certified', 'EFSA Food Contact Approval', 'FDA Food Contact'],
    imageUrl: 'https://images.unsplash.com/photo-1526951521990-620dc14c214b?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    minOrderQuantity: 1,
  },
];
