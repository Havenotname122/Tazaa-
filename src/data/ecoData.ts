import {
  LocalSupplierStation,
  VerifiedSupplier,
  WasteStreamMatrixEntry,
  GreenSectorJobRequisition,
  CareerOpportunity,
  SampleWastePhoto,
  ReadyEcoProduct,
  PantrySupply,
  QualityTestGuideline,
} from '../types';

const cottonTshirtImg = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80';
const pencilPaperImg = 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80';
const fallenLeavesImg = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80';
const petBottlesImg = 'https://images.unsplash.com/photo-1526951521990-620dc14c214b?auto=format&fit=crop&w=600&q=80';

export const VERIFIED_SUPPLIERS: VerifiedSupplier[] = [
  {
    id: 'sup-biotech-polymers',
    companyName: 'BioTech Polymers Central Asia Ltd.',
    registrationNumber: 'KG-B2B-88392-2024',
    category: 'eco_plastic',
    categoryLabel: 'Eco-Plastics & Bio-Resins',
    primaryCommodity: 'Certified PHA & PLA Bio-Resin Pellets (Compound Grade)',
    specifications: 'MFI: 8-12 g/10min (190°C/2.16kg), Tensile Modulus: 3.2 GPa, 100% Bio-based carbon content',
    moq: '2 Metric Tons (MT)',
    capacityPerMonth: '350 Metric Tons / Month',
    spotPriceUsd: 2450,
    unitLabel: 'per Metric Ton',
    certifications: ['TÜV Austria OK Biobased (4-Star)', 'ISO 14001:2015', 'EN 13432 Compostable', 'FDA Food Contact'],
    country: 'Kyrgyzstan',
    city: 'Bishkek',
    facilityAddress: '78 Industrial Park Ave, Alamedin SEZ, Bishkek',
    contactPerson: 'Dr. Erkin Toktobaev, Head of Technical Sales',
    contactEmail: 'e.toktobaev@biotech-polymers.kg',
    contactPhone: '+996 312 901 882',
    esgRating: 'AAA',
    deliveryTerms: 'FOB Bishkek / CIF Worldwide / DDP Central Asia',
    isCoreEcoPlastic: true,
    technicalDataSheetSummary: 'Ideal for thermoforming, injection molding thin-wall food packaging, agricultural films, and biopolymer cosmetic containers. Full biodegradation in soil within 180 days.',
  },
  {
    id: 'sup-circular-pet',
    companyName: 'Circular Polymers Eurasia Corp.',
    registrationNumber: 'UZ-TR-50291-2023',
    category: 'eco_plastic',
    categoryLabel: 'Eco-Plastics & Bio-Resins',
    primaryCommodity: 'Food-Grade Decontaminated rPET Pellets (IV 0.82 dl/g)',
    specifications: 'Intrinsic Viscosity: 0.82 ± 0.02 dl/g, Color L* > 88, a* -0.5 to 1.5, Acetaldehyde < 1.0 ppm',
    moq: '5 Metric Tons (MT)',
    capacityPerMonth: '1,200 Metric Tons / Month',
    spotPriceUsd: 1180,
    unitLabel: 'per Metric Ton',
    certifications: ['GRS v4.0 (Global Recycled Standard)', 'EFSA Food Contact Approval', 'ISO 9001:2015', 'ISCC PLUS'],
    country: 'Uzbekistan / Central Asia Hub',
    city: 'Tashkent',
    facilityAddress: 'Plot 14, Sergeli Industrial Zone, Tashkent',
    contactPerson: 'Sardor Mirzayev, Commercial Procurement Director',
    contactEmail: 'procurement@circularpolymers.uz',
    contactPhone: '+998 71 200 4490',
    esgRating: 'AAA',
    deliveryTerms: 'FOB / CIF / DAP Cross-Border Rail',
    isCoreEcoPlastic: true,
    technicalDataSheetSummary: 'Solid-State Polymerization (SSP) decontaminated pellets suitable for direct 100% bottle-to-bottle preform blowing, thermoform sheet extrusion, and technical strapping.',
  },
  {
    id: 'sup-tienshan-bioresins',
    companyName: 'Tien Shan Bio-Resins & Starch Composites',
    registrationNumber: 'KG-B2B-19402-2025',
    category: 'eco_plastic',
    categoryLabel: 'Eco-Plastics & Bio-Resins',
    primaryCommodity: 'Thermoplastic Starch (TPS) / Glycerol Masterbatch Resins',
    specifications: 'Gelatinized non-GMO corn/potato amylose matrix + 18% refined vegetable plasticizer, Shore D: 62',
    moq: '1 Metric Ton (MT)',
    capacityPerMonth: '180 Metric Tons / Month',
    spotPriceUsd: 1620,
    unitLabel: 'per Metric Ton',
    certifications: ['TÜV OK Home Compost', 'ISO 14001', 'ASTM D6400'],
    country: 'Kyrgyzstan',
    city: 'Tokmok',
    facilityAddress: '12 Promyshlennaya St, Chuy Industrial Cluster, Tokmok',
    contactPerson: 'Nargiza Asanova, Materials R&D Liaison',
    contactEmail: 'n.asanova@tienshan-bio.kg',
    contactPhone: '+996 555 432 109',
    esgRating: 'AA',
    deliveryTerms: 'EXW Tokmok / FOB Bishkek / CIF Europe & Middle East',
    isCoreEcoPlastic: true,
    technicalDataSheetSummary: 'Engineered for blending with biodegradable polyesters (PBAT/PLA) to reduce virgin petrochemical usage by up to 70% in flexible packaging and agricultural mulch.',
  },
  {
    id: 'sup-nordic-polyolefins',
    companyName: 'Euro-Nordic Recycled Polyolefins NV',
    registrationNumber: 'NL-KVK-90218820',
    category: 'eco_plastic',
    categoryLabel: 'Eco-Plastics & Bio-Resins',
    primaryCommodity: 'High-Density PCR-HDPE Extrusion Pellets (Post-Consumer)',
    specifications: 'MFR: 0.35 g/10min (190°C/5kg), Density: 0.958 g/cm³, Carbon Footprint: 0.42 kg CO₂e/kg',
    moq: '10 Metric Tons (MT)',
    capacityPerMonth: '2,500 Metric Tons / Month',
    spotPriceUsd: 1340,
    unitLabel: 'per Metric Ton',
    certifications: ['EuCertPlast Certified', 'ISCC PLUS Circular', 'ISO 50001 Energy Management'],
    country: 'Netherlands / Global Logistics',
    city: 'Rotterdam',
    facilityAddress: 'Maasvlakte 2 Logistics Terminal, Port of Rotterdam',
    contactPerson: 'Jan van Houten, Global Trade Executive',
    contactEmail: 'trade@nordicpolyolefins.eu',
    contactPhone: '+31 10 790 3200',
    esgRating: 'AAA',
    deliveryTerms: 'FOB Rotterdam / CIF Global Major Ports',
    isCoreEcoPlastic: true,
    technicalDataSheetSummary: 'Triple-degassed and optically sorted post-consumer blow molding grade HDPE. Excellent environmental stress crack resistance (ESCR) for chemical containers and piping.',
  },
];

export const ADVANCED_WASTE_STREAMS: WasteStreamMatrixEntry[] = [
  {
    id: 'stream-ewaste',
    streamName: 'Electronic Waste (E-Waste) & Circuit Substrates',
    streamCategory: 'e_waste',
    categoryLabel: 'Electronic Waste & Circuit Boards',
    description: 'High-density multi-component waste containing precious metals (Au, Ag, Pd), copper traces, solder alloys (Sn/Pb or Sn/Ag), and brominated epoxy glass fiber substrates (FR-4).',
    sampleInputExamples: ['Defunct Printed Circuit Boards (PCBs)', 'Mobile phone logic units', 'Photovoltaic junction boxes', 'Server motherboards', 'Discarded power supplies'],
    primaryContaminants: ['Brominated flame retardants (BFR)', 'Lead-tin solder', 'Electrolytic capacitor paste', 'Ferrous brackets'],
    technicalPathways: [
      {
        pathwayName: 'Hydrometallurgical Precious Metal Selective Leach & Electrowinning',
        methodType: 'Chemical',
        yieldPercentage: '98.4% Gold/Copper Recovery',
        processingSteps: [
          'High-speed pneumatic shredding to <2mm particle size with magnetic ferrous separation',
          'Mild acid leaching (H₂SO₄ + H₂O₂) to remove baseline copper, nickel, and tin',
          'Eco-friendly non-cyanide ammonium thiosulfate leaching of gold and silver complex',
          'Direct cathodic electrowinning recovering 99.9% pure metal bullion'
        ],
        chemicalReagentsOrCompatibilizers: 'Dilute Sulfuric Acid (0.5M), Hydrogen Peroxide (3%), Ammonium Thiosulfate (0.2M), Copper Sulfate catalyst',
        temperatureAndPressure: 'Ambient to 45°C, atmospheric pressure',
        keyMachinery: 'Industrial hammer mill, Eddy current separator, Glass-lined agitated leaching reactors, Electrowinning cell',
        carbonOffsetPerTonKg: 2840,
        commercialEndProduct: '99.9% Refined Gold & Copper Bullion, High-Purity Tin Oxide',
        matchedSupplierCategory: 'Renewable Energy Hardware & Precious Metal Commodities'
      }
    ]
  },
  {
    id: 'stream-organic-biomass',
    streamName: 'Organic Food Waste, Deciduous Foliage & Agricultural Bagasse',
    streamCategory: 'organic_biomass',
    categoryLabel: 'Organic Cellulose & Agricultural Waste',
    description: 'Lignocellulosic and moisture-rich organic waste streams generated from agriculture, municipal green maintenance, and commercial food production.',
    sampleInputExamples: ['Seasonal deciduous fallen leaves', 'Spent coffee grounds', 'Apple & walnut pomace', 'Straw & cotton plant stalks', 'Commercial kitchen waste'],
    primaryContaminants: ['Inorganic grit & soil', 'Residual edible oils', 'High moisture content (60-80%)', 'Plastic film fragments'],
    technicalPathways: [
      {
        pathwayName: 'Thermocompression Molded Tableware with Beeswax Hydrophobic Barrier',
        methodType: 'Mechanical',
        yieldPercentage: '88.0% Finished Molded Product',
        processingSteps: [
          'Air-washing and de-dusting dried fallen foliage / bagasse',
          'Hydration & non-chemical steam softening at 95°C for 20 minutes',
          'Starch/glycerol binder misting and high-pressure hydraulic hot pressing (140°C, 8 MPa)',
          'Automated micro-layer pure beeswax hydrophobic sealing spray'
        ],
        chemicalReagentsOrCompatibilizers: 'Non-GMO Cornstarch Gelatinized Paste (5%), Pharmaceutical Glycerol (2%), Pure Mountain Beeswax',
        temperatureAndPressure: '135°C - 150°C, 6-8 MPa hydraulic clamp pressure',
        keyMachinery: 'Continuous conveyor washer, Hydraulic steam thermo-press, Automated wax vaporization tunnel',
        carbonOffsetPerTonKg: 620,
        commercialEndProduct: 'Heavy-Duty Biodegradable Food Plates, Bowls, and Clamshell Takeaway Boxes',
        matchedSupplierCategory: 'Biodegradable Packaging'
      }
    ]
  }
];

export const WASTE_STREAM_MATRIX = ADVANCED_WASTE_STREAMS;

export const GREEN_SECTOR_JOB_PIPELINES: GreenSectorJobRequisition[] = [
  {
    id: 'job-rd-biopolymers-lead',
    requisitionId: 'REQ-ERD-2026-081',
    roleTitle: 'Senior Bio-Polymer Formulation Chemist & Materials Architect',
    industry: 'environmental_rd',
    industryLabel: 'Environmental R&D',
    hiringEntity: 'BioTech Polymers Eurasia Labs',
    esgSponsor: 'Central Asia Sustainable Materials Accelerator',
    location: 'Bishkek Innovation Park, Kyrgyzstan (Hybrid)',
    country: 'Kyrgyzstan',
    region: 'Central Asia',
    workModel: 'Hybrid',
    experienceLevel: 'Principal / Director',
    annualCompensationUsd: '$88,000 - $118,000 / year',
    monthlyCompensationKgs: '640,000 - 860,000 KGS',
    requiredQualifications: [
      'Ph.D. or M.Sc. in Polymer Chemistry, Chemical Engineering, or Macromolecular Science',
      '5+ years leading formulation of thermoplastic starch (TPS), PHA, and PLA bio-composites',
      'Hands-on expertise with twin-screw compounding, rheology, tensile DMA testing, and EN 13432 certification',
      'Fluency in technical English and professional Russian or Kyrgyz'
    ],
    coreResponsibilities: [
      'Design proprietary bio-plastic resin formulations utilizing local agricultural starches and agricultural byproducts',
      'Optimize degradation kinetics and melt-flow index (MFI) for industrial injection molding clients',
      'Lead laboratory testing protocols for tensile strength, elongation at break, and hydrophobic sealing matrices',
      'Interface with corporate Procurement Partners across Europe and Asia on custom material specification sheets'
    ],
    keyTechnicalDomains: ['PHA Synthesis', 'Reactive Compounding', 'Rheology', 'Circular Economy Chemistry'],
    applicationDeadline: 'Rolling Admissions • Q2 2026 Pipeline',
    isUrgentHiring: true,
  }
];

export const LOCAL_SUPPLIER_STATIONS: LocalSupplierStation[] = [
  {
    id: 'tazalyk-hub-1',
    name: 'Tazalyk Circular Materials Processing Station #4',
    city: 'Bishkek',
    country: 'Kyrgyzstan',
    region: 'Central Asia',
    district: 'Pervomaysky District',
    distanceKm: 1.8,
    acceptedMaterials: ['PET #1 Bottles', 'HDPE #2 Containers', 'Corrugated Cardboard', 'Aluminum Cans'],
    payoutRateKgsPerKg: 24,
    payoutRateUsdPerKg: 0.27,
    address: '72 Ahunbaeva St (near Botanical Garden), Bishkek',
    phone: '+996 312 543 210',
    whatsapp: 'https://wa.me/996312543210',
    operatingHours: 'Mon - Sat: 08:00 - 19:00',
    isVerified: true,
  },
  {
    id: 'chuy-cellulose-mill',
    name: 'Chuy Bio-Cellulose & Paper Aggregator Station',
    city: 'Bishkek / Tokmok',
    country: 'Kyrgyzstan',
    region: 'Central Asia',
    district: 'Alamedin District',
    distanceKm: 4.2,
    acceptedMaterials: ['Office Scrap Paper', 'Cardboard Boxes', 'Cotton Textile Remnants', 'Clean Foliage'],
    payoutRateKgsPerKg: 18,
    payoutRateUsdPerKg: 0.21,
    address: '14 Lermontov St, Alamedin Industrial Zone, Bishkek',
    phone: '+996 555 124 578',
    whatsapp: 'https://wa.me/996555124578',
    operatingHours: 'Mon - Fri: 08:30 - 18:00',
    isVerified: true,
  }
];

export const LOCAL_BUYER_HUBS = LOCAL_SUPPLIER_STATIONS;

export const CAREER_OPPORTUNITIES: CareerOpportunity[] = [
  {
    id: 'opp-seed-paper-studio',
    title: 'Artisanal Seed Stationery Studio Owner',
    businessModel: 'Micro-Franchise / Eco-Enterprise',
    category: 'startup',
    compensationKgs: '120,000 - 250,000 KGS',
    compensationUsd: '$1,370 - $2,850 / month',
    marginOrSalary: '58% Net Profit Margin',
    partnerOrganization: 'Tazaa Circular Incubation Fund',
    location: 'Bishkek & Remote Kitchen / Studio',
    requirements: [
      'Basic paper deckle & hand blender setup',
      'Access to clean waste office paper',
      'Drying space maintained strictly below 35°C',
    ],
    description: 'Produce high-margin plantable wildflower business cards and wedding invitations for corporate ESG clients and local boutiques in Central Asia.',
    contactAction: 'Apply for Starter Seed Kit & Tooling Grant',
  }
];

export const SAMPLE_WASTE_PHOTOS: SampleWastePhoto[] = [
  {
    id: 'sample-cotton-tshirt',
    title: 'Cotton T-Shirt & Denim Scrap',
    category: 'Natural Textile Fiber',
    wasteType: 'cotton',
    targetProduct: 'Fiber-Reinforced Organic Composite Cups & Acoustic Boards',
    imageSrc: cottonTshirtImg,
  },
  {
    id: 'sample-paper-notebook',
    title: 'Paper Notebook & Pencil Shavings',
    category: 'High-Cellulose Pulp & Wood Scrap',
    wasteType: 'paper',
    targetProduct: 'Plantable Wildflower Seed Business Cards (<35°C)',
    imageSrc: pencilPaperImg,
  },
  {
    id: 'sample-dry-leaves',
    title: 'Fallen Autumn Leaves & Spent Coffee',
    category: 'Organic Leaf & Lignin Biomass',
    wasteType: 'leaves',
    targetProduct: 'Steam-Pressed Tableware Plates & Trays',
    imageSrc: fallenLeavesImg,
  },
  {
    id: 'sample-plastic-bottles',
    title: 'PET #1 Plastic Beverage Bottles',
    category: 'Synthetic Petroleum Plastic',
    wasteType: 'synthetic_bottle',
    targetProduct: 'Tazalyk Regional Buyback Hub ($0.27 / kg)',
    imageSrc: petBottlesImg,
  },
];

export const SAMPLE_WASTE_GALLERY = [
  {
    id: 'sample-cotton-apparel',
    title: 'Worn Cotton T-Shirt & Denim Jeans',
    description: 'Natural textile fibers: extract long cellulose staple fibers for composite cups and insulation boards',
    badge: 'Cotton Textile Waste',
    imageSrc: cottonTshirtImg,
    massEstimate: 0.35,
    hint: 'cotton_tshirt_textile',
  },
  {
    id: 'sample-notebook-pencils',
    title: 'Paper Notebook + Pencil Shavings',
    description: 'High-cellulose pages + cedar wood shavings for botanical seed paper and composite planter pots',
    badge: 'Cellulose & Wood Fiber',
    imageSrc: pencilPaperImg,
    massEstimate: 0.45,
    hint: 'paper_notebook_pencil_shavings',
  },
  {
    id: 'sample-leaves-coffee',
    title: 'Dry Autumn Leaves + Spent Coffee Grounds',
    description: 'High-lignin foliage mix for steam-pressed party dinnerware and heat-resistant desk coasters',
    badge: 'Foliage & Coffee Grounds',
    imageSrc: fallenLeavesImg,
    massEstimate: 0.85,
    hint: 'leaves_and_coffee',
  },
  {
    id: 'sample-pet-polyethylene',
    title: 'Clear PET #1 Water Bottles & Caps',
    description: 'Non-biodegradable synthetic containers: routes directly to local Tazalyk buyback stations',
    badge: 'Synthetic Recyclable',
    imageSrc: petBottlesImg,
    massEstimate: 0.65,
    hint: 'pet_bottles',
  },
];

export const QUALITY_TEST_GUIDELINES: QualityTestGuideline[] = [
  {
    id: 'flex-test',
    name: 'Flexibility & Tensile Bend Test',
    instructions: 'Gently bend your cured bioplastic sheet or molded leaf card 90 degrees around a wooden pencil or your thumb.',
    symptomOptions: [
      'Snapped immediately like brittle glass or dry cracker',
      'Cracked slightly along the folded crease line',
      'Bends smoothly without tearing (Optimal elastic flexibility)',
      'Rubbery and warped when bent',
    ],
  },
  {
    id: 'water-dissolution',
    name: 'Water Resistance & Sealing Test',
    instructions: 'Place 3 drops of room-temperature water onto the surface of the plate or sheet for 5 minutes.',
    symptomOptions: [
      'Dissolved immediately into sticky paste (Missing waterproofing or binder too weak)',
      'Water beaded on top cleanly (Optimal beeswax or oil sealing)',
      'Swelled and turned white/milky',
      'Softened and deformed under light pressure',
    ],
  },
];

export const READY_ECO_PRODUCTS: ReadyEcoProduct[] = [
  {
    id: 'leaf-pressed-dinnerware',
    name: 'Fallen Leaf Molded Party Dinnerware',
    category: 'Dining & Kitchen',
    tagline: '100% natural autumn leaves steam-pressed with starch and polished with organic beeswax',
    material: 'Natural Fallen Foliage + Beeswax Sealing',
    decompositionTime: '45-60 days in backyard garden compost',
    badge: '100% Tree-Free',
    priceRange: '25 - 45 KGS ($0.30 - $0.50) / piece',
    whyItsGood: [
      'Zero deforestation: uses naturally dropped deciduous autumn leaves',
      'Leak-proof against hot soup and oily foods via natural beeswax seal',
      'Replaces polystyrene toxic foam party plates that take 500 years to degrade',
      'Feeds backyard soil with valuable natural organic humus after disposal',
    ],
    retailerName: 'Tazaa Bio-Craft Collective (Bishkek)',
    buyUrl: 'https://wa.me/996312543210?text=I%20want%20to%20order%20leaf%20plates',
    whereToBuyLink: 'https://wa.me/996312543210?text=I%20want%20to%20order%20leaf%20plates',
    certifications: ['EN 13432 Compostable', 'FDA Food Contact Safe'],
  }
];

export const PANTRY_SUPPLIES: PantrySupply[] = [
  {
    id: 'vegetable-glycerin',
    name: 'Pure Vegetable Glycerin (USP 99.5%)',
    householdRole: 'Molecular Plasticizer',
    typicalPrice: '85 - 150 KGS ($1.00 - $1.70) / 100ml',
    chemicalFunction: 'Acts as an internal molecular lubricant that slots between rigid amylose starch chains, preventing cracking and providing supple, bendable film flexibility.',
    whereToBuyLocally: 'Local Bishkek/Osh pharmacies (Apteka), soap-making craft stores, and confectionery supply shops.',
    onlineOption: 'Wildberries, Ozon, or local chemical supply (ChimMarket KG)',
    standardHomeAlternative: 'Liquid dish soap or aloe vera gel (temporary testing only)',
    whereLocally: 'Local Bishkek/Osh pharmacies (Apteka), soap-making craft stores, and confectionery supply shops.',
    onlineLink: 'https://www.google.com/search?q=buy+vegetable+glycerin+near+me',
  },
  {
    id: 'natural-starch-binder',
    name: 'Non-GMO Cornstarch or Potato Starch',
    householdRole: 'Primary Polymer Matrix',
    typicalPrice: '45 - 80 KGS ($0.50 - $0.90) / 500g',
    chemicalFunction: 'Upon heating in water to 65-75°C, starch granules undergo thermal gelatinization, swelling and releasing amylose to form a continuous cohesive biopolymer gel.',
    whereToBuyLocally: 'Any grocery store, supermarket (Globus, Narodnyi, Frunze), or neighborhood bazaar.',
    onlineOption: 'Supermarket delivery apps (Namba One, Glovo, Express KG)',
    standardHomeAlternative: 'Finely strained boiled potato water or wheat flour paste',
    whereLocally: 'Any grocery store, supermarket (Globus, Narodnyi, Frunze), or neighborhood bazaar.',
    onlineLink: 'https://www.google.com/search?q=buy+cornstarch+supermarket',
  }
];
